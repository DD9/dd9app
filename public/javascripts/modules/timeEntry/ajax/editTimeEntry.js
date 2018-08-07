/*
 * Ajax for time entry edit submits.
 * Must be reinstantiated when new buttons are added to the DOM via Ajax.
 */

import editTimeEntryValidation from '../editTimeEntryValidation';
import { createTimeEntryTableActionButtonsHtml, instantiateTimeEntryTableActions, updateTotalTimeEntryTableHours } from "./timeEntryTableActions";

import axios from 'axios';
import moment from 'moment';

const editTimeEntryModal = $("#editTimeEntryModal");
const editTimeEntryForm = $('#editTimeEntryForm');

// Init edit buttons
const anyEditTimeEntryBtn = '.edit-time-entry-btn';
instantiateEditTimeEntryBtn(anyEditTimeEntryBtn);

// Populate the time entry edit modal with current data
let timeEntryTableType;
let timeEntryTableRowNumber;
let currentTimeEntryHours;
export function instantiateEditTimeEntryBtn(button) {
  console.log(`instantiating edit`);
  $(button).on("click", function () {
    console.log(`edit click`);
    timeEntryTableType = $(this).data('tabletype');
    timeEntryTableRowNumber = $(this).data('rownumber');
    currentTimeEntryHours = $(this).data('hours');
    editTimeEntryForm.attr('action', `/api/v1/timeEntry/${$(this).data('timeentry')}/edit`);
    editTimeEntryModal.find('#date').val(moment.utc($(this).data('date')).format("YYYY-MM-DD"));
    editTimeEntryModal.find('#company').val($(this).data('company'));
    editTimeEntryModal.find('#user').val($(this).data('user'));
    editTimeEntryModal.find('#hours').val($(this).data('hours'));
    editTimeEntryModal.find('#description').val($(this).data('description'));
  });
}

// Time entry edit modal ajax on submit
editTimeEntryModal.on('submit', function(e) {
  console.log(`ajaxEditTimeEntry`);
  e.preventDefault();
  editTimeEntryValidation();
  $('#editTimeEntryModal').modal('toggle');
  console.log(editTimeEntryForm.attr('action'));
  console.log(editTimeEntryForm.find('#date').val());
  axios
    .post(editTimeEntryForm.attr('action'), {
      date: editTimeEntryForm.find('#date').val(),
      company: editTimeEntryForm.find('#company').val(),
      user: editTimeEntryForm.find('#user').val(),
      hours: editTimeEntryForm.find('#hours').val(),
      description: editTimeEntryForm.find('#description').val()
    })
    .then(res => {
      if (timeEntryTableType === "created") {
        $(`#${timeEntryTableType}TimeEntryTable`).DataTable().row(`#${timeEntryTableType}TimeEntryTableRow${timeEntryTableRowNumber}`).data([
          `${moment.utc(res.data.timeEntry.date).format("YYYY-MM-DD")}`,
          `${res.data.timeEntry.company.name}`,
          `${res.data.timeEntry.hours}`,
          `${res.data.timeEntry.description}`,
          `${createTimeEntryTableActionButtonsHtml(res, timeEntryTableType, timeEntryTableRowNumber)}`
        ]).draw();
        updateTotalTimeEntryTableHours(timeEntryTableType, currentTimeEntryHours, res.data.timeEntry.hours);
      } else {
        $(`#${timeEntryTableType}TimeEntryTable`).DataTable().row(`#${timeEntryTableType}TimeEntryTableRow${timeEntryTableRowNumber}`).data([
          `${moment.utc(res.data.timeEntry.date).format("YYYY-MM-DD")}`,
          `${res.data.timeEntry.publicCompany.name}`,
          `${res.data.timeEntry.publicUser.firstName} ${res.data.timeEntry.publicUser.lastName}`,
          `${res.data.timeEntry.publicHours}`,
          `${res.data.timeEntry.publicDescription}`,
          `${createTimeEntryTableActionButtonsHtml(res, timeEntryTableType, timeEntryTableRowNumber)}`
        ]).draw();
        updateTotalTimeEntryTableHours(timeEntryTableType, currentTimeEntryHours, res.data.timeEntry.publicHours);
      }
      instantiateTimeEntryTableActions(
        timeEntryTableType,
        `#${timeEntryTableType}TimeEntryTableRow${timeEntryTableRowNumber}Approve`,
        `#${timeEntryTableType}TimeEntryTableRow${timeEntryTableRowNumber}Hide`,
        `#${timeEntryTableType}TimeEntryTableRow${timeEntryTableRowNumber}Reject`,
        `#${timeEntryTableType}TimeEntryTableRow${timeEntryTableRowNumber}Submit`,
        `#${timeEntryTableType}TimeEntryTableRow${timeEntryTableRowNumber}Delete`,
      );
      instantiateEditTimeEntryBtn(`#${timeEntryTableType}TimeEntryTableRow${timeEntryTableRowNumber}Edit`);
    })
    .catch(console.error);
});
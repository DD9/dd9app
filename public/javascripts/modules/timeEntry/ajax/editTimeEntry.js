/*
 * Ajax for time entry edit submits.
 * Must be reinstantiated when new buttons are added to the DOM via Ajax.
 */

import editTimeEntryValidation from '../editTimeEntryValidation';
import { createdTimeEntryTableActionButtonsHtml, instantiateTimeEntryTableActionListeners } from './createTimeEntry';
import { updateTotalCreatedTimeEntryHours } from "./timeEntryTableActions";

import axios from 'axios';
import moment from 'moment';

const editCreatedTimeEntryForm = $("#editCreatedTimeEntryForm");

// Populate the time entry edit modal with current data
let createdTimeEntriesTableRowNumber;
let currentTimeEntryHours;
instantiateEditTimeEntryBtn();
export function instantiateEditTimeEntryBtn(button = '.edit-created-time-entry-btn') {
  $(button).on("click", function () {
    createdTimeEntriesTableRowNumber = $(this).data('rownumber');
    console.log(createdTimeEntriesTableRowNumber);
    currentTimeEntryHours = $(this).data('hours');
    console.log(currentTimeEntryHours);
    editCreatedTimeEntryForm.attr("action", `/api/v1/timeEntry/${$(this).data('timeentry')}/edit`);
    editCreatedTimeEntryForm.find('#date').val(moment.utc($(this).data('date')).format("YYYY-MM-DD"));
    editCreatedTimeEntryForm.find('#company').val($(this).data('company'));
    editCreatedTimeEntryForm.find('#hours').val($(this).data('hours'));
    editCreatedTimeEntryForm.find('#description').val($(this).data('description'));
  });
}

// Time entry table ajax on submit
editCreatedTimeEntryForm.on('submit', ajaxEditTimeEntry);

function ajaxEditTimeEntry(e) {
  console.log(`ajaxEditTimeEntry`);
  e.preventDefault();
  editTimeEntryValidation();
  $('#editCreatedTimeEntryModal').modal('toggle');
  axios
    .post(this.action, {
      date: this.date.value,
      company: this.company.value,
      hours: this.hours.value,
      description: this.description.value
    })
    .then(res => {
      $('#createdTimeEntriesTable').DataTable().row(`#created-time-entries-table-row-${createdTimeEntriesTableRowNumber}`).data([
        `${moment.utc(res.data.timeEntry.date).format("YYYY-MM-DD")}`,
        `${res.data.company.name}`,
        `${res.data.timeEntry.hours}`,
        `${res.data.timeEntry.description}`,
        `${createdTimeEntryTableActionButtonsHtml(res, createdTimeEntriesTableRowNumber)}`
      ]).draw();
      updateTotalCreatedTimeEntryHours(currentTimeEntryHours, res.data.timeEntry.hours);
      instantiateTimeEntryTableActionListeners(
        `.created-time-entries-table-row-${createdTimeEntriesTableRowNumber}-approve`,
        `.created-time-entries-table-row-${createdTimeEntriesTableRowNumber}-hide`,
        `.created-time-entries-table-row-${createdTimeEntriesTableRowNumber}-submit`,
        `.created-time-entries-table-row-${createdTimeEntriesTableRowNumber}-delete`,
        `.created-time-entries-table-row-${createdTimeEntriesTableRowNumber}-edit`,
      );
    })
    .catch(console.error);
}
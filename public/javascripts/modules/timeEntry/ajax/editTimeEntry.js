/*
 * Ajax for time entry edit submits.
 * Must be reinstantiated when new buttons are added to the DOM via Ajax.
 */

import editTimeEntryValidation from '../editTimeEntryValidation';
import { createdTimeEntryTableActionButtonsHtml, instantiateTimeEntryTableActionListeners } from './createTimeEntry';
import { updateTotalCreatedTimeEntryHours } from "./timeEntryTableActions";

import axios from 'axios';
import moment from 'moment';

const editTimeEntryForm = $("#editTimeEntryForm");

// Populate the time entry edit modal with current data
let createdTimeEntriesTableRowNumber;
let currentTimeEntryHours;
instantiateEditTimeEntryBtn();
export function instantiateEditTimeEntryBtn(button = '.edit-time-entry-btn') {
  $(button).on("click", function () {
    createdTimeEntriesTableRowNumber = $(this).data('rownumber');
    console.log(createdTimeEntriesTableRowNumber);
    currentTimeEntryHours = $(this).data('hours');
    console.log(currentTimeEntryHours);
    editTimeEntryForm.attr("action", `/api/v1/timeEntry/${$(this).data('timeentry')}/edit`);
    editTimeEntryForm.find('#date').val(moment.utc($(this).data('date')).format("YYYY-MM-DD"));
    editTimeEntryForm.find('#company').val($(this).data('company'));
    editTimeEntryForm.find('#hours').val($(this).data('hours'));
    editTimeEntryForm.find('#description').val($(this).data('description'));
  });
}

// Time entry table ajax on submit
editTimeEntryForm.on('submit', ajaxEditTimeEntry);

function ajaxEditTimeEntry(e) {
  console.log(`ajaxEditTimeEntry`);
  e.preventDefault();
  editTimeEntryValidation();
  $('#editTimeEntryModal').modal('toggle');
  axios
    .post(this.action, {
      date: this.date.value,
      company: this.company.value,
      hours: this.hours.value,
      description: this.description.value
    })
    .then(res => {
      $('#createdTimeEntriesTable').DataTable().row(`#createdTimeEntriesTableRow-${createdTimeEntriesTableRowNumber}`).data([
        `${moment.utc(res.data.timeEntry.date).format("YYYY-MM-DD")}`,
        `${res.data.company.name}`,
        `${res.data.timeEntry.hours}`,
        `${res.data.timeEntry.description}`,
        `${createdTimeEntryTableActionButtonsHtml(res, createdTimeEntriesTableRowNumber)}`
      ]).draw();
      $('#createdTimeEntriesTableRow-'+createdTimeEntriesTableRowNumber).find('td:nth-child(3)').addClass('time-entry-hours');
      updateTotalCreatedTimeEntryHours(currentTimeEntryHours, res.data.timeEntry.hours);
      instantiateTimeEntryTableActionListeners(
        `.createdTimeEntriesTableRow-${createdTimeEntriesTableRowNumber}-approve`,
        `.createdTimeEntriesTableRow-${createdTimeEntriesTableRowNumber}-hide`,
        `.createdTimeEntriesTableRow-${createdTimeEntriesTableRowNumber}-submit`,
        `.createdTimeEntriesTableRow-${createdTimeEntriesTableRowNumber}-delete`,
        `.createdTimeEntriesTableRow-${createdTimeEntriesTableRowNumber}-edit`,
      );
    })
    .catch(console.error);
}
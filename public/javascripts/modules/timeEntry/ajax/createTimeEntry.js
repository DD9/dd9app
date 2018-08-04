import createTimeEntryValidation from '../createTimeEntryValidation';
import { approveAndHideBtnListeners, confirmSubmitListener, confirmDeleteListener, updateTotalCreatedTimeEntryHours } from "./timeEntryTableActions";
import { instantiateEditTimeEntryBtn } from "./editTimeEntry"


import axios from 'axios';
import moment from 'moment';

$('#createTimeEntryForm').on('submit', ajaxAddCreatedTimeEntry);

function ajaxAddCreatedTimeEntry(e) {
  console.log(`ajaxAddCreatedTimeEntry`);
  e.preventDefault();
  createTimeEntryValidation();
  axios
    .post(this.action, {
      date: this.date.value,
      company: this.company.value,
      hours: this.hours.value,
      description: this.description.value
    })
    .then(res => {
      const createdTimeEntriesTable = $('#createdTimeEntriesTable');
      const createdTimeEntriesTableRowNumber = createdTimeEntriesTable.find('tr').length-2;
      const companyName = $(this).find('option:selected').text();
      createdTimeEntriesTable.DataTable().row.add([
        `${moment.utc(res.data.timeEntry.date).format("YYYY-MM-DD")}`,
        `${companyName}`,
        `${res.data.timeEntry.hours}`,
        `${res.data.timeEntry.description}`,
        `${createdTimeEntryTableActionButtonsHtml(res, createdTimeEntriesTableRowNumber)}`
      ]).draw().node().id = `createdTimeEntriesTableRow-${createdTimeEntriesTableRowNumber}`;
      updateTotalCreatedTimeEntryHours(0, res.data.timeEntry.hours);
      instantiateTimeEntryTableActionListeners(
        `.createdTimeEntriesTableRow-${createdTimeEntriesTableRowNumber}-approve`,
        `.createdTimeEntriesTableRow-${createdTimeEntriesTableRowNumber}-hide`,
        `.createdTimeEntriesTableRow-${createdTimeEntriesTableRowNumber}-submit`,
        `.createdTimeEntriesTableRow-${createdTimeEntriesTableRowNumber}-delete`,
        `.createdTimeEntriesTableRow-${createdTimeEntriesTableRowNumber}-edit`,
      );
      // $('#createTimeEntryForm #hours, #description').val(''); //TODO turn on
    })
    .catch(console.error);
}

export function createdTimeEntryTableActionButtonsHtml(res, createdTimeEntriesTableRowNumber) {
  const editSVG = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" viewBox="0 0 100 100" style="enable-background:new 0 0 100 100;" xml:space="preserve"><image xlink:href="/images/icons/pencil.svg" x="0" y="0" width="100%" height="100%"/></svg>`;
  let html = '';
  if (res.data.admin === true) {
    html += `<form class="createdTimeEntriesTableRow-${createdTimeEntriesTableRowNumber}-approve time-entry-table-action-approve form d-inline" action='/api/v1/timeEntry/${res.data.timeEntry._id}/approve' method="POST" data-hours=${res.data.timeEntry.hours}><button class="btn btn-sm btn-link" type="submit">Approve</button></form>`;
    html += `<form class="createdTimeEntriesTableRow-${createdTimeEntriesTableRowNumber}-hide time-entry-table-action-hide form d-inline" action='/api/v1/timeEntry/${res.data.timeEntry._id}/hide' method="POST" data-hours=${res.data.timeEntry.hours}><button class="btn btn-sm btn-link" type="submit">Hide</button></form>`;
    html += `<button class="createdTimeEntriesTableRow-${createdTimeEntriesTableRowNumber}-submit ubmit-time-entry-btn btn btn-sm btn-link" data-toggle='modal' data-target='#confirmSubmitTimeEntryModal' data-timeentry=${res.data.timeEntry._id} data-hours=${res.data.timeEntry.hours}>Submit</button>`;
    html += `<button class="createdTimeEntriesTableRow-${createdTimeEntriesTableRowNumber}-delete delete-time-entry-btn btn btn-sm btn-link" data-toggle='modal' data-target='#confirmDeleteTimeEntryModal' data-timeentry=${res.data.timeEntry._id} data-hours=${res.data.timeEntry.hours}>Delete</button>`;
    html += `<button class="createdTimeEntriesTableRow-${createdTimeEntriesTableRowNumber}-edit edit-time-entry-btn btn btn-sm btn-link" data-toggle='modal' data-target='#editTimeEntryModal' data-rownumber=${createdTimeEntriesTableRowNumber} data-timeentry=${res.data.timeEntry._id} data-date=${res.data.timeEntry.date} data-company=${res.data.timeEntry.company} data-hours=${res.data.timeEntry.hours} data-description=${res.data.timeEntry.description}>${editSVG}</button>`;
  } else {
    html += `<button class="createdTimeEntriesTableRow-${createdTimeEntriesTableRowNumber}-submit submit-time-entry-btn btn btn-sm btn-link" data-toggle='modal' data-target='#confirmSubmitTimeEntryModal' data-timeentry=${res.data.timeEntry._id} data-hours=${res.data.timeEntry.hours}>Submit</button>`;
    html += `<button class="createdTimeEntriesTableRow-${createdTimeEntriesTableRowNumber}-delete delete-time-entry-btn btn btn-sm btn-link" data-toggle='modal' data-target='#confirmDeleteTimeEntryModal' data-timeentry=${res.data.timeEntry._id} data-hours=${res.data.timeEntry.hours}>Delete</button>`;
    html += `<button class="createdTimeEntriesTableRow-${createdTimeEntriesTableRowNumber}-edit edit-time-entry-btn btn btn-sm btn-link" data-toggle='modal' data-target='#editTimeEntryModal' data-rownumber=${createdTimeEntriesTableRowNumber} data-timeentry=${res.data.timeEntry._id} data-date=${res.data.timeEntry.date} data-company=${res.data.timeEntry.company} data-hours=${res.data.timeEntry.hours} data-description=${res.data.timeEntry.description}>${editSVG}</button>`;
  }
  return html;
}

export function instantiateTimeEntryTableActionListeners(approveFormSelector, hideFormSelector, submitBtnSelector, deleteBtnSelector, editBtnSelector) {
  approveAndHideBtnListeners(approveFormSelector, hideFormSelector);
  confirmSubmitListener(submitBtnSelector);
  confirmDeleteListener(deleteBtnSelector);
  instantiateEditTimeEntryBtn(editBtnSelector)
}
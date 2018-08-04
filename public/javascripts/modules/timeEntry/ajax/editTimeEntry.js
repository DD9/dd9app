/*
 * Ajax for time entry edit submits.
 * Must be reinstantiated when new buttons are added to the DOM via Ajax.
 */

import editTimeEntryValidation from '../editTimeEntryValidation';

import axios from 'axios';
import moment from 'moment';

const editTimeEntryForm = $("#editTimeEntryForm");

// Populate the time entry edit modal with current data
let createdTimeEntriesTableRowNumber;
let currentTimeEntryHours;
$('.edit-time-entry-btn').on("click", function () {
  createdTimeEntriesTableRowNumber = $(this).data('rownumber');
  currentTimeEntryHours = +$(this).closest('tr').find('.time-entry-hours').html();
  console.log(currentTimeEntryHours);
  editTimeEntryForm.attr("action", `/api/v1/timeEntry/${$(this).data('timeentry')}/edit`);
  editTimeEntryForm.find('#date').val(moment.utc($(this).data('date')).format("YYYY-MM-DD"));
  editTimeEntryForm.find('#company').val($(this).data('company'));
  editTimeEntryForm.find('#hours').val($(this).data('hours'));
  editTimeEntryForm.find('#description').val($(this).data('description'));
});

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
      const editSVG = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" viewBox="0 0 100 100" style="enable-background:new 0 0 100 100;" xml:space="preserve"><image xlink:href="/images/icons/pencil.svg" x="0" y="0" width="100%" height="100%"/></svg>`;
      let html = '';
      if (res.data.admin === true) {
        html += `<form class="time-entry-table-action-approve form d-inline" action='/api/v1/timeEntry/${res.data.timeEntry._id}/approve' method="POST"><button class="btn btn-sm btn-link" type="submit">Approve</button></form>`;
        html += `<form class="time-entry-table-action-hide form d-inline" action='/api/v1/timeEntry/${res.data.timeEntry._id}/hide' method="POST"><button class="btn btn-sm btn-link" type="submit">Hide</button></form>`;
        html += `<form class="time-entry-table-action-submit form d-inline" action='/api/v1/timeEntry/${res.data.timeEntry._id}/submit' method="POST"><button class="btn btn-sm btn-link" type="submit">Submit</button></form>`;
        html += `<button class="delete-time-entry-btn btn btn-sm btn-link" data-toggle='modal' data-target='#confirmDeleteTimeEntryModal' data-timeentry=${res.data.timeEntry._id}>Delete</button>`;
        html += `<button class="edit-time-entry-btn btn btn-sm btn-link" data-toggle='modal' data-target='#editTimeEntryModal' data-rownumber=${createdTimeEntriesTableRowNumber} data-timeentry=${res.data.timeEntry._id} data-date=${res.data.timeEntry.date} data-company=${res.data.timeEntry.company} data-hours=${res.data.timeEntry.hours} data-description=${res.data.timeEntry.description}>${editSVG}</button>`;
      } else {
        html += `<form class="time-entry-table-action-submit form d-inline" action='/api/v1/timeEntry/${res.data.timeEntry._id}/submit' method="POST"><button class="btn btn-sm btn-link" type="submit">Submit</button></form>`;
        html += `<button class="delete-time-entry-btn btn btn-sm btn-link" data-toggle='modal' data-target='#confirmDeleteTimeEntryModal' data-timeentry=${res.data.timeEntry._id}>Delete</button>`;
        html += `<button class="edit-time-entry-btn btn btn-sm btn-link" data-toggle='modal' data-target='#editTimeEntryModal' data-rownumber=${createdTimeEntriesTableRowNumber} data-timeentry=${res.data.timeEntry._id} data-date=${res.data.timeEntry.date} data-company=${res.data.timeEntry.company} data-hours=${res.data.timeEntry.hours} data-description=${res.data.timeEntry.description}>${editSVG}</button>`;
      }
      $('#createdTimeEntriesTable').DataTable().row(`#createdTimeEntriesTableRow-${createdTimeEntriesTableRowNumber}`).data([
        `${moment.utc(res.data.timeEntry.date).format("YYYY-MM-DD")}`,
        `${res.data.company.name}`,
        `${res.data.timeEntry.hours}`,
        `${res.data.timeEntry.description}`,
        `${html}`
      ]).draw();
      $('#createdTimeEntriesTableRow-'+createdTimeEntriesTableRowNumber).find('td:nth-child(3)').addClass('time-entry-hours');
      const totalCreatedHoursTd = $('#totalCreatedHours');
      let totalCreatedHours = +totalCreatedHoursTd.html();
      console.log(totalCreatedHours);
      totalCreatedHours = (totalCreatedHours - (currentTimeEntryHours - res.data.timeEntry.hours));
      totalCreatedHoursTd.html(totalCreatedHours);
      // instantiateTimeEntryTableActions();
      // instantiateEditTimeEntryBtn();
    })
    .catch(console.error);
}
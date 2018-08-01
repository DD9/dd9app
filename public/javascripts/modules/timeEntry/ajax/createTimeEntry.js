import createTimeEntryValidation from '../createTimeEntryValidation';
import instantiateTimeEntryTableActions from './timeEntryTableActions';

import axios from 'axios';
import moment from 'moment';

$('#createTimeEntryForm').on('submit', ajaxAddCreatedTimeEntry);

function ajaxAddCreatedTimeEntry(e) {
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
      console.log(res.data);
      const companyName = $(this).find('option:selected').text();
      let html =
        `<tr>
          <td>${moment(res.data.timeEntry.date).format("YYYY-MM-DD")}</td>
          <td>${companyName}</td>
          <td>${res.data.timeEntry.hours}</td>
          <td>${res.data.timeEntry.description}</td>`;
      if (res.data.admin === true) {
        html += `<td><form class="time-entry-table-action-approve form- d-inline" action='/api/v1/timeEntry/${res.data.timeEntry._id}/approve' method="POST"><button class="btn btn-sm btn-link" type="submit">Approve</button></form>`;
        html += `<form class="time-entry-table-action-hide form- d-inline" action='/api/v1/timeEntry/${res.data.timeEntry._id}/hide' method="POST"><button class="btn btn-sm btn-link" type="submit">Hide</button></form>`;
        html += `<form class="time-entry-table-action-submit form- d-inline" action='/api/v1/timeEntry/${res.data.timeEntry._id}/submit' method="POST"><button class="btn btn-sm btn-link" type="submit">Submit</button></form>`;
        html += `<form class="time-entry-table-action-delete form- d-inline" action='/api/v1/timeEntry/${res.data.timeEntry._id}/delete' method="POST"><button class="btn btn-sm btn-link" type="submit">Delete</button></form></td>`;
      } else {
        html += `<td><form class="time-entry-table-action-submit form- d-inline" action='/api/v1/timeEntry/${res.data.timeEntry._id}/submit' method="POST"><button class="btn btn-sm btn-link" type="submit">Submit</button></form>`;
        html += `<form class="time-entry-table-action-delete form- d-inline" action='/api/v1/timeEntry/${res.data.timeEntry._id}/delete' method="POST"><button class="btn btn-sm btn-link" type="submit">Delete</button></form></td>`;
      }
      const lastRowInCreatedTimeEntriesTable = $('#lastRowInCreatedTimeEntriesTable');
      lastRowInCreatedTimeEntriesTable.before(html);
      const totalCreatedHours = $('#totalCreatedHours');
      const newTotal = +totalCreatedHours.html() + +res.data.timeEntry.hours;
      totalCreatedHours.html(newTotal);
      instantiateTimeEntryTableActions();
      // $('#createTimeEntryForm #hours, #description').val('');
    })
    .catch(console.error);
}
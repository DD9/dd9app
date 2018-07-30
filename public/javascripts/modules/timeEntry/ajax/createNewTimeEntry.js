import validateTimeEntryFormInput from '../formValidation';

import axios from 'axios';
import moment from 'moment';

$('#createTimeEntryForm').on('submit', ajaxAddCreatedTimeEntry);

function ajaxAddCreatedTimeEntry(e) {
  e.preventDefault();
  validateTimeEntryFormInput();

  axios
    .post(this.action, {
      date: this.date.value,
      company: this.company.value,
      hours: this.hours.value,
      description: this.description.value
    })
    .then(res => {
      const companyName = $(this).find('option:selected').text();
      let html =
        `<tr>
          <td>${moment(res.data.timeEntry.date).format("YYYY-MM-DD")}</td>
          <td>${companyName}</td>
          <td>${res.data.timeEntry.hours}</td>
          <td>${res.data.timeEntry.description}</td>`;
      if (res.data.admin === true) {
        html += `<td><a href="">Approve</a>&nbsp&nbsp<a href="">Hide</a>&nbsp&nbsp<a href="">Submit</a>&nbsp&nbsp<a href="">Delete</a></td></tr>`
      } else {
        html += `<td><a href="">Submit</a>&nbsp&nbsp<a href="">Delete</a></td></tr>`
      }
      const lastRowInCreatedTimeEntriesTable = $('#lastRowInCreatedTimeEntriesTable');
      lastRowInCreatedTimeEntriesTable.before(html);
      const totalCreatedHours = $('#totalCreatedHours');
      const newTotal = +totalCreatedHours.html() + +res.data.timeEntry.hours;
      totalCreatedHours.html(newTotal);
      $('#createTimeEntryForm #hours, #description').val('');
    })
    .catch(console.error);
}

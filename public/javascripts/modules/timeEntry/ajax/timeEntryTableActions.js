/*
 * Ajax for time entry table action button submits.
 * Must be reinstantiated when new buttons are added to the DOM via Ajax.
 */

import axios from 'axios';

let submitTimeEntryBtn;
let deleteTimeEntryBtn;
// Confirm submit
$('.submit-time-entry-btn').on("click", function () {
  submitTimeEntryBtn = this;
  $("#confirmSubmitTimeEntryForm").attr("action", `/api/v1/timeEntry/${$(this).data('timeentry')}/submit`);
});

$('.confirm-submit-btn').on("click", function () {
  $('#confirmSubmitTimeEntryModal').modal('toggle');
});

// Confirm delete
$('.delete-time-entry-btn').on("click", function () {
  deleteTimeEntryBtn = this;
  $("#confirmDeleteTimeEntryForm").attr("action", `/api/v1/timeEntry/${$(this).data('timeentry')}/delete`);
});

$('.confirm-delete-btn').on("click", function () {
  $('#confirmDeleteTimeEntryModal').modal('toggle');
});

// Time entry table actions
$('.time-entry-table-action-approve').on('submit', ajaxTimeEntryTableApprove);
$('.time-entry-table-action-hide').on('submit', ajaxTimeEntryTableHide);
$('.time-entry-table-action-submit').on('submit', ajaxTimeEntryTableSubmit);
$('.time-entry-table-action-delete').on('submit', ajaxTimeEntryTableDelete);

const totalCreatedHours = $('#totalCreatedHours');

// Approve
function ajaxTimeEntryTableApprove(e) {
  console.log(`ajaxTimeEntryTableApprove`);
  e.preventDefault();
  $(this).closest("tr").remove();
  axios
    .post(this.action)
    .then(res => {
      const newTotal = +totalCreatedHours.html() - +res.data.hours;
      totalCreatedHours.html(newTotal);
    })
    .catch(console.error);
}

// Hide
function ajaxTimeEntryTableHide(e) {
  console.log(`ajaxTimeEntryTableHide`);
  e.preventDefault();
  $(this).closest("tr").remove();
  axios
    .post(this.action)
    .then(res => {
      const newTotal = +totalCreatedHours.html() - +res.data.hours;
      totalCreatedHours.html(newTotal);
    })
    .catch(console.error);
}

// Submit
function ajaxTimeEntryTableSubmit(e) {
  console.log(`ajaxTimeEntryTableSubmit`);
  e.preventDefault();
  $(submitTimeEntryBtn).closest("tr").remove();
  axios
    .post(this.action)
    .then(res => {
      const newTotal = +totalCreatedHours.html() - +res.data.hours;
      totalCreatedHours.html(newTotal);
    })
    .catch(console.error);
}

// Delete
function ajaxTimeEntryTableDelete(e) {
  console.log(`ajaxTimeEntryTableDelete`);
  e.preventDefault();
  $(deleteTimeEntryBtn).closest("tr").remove();
  axios
    .post(this.action)
    .then(res => {
      const newTotal = +totalCreatedHours.html() - +res.data.hours;
      totalCreatedHours.html(newTotal);
    })
    .catch(console.error);
}
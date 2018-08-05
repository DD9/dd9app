/*
 * Ajax for time entry table action button submit listeners, edit listeners and actions in separate file.
 * Actions Must be reinstantiated when to new buttons when new buttons are added to the DOM via Ajax.
 */

import axios from 'axios';

// Approve and hide listeners
approveAndHideBtnListeners();
export function approveAndHideBtnListeners(approveForm = '.created-time-entry-table-action-approve', hideForm = '.created-time-entry-table-action-hide') {
  $(approveForm).on('submit', ajaxCreatedTimeEntryTableApprove);
  $(hideForm).on('submit', ajaxCreatedTimeEntryTimeEntryTableHide);
}
// Confirm modals not created dynamically, form actions don't need to be updated
const submitForm = '.created-time-entry-table-action-submit';
const deleteForm = '.created-time-entry-table-action-delete';
$(submitForm).on('submit', ajaxCreatedTimeEntryTimeEntryTableSubmit);
$(deleteForm).on('submit', ajaxCreatedTimeEntryTimeEntryTableDelete);

// Submit listener
let submitTimeEntryBtn;
confirmSubmitListener();
export function confirmSubmitListener(button = '.submit-created-time-entry-btn') {
  $(button).on("click", function () {
    submitTimeEntryBtn = this;
    console.log(submitTimeEntryBtn);
    $("#confirmSubmitCreatedTimeEntryForm").attr("action", `/api/v1/timeEntry/${$(this).data('timeentry')}/submit`);
  });

  $('.confirm-created-time-entry-submit-btn').on("click", function () {
    $('#confirmSubmitCreatedTimeEntryModal').modal('toggle');
  });
}

// Delete listener
let deleteTimeEntryBtn;
confirmDeleteListener();
export function confirmDeleteListener(button = '.delete-created-time-entry-btn') {
  $(button).on("click", function () {
    deleteTimeEntryBtn = this;
    $("#confirmDeleteCreatedTimeEntryForm").attr("action", `/api/v1/timeEntry/${$(this).data('timeentry')}/delete`);
  });

  $('.confirm-created-time-entry-delete-btn').on("click", function () {
    $('#confirmDeleteCreatedTimeEntryModal').modal('toggle');
  });
}

// Update total create hours value
export function updateTotalCreatedTimeEntryHours(oldHours, newHours) {
  const totalCreatedTimeEntryHours = +$('#totalCreatedTimeEntryHours').html();
  const newTotal = (totalCreatedTimeEntryHours - (+oldHours - +newHours));
  console.log(`${totalCreatedTimeEntryHours} - (${oldHours} - ${newHours}) = ${newTotal}`);
  $('#createdTimeEntriesTable').DataTable().row(`#totalCreatedTimeEntryHoursRow`).data([
    ``,
    ``,
    `${newTotal}`,
    ``,
    ``,
    ``
  ]).draw();
}

// Approve
function ajaxCreatedTimeEntryTableApprove(e) {
  console.log(`ajaxCreatedTimeEntryTableApprove`);
  console.log(this);
  e.preventDefault();
  $('#createdTimeEntriesTable').DataTable().row($(this).closest('tr')).remove().draw();
  updateTotalCreatedTimeEntryHours($(this).data('hours'), 0);
  axios
    .post(this.action)
    .then(res => {})
    .catch(console.error);
}

// Hide
function ajaxCreatedTimeEntryTimeEntryTableHide(e) {
  console.log(`ajaxCreatedTimeEntryTimeEntryTableHide`);
  console.log(this);
  e.preventDefault();
  $('#createdTimeEntriesTable').DataTable().row($(this).closest('tr')).remove().draw();
  updateTotalCreatedTimeEntryHours($(this).data('hours'), 0);
  axios
    .post(this.action)
    .then(res => {})
    .catch(console.error);
}

// Submit
function ajaxCreatedTimeEntryTimeEntryTableSubmit(e) {
  console.log(`ajaxCreatedTimeEntryTimeEntryTableSubmit`);
  console.log(submitTimeEntryBtn);
  e.preventDefault();
  $('#createdTimeEntriesTable').DataTable().row($(submitTimeEntryBtn).closest("tr")).remove().draw();
  updateTotalCreatedTimeEntryHours($(submitTimeEntryBtn).data('hours'), 0);
  axios
    .post(this.action)
    .then(res => {})
    .catch(console.error);
}

// Delete
function ajaxCreatedTimeEntryTimeEntryTableDelete(e) {
  console.log(`ajaxCreatedTimeEntryTimeEntryTableDelete`);
  console.log(this);
  e.preventDefault();
  $('#createdTimeEntriesTable').DataTable().row($(deleteTimeEntryBtn).closest("tr")).remove().draw();
  updateTotalCreatedTimeEntryHours($(deleteTimeEntryBtn).data('hours'), 0);
  axios
    .post(this.action)
    .then(res => {})
    .catch(console.error);
}

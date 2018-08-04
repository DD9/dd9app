/*
 * Ajax for time entry table action button submit listeners, edit listeners and actions in separate file.
 * Actions Must be reinstantiated when to new buttons when new buttons are added to the DOM via Ajax.
 */

import axios from 'axios';

// Approve and hide listeners
approveAndHideBtnListeners();
export function approveAndHideBtnListeners(approveForm = '.time-entry-table-action-approve', hideForm = '.time-entry-table-action-hide') {
  $(approveForm).on('submit', ajaxTimeEntryTableApprove);
  $(hideForm).on('submit', ajaxTimeEntryTableHide);
}
// Confirm modals not created dynamically, form actions don't need to be updated
const submitForm = '.time-entry-table-action-submit';
const deleteForm = '.time-entry-table-action-delete';
$(submitForm).on('submit', ajaxTimeEntryTableSubmit);
$(deleteForm).on('submit', ajaxTimeEntryTableDelete);

// Submit listener
let submitTimeEntryBtn;
confirmSubmitListener();
export function confirmSubmitListener(button = '.submit-time-entry-btn') {
  $(button).on("click", function () {
    submitTimeEntryBtn = this;
    console.log(submitTimeEntryBtn);
    $("#confirmSubmitTimeEntryForm").attr("action", `/api/v1/timeEntry/${$(this).data('timeentry')}/submit`);
  });

  $('.confirm-submit-btn').on("click", function () {
    $('#confirmSubmitTimeEntryModal').modal('toggle');
  });
}

// Delete listener
let deleteTimeEntryBtn;
confirmDeleteListener();
export function confirmDeleteListener(button = '.delete-time-entry-btn') {
  $(button).on("click", function () {
    deleteTimeEntryBtn = this;
    $("#confirmDeleteTimeEntryForm").attr("action", `/api/v1/timeEntry/${$(this).data('timeentry')}/delete`);
  });

  $('.confirm-delete-btn').on("click", function () {
    $('#confirmDeleteTimeEntryModal').modal('toggle');
  });
}

// Update total create hours value
export function updateTotalCreatedTimeEntryHours(oldHours, newHours) {
  const totalCreatedHours = +$('#totalCreatedHours').html();
  const newTotal = (totalCreatedHours - (+oldHours - +newHours));
  console.log(`${totalCreatedHours} - (${oldHours} - ${newHours}) = ${newTotal}`);
  $('#createdTimeEntriesTable').DataTable().row(`#totalCreatedHoursRow`).data([
    ``,
    ``,
    `${newTotal}`,
    ``,
    ``,
    ``
  ]).draw();
}

// Approve
function ajaxTimeEntryTableApprove(e) {
  console.log(`ajaxTimeEntryTableApprove`);
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
function ajaxTimeEntryTableHide(e) {
  console.log(`ajaxTimeEntryTableHide`);
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
function ajaxTimeEntryTableSubmit(e) {
  console.log(`ajaxTimeEntryTableSubmit`);
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
function ajaxTimeEntryTableDelete(e) {
  console.log(`ajaxTimeEntryTableDelete`);
  console.log(this);
  e.preventDefault();
  $('#createdTimeEntriesTable').DataTable().row($(deleteTimeEntryBtn).closest("tr")).remove().draw();
  updateTotalCreatedTimeEntryHours($(deleteTimeEntryBtn).data('hours'), 0);
  axios
    .post(this.action)
    .then(res => {})
    .catch(console.error);
}

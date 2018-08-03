/*
 * Listen for form submits and add listeners to dynamically created buttons
 */

import axios from 'axios';

instantiateTimeEntryTableActions();

function instantiateTimeEntryTableActions() {

  let deleteTimeEntryBtn;
  $('.delete-time-entry-btn').on("click", function () {
    deleteTimeEntryBtn = this;
    $("#confirmDeleteTimeEntryForm").attr("action", `/api/v1/timeEntry/${$(this).data('timeentry')}/delete`);
  });

  $('.confirm-ok-btn').on("click", function () {
    $('#confirmDeleteTimeEntryModal').modal('toggle');
  });

  $('.time-entry-table-action-approve').on('submit', ajaxTimeEntryTableApprove);
  $('.time-entry-table-action-hide').on('submit', ajaxTimeEntryTableHide);
  $('.time-entry-table-action-submit').on('submit', ajaxTimeEntryTableSubmit);
  $('.time-entry-table-action-delete').on('submit', ajaxTimeEntryTableDelete);

  const totalCreatedHours = $('#totalCreatedHours');

  // Approve
  function ajaxTimeEntryTableApprove(e) {
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

  // Delete
  function ajaxTimeEntryTableDelete(e) {
    e.preventDefault();
    $(deleteTimeEntryBtn).closest("tr").remove();
    console.log(this);
    axios
      .post(this.action)
      .then(res => {
        console.log(res);
        const newTotal = +totalCreatedHours.html() - +res.data.hours;
        totalCreatedHours.html(newTotal);
      })
      .catch(console.error);
  }
}

export default instantiateTimeEntryTableActions
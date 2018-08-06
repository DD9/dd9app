/*
 * Ajax for time entry table button listeners, edit listener in editTimeEntry.js
 * Actions Must be reinstantiated to new buttons when new buttons are added to the DOM via Ajax
 */

import axios from 'axios';

// Function used to dynamically create time entry table action buttons on time entry edit and create
export function createTimeEntryTableActionButtonsHtml(res, timeEntryTableType, timeEntryTableRowNumber) {
  const editSVG = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" viewBox="0 0 100 100" style="enable-background:new 0 0 100 100;" xml:space="preserve"><image xlink:href="/images/icons/pencil.svg" x="0" y="0" width="100%" height="100%"/></svg>`;
  let html = '';
  if (res.data.admin === true) {
    console.log(res);
    if (timeEntryTableType === "approved") {
      html += `<form id="${timeEntryTableType}TimeEntryTableRow${timeEntryTableRowNumber}Hide" class="${timeEntryTableType}-time-entry-table-hide-form form d-inline" action='/api/v1/timeEntry/${res.data.timeEntry._id}/hide' method="POST" data-hours=${res.data.timeEntry.publicHours}><button class="btn btn-sm btn-link" type="submit">Hide</button></form>`;
      html += `<button id="${timeEntryTableType}TimeEntryTableRow${timeEntryTableRowNumber}Reject" class="reject-${timeEntryTableType}-time-entry-btn btn btn-sm btn-link" data-toggle='modal' data-target='#confirmRejectTimeEntryModal' data-timeentry=${res.data.timeEntry._id} data-hours=${res.data.timeEntry.publicHours}>Reject</button>`;
      html += `<button id="${timeEntryTableType}TimeEntryTableRow${timeEntryTableRowNumber}Edit" class="edit-time-entry-btn btn btn-sm btn-link" data-toggle='modal' data-target='#editTimeEntryModal' data-tabletype=${timeEntryTableType} data-rownumber=${timeEntryTableRowNumber} data-timeentry=${res.data.timeEntry._id} data-date=${res.data.timeEntry.publicDate} data-user=${res.data.timeEntry.publicUser._id} data-company=${res.data.timeEntry.publicCompany._id} data-hours=${res.data.timeEntry.publicHours} data-description=${res.data.timeEntry.publicDescription}>${editSVG}</button>`;
    } else if (timeEntryTableType === "hidden") {
      html += `<form id="${timeEntryTableType}TimeEntryTableRow${timeEntryTableRowNumber}Approve" class="time-entry-table-form-approve form d-inline" action='/api/v1/timeEntry/${res.data.timeEntry._id}/approve' method="POST" data-hours=${res.data.timeEntry.publicHours}><button class="btn btn-sm btn-link" type="submit">Approve</button></form>`;
      html += `<button id="${timeEntryTableType}TimeEntryTableRow${timeEntryTableRowNumber}Reject" class="reject-${timeEntryTableType}-time-entry-btn btn btn-sm btn-link" data-toggle='modal' data-target='#confirmRejectTimeEntryModal' data-timeentry=${res.data.timeEntry._id} data-hours=${res.data.timeEntry.publicHours}>Reject</button>`;
      html += `<button id="${timeEntryTableType}TimeEntryTableRow${timeEntryTableRowNumber}Edit" class="edit-time-entry-btn btn btn-sm btn-link" data-toggle='modal' data-target='#editTimeEntryModal' data-tabletype=${timeEntryTableType} data-rownumber=${timeEntryTableRowNumber} data-timeentry=${res.data.timeEntry._id} data-date=${res.data.timeEntry.publicDate} data-user=${res.data.timeEntry.publicUser._id} data-company=${res.data.timeEntry.publicCompany._id} data-hours=${res.data.timeEntry.publicHours} data-description=${res.data.timeEntry.publicDescription}>${editSVG}</button>`;
    } else if (timeEntryTableType === "submitted") {
      html += `<form id="${timeEntryTableType}TimeEntryTableRow${timeEntryTableRowNumber}Approve" class="${timeEntryTableType}-time-entry-table-approve-form form d-inline" action='/api/v1/timeEntry/${res.data.timeEntry._id}/approve' method="POST" data-hours=${res.data.timeEntry.publicHours}><button class="btn btn-sm btn-link" type="submit">Approve</button></form>`;
      html += `<form id="${timeEntryTableType}TimeEntryTableRow${timeEntryTableRowNumber}Hide" class="${timeEntryTableType}-time-entry-table-hide-form form d-inline" action='/api/v1/timeEntry/${res.data.timeEntry._id}/hide' method="POST" data-hours=${res.data.timeEntry.publicHours}><button class="btn btn-sm btn-link" type="submit">Hide</button></form>`;
      html += `<button id="${timeEntryTableType}TimeEntryTableRow${timeEntryTableRowNumber}Reject" class="reject-${timeEntryTableType}-time-entry-btn btn btn-sm btn-link" data-toggle='modal' data-target='#confirmRejectTimeEntryModal' data-timeentry=${res.data.timeEntry._id} data-hours=${res.data.timeEntry.publicHours}>Reject</button>`;
      html += `<button id="${timeEntryTableType}TimeEntryTableRow${timeEntryTableRowNumber}Edit" class="edit-time-entry-btn btn btn-sm btn-link" data-toggle='modal' data-target='#editTimeEntryModal' data-tabletype=${timeEntryTableType} data-rownumber=${timeEntryTableRowNumber} data-timeentry=${res.data.timeEntry._id} data-date=${res.data.timeEntry.publicDate} data-user=${res.data.timeEntry.publicUser._id} data-company=${res.data.timeEntry.publicCompany._id} data-hours=${res.data.timeEntry.publicHours} data-description=${res.data.timeEntry.publicDescription}>${editSVG}</button>`;
    } else if (timeEntryTableType === "created") {
      html += `<form id="${timeEntryTableType}TimeEntryTableRow${timeEntryTableRowNumber}Approve" class="${timeEntryTableType}-time-entry-table-approve-form form d-inline" action='/api/v1/timeEntry/${res.data.timeEntry._id}/approve' method="POST" data-hours=${res.data.timeEntry.hours}><button class="btn btn-sm btn-link" type="submit">Approve</button></form>`;
      html += `<form id="${timeEntryTableType}TimeEntryTableRow${timeEntryTableRowNumber}Hide" class="${timeEntryTableType}-time-entry-table-hide-form form d-inline" action='/api/v1/timeEntry/${res.data.timeEntry._id}/hide' method="POST" data-hours=${res.data.timeEntry.hours}><button class="btn btn-sm btn-link" type="submit">Hide</button></form>`;
      html += `<button id="${timeEntryTableType}TimeEntryTableRow${timeEntryTableRowNumber}Submit" class="submit-${timeEntryTableType}-time-entry-btn btn btn-sm btn-link" data-toggle='modal' data-target='#confirmSubmitTimeEntryModal' data-timeentry=${res.data.timeEntry._id} data-hours=${res.data.timeEntry.hours}>Submit</button>`;
      html += `<button id="${timeEntryTableType}TimeEntryTableRow${timeEntryTableRowNumber}Delete" class="delete-${timeEntryTableType}-time-entry-btn btn btn-sm btn-link" data-toggle='modal' data-target='#confirmDeleteTimeEntryModal' data-timeentry=${res.data.timeEntry._id} data-hours=${res.data.timeEntry.hours}>Delete</button>`;
      html += `<button id="${timeEntryTableType}TimeEntryTableRow${timeEntryTableRowNumber}Edit" class="edit-time-entry-btn btn btn-sm btn-link" data-toggle='modal' data-target='#editTimeEntryModal' data-tabletype=${timeEntryTableType} data-rownumber=${timeEntryTableRowNumber} data-timeentry=${res.data.timeEntry._id} data-date=${res.data.timeEntry.date} data-company=${res.data.timeEntry.company._id} data-hours=${res.data.timeEntry.hours} data-description=${res.data.timeEntry.description}>${editSVG}</button>`;
    }
  } else {
    html += `<button id="${timeEntryTableType}TimeEntryTableRow${timeEntryTableRowNumber}Submit" class="submit-${timeEntryTableType}-time-entry-btn btn btn-sm btn-link" data-toggle='modal' data-target='#confirmSubmitTimeEntryModal' data-timeentry=${res.data.timeEntry._id} data-hours=${res.data.timeEntry.hours}>Submit</button>`;
    html += `<button id="${timeEntryTableType}TimeEntryTableRow${timeEntryTableRowNumber}Delete" class="delete-${timeEntryTableType}-time-entry-btn btn btn-sm btn-link" data-toggle='modal' data-target='#confirmDeleteTimeEntryModal' data-timeentry=${res.data.timeEntry._id} data-hours=${res.data.timeEntry.hours}>Delete</button>`;
    html += `<button id="${timeEntryTableType}TimeEntryTableRow${timeEntryTableRowNumber}Edit" class="edit-time-entry-btn btn btn-sm btn-link" data-toggle='modal' data-target='#editTimeEntryModal' data-tabletype=${timeEntryTableType} data-rownumber=${timeEntryTableRowNumber} data-timeentry=${res.data.timeEntry._id} data-date=${res.data.timeEntry.date} data-company=${res.data.timeEntry.company._id} data-hours=${res.data.timeEntry.hours} data-description=${res.data.timeEntry.description}>${editSVG}</button>`;
  }
  return html;
}

// Init table actions on load
instantiateTimeEntryNewTableActions();
instantiateHourLogOneTableActions();

function instantiateTimeEntryNewTableActions() {
  const createdTimeEntryTableApproveForm = '.created-time-entry-table-approve-form';
  const createdTimeEntryTableHideForm = '.created-time-entry-table-hide-form';
  const createdTimeEntryTableSubmitBtn = '.submit-created-time-entry-btn';
  const createdTimeEntryTableDeleteBtn = '.delete-created-time-entry-btn';
  instantiateTimeEntryTableActions("created", createdTimeEntryTableApproveForm, createdTimeEntryTableHideForm, "", createdTimeEntryTableSubmitBtn, createdTimeEntryTableDeleteBtn);
}

function instantiateHourLogOneTableActions() {
  const approvedTimeEntryTableHideForm = '.approved-time-entry-table-hide-form';
  const approvedTimeEntryTableRejectBtn = '.reject-approved-time-entry-btn';
  instantiateTimeEntryTableActions("approved", "", approvedTimeEntryTableHideForm, approvedTimeEntryTableRejectBtn, "", "");
  const hiddenTimeEntryTableApproveForm = '.hidden-time-entry-table-approve-form';
  const hiddenTimeEntryTableRejectBtn = '.reject-hidden-time-entry-btn';
  instantiateTimeEntryTableActions("hidden", hiddenTimeEntryTableApproveForm, "", hiddenTimeEntryTableRejectBtn, "", "");
  const submittedTimeEntryTableApproveForm = '.submitted-time-entry-table-approve-form';
  const submittedTimeEntryTableHideForm = '.submitted-time-entry-table-hide-form';
  const submittedTimeEntryTableRejectBtn = '.reject-submitted-time-entry-btn';
  instantiateTimeEntryTableActions("submitted", submittedTimeEntryTableApproveForm, submittedTimeEntryTableHideForm, submittedTimeEntryTableRejectBtn, "", "");
}

// Function to initialize listeners and actions on dynamically created time entry buttons
export function instantiateTimeEntryTableActions(timeEntryTableType, approveFormSelector, hideFormSelector, rejectBtnSelector, submitBtnSelector, deleteBtnSelector) {
  if (timeEntryTableType === "appoved") {
    hideFormListener(hideFormSelector, timeEntryTableType);
    confirmRejectBtnListener(rejectBtnSelector, timeEntryTableType)
  } else if (timeEntryTableType === "hidden") {
    approveFormListener(approveFormSelector, timeEntryTableType);
    confirmRejectBtnListener(rejectBtnSelector, timeEntryTableType)
  } else if (timeEntryTableType === "submitted") {
    approveFormListener(approveFormSelector, timeEntryTableType);
    hideFormListener(hideFormSelector, timeEntryTableType);
    confirmRejectBtnListener(rejectBtnSelector, timeEntryTableType)
  } else if (timeEntryTableType === "created") {
    approveFormListener(approveFormSelector, timeEntryTableType);
    hideFormListener(hideFormSelector, timeEntryTableType);
    confirmDeleteBtnListener(deleteBtnSelector, timeEntryTableType);
    confirmSubmitBtnListener(submitBtnSelector, timeEntryTableType);
  }
}

// Approve listener
function approveFormListener(form, timeEntryTableType) {
  $(form).on('submit', function(e) {
    console.log(`ajaxTimeEntryTableApprove`);
    e.preventDefault();
    $(`#${timeEntryTableType}TimeEntryTable`).DataTable().row($(this).closest('tr')).remove().draw();
    console.log(this);
    updateTotalTimeEntryTableHours(timeEntryTableType, $(this).data('hours'), 0);
    axios
      .post(this.action)
      .then(res => {})
      .catch(console.error);
  });
}

// Hide listener
function hideFormListener(form, timeEntryTableType) {
  $(form).on('submit', function(e) {
    console.log(`ajaxTimeEntryTableHide`);
    e.preventDefault();
    $(`#${timeEntryTableType}TimeEntryTable`).DataTable().row($(this).closest('tr')).remove().draw();
    updateTotalTimeEntryTableHours(timeEntryTableType, $(this).data('hours'), 0);
    axios
      .post(this.action)
      .then(res => {})
      .catch(console.error);
  });
}

// Reject listener
let rejectTimeEntryBtn;
const rejectForm = '#confirmRejectTimeEntryForm';
function confirmRejectBtnListener(button, timeEntryTableType) {
  $(button).on("click", function () {
    rejectTimeEntryBtn = this;
    $("#confirmRejectTimeEntryForm").attr("action", `/api/v1/timeEntry/${$(this).data('timeentry')}/delete`);
    if ($(submitForm).data('submitted') === true) {
      throw new Error("Preventing double submission")
    } else {
      $(submitForm).data('submitted', true);
    }
    $(rejectForm).on('submit', function(e) {
      console.log(`ajaxTimeEntryTableReject`);
      e.preventDefault();
      $(rejectForm).unbind(e);
      $(`#${timeEntryTableType}TimeEntryTable`).DataTable().row($(this).closest('tr')).remove().draw();
      updateTotalTimeEntryTableHours(timeEntryTableType, $(this).data('hours'), 0);
      axios
        .post(this.action)
        .then(res => {})
        .catch(console.error)
    });
  });
  $('#confirmRejectTimeEntryBtn').on("click", function () {
    $('#confirmRejectTimeEntryModal').modal('toggle');
  });
}

// Submit listener
let submitTimeEntryBtn;
const submitForm = '#confirmSubmitTimeEntryForm';
function confirmSubmitBtnListener(button, timeEntryTableType) {
  $(button).on("click", function () {
    submitTimeEntryBtn = this;
    $("#confirmSubmitTimeEntryForm").attr("action", `/api/v1/timeEntry/${$(this).data('timeentry')}/submit`);
    if ($(submitForm).data('submitted') === true) {
      throw new Error("Preventing double submission")
    } else {
      $(submitForm).data('submitted', true);
    }
    $(submitForm).on('submit', function(e) {
      console.log(`ajaxTimeEntryTableSubmit`);
      e.preventDefault();
      $(`#${timeEntryTableType}TimeEntryTable`).DataTable().row($(submitTimeEntryBtn).closest("tr")).remove().draw();
      updateTotalTimeEntryTableHours(timeEntryTableType, $(submitTimeEntryBtn).data('hours'), 0);
      axios
        .post(this.action)
        .then(res => {})
        .catch(console.error)
    });
  });
  $('#confirmCreatedTimeEntrySubmitBtn').on("click", function () {
    $('#confirmSubmitTimeEntryModal').modal('toggle');
  });
}

// Delete listener
let deleteTimeEntryBtn;
const deleteForm = '#confirmDeleteTimeEntryForm';
function confirmDeleteBtnListener(button, timeEntryTableType) {
  $(button).on("click", function () {
    deleteTimeEntryBtn = this;
    $("#confirmDeleteTimeEntryForm").attr("action", `/api/v1/timeEntry/${$(this).data('timeentry')}/delete`);
    if ($(submitForm).data('submitted') === true) {
      throw new Error("Preventing double submission")
    } else {
      $(submitForm).data('submitted', true);
    }
    $(deleteForm).on('submit', function(e) {
      console.log(`ajaxTimeEntryTableDelete`);
      e.preventDefault();
      $(`#${timeEntryTableType}TimeEntryTable`).DataTable().row($(deleteTimeEntryBtn).closest("tr")).remove().draw();
      updateTotalTimeEntryTableHours(timeEntryTableType, $(deleteTimeEntryBtn).data('hours'), 0);
      axios
        .post(this.action)
        .then(res => {})
        .catch(console.error)
    });
  });
  $('#confirmTimeEntryDeleteBtn').on("click", function () {
    $('#confirmDeleteTimeEntryModal').modal('toggle');
  });
}

// Update total time entry table hours value
export function updateTotalTimeEntryTableHours(timeEntryTableType, oldHours, newHours) {
  const uppercaseTimeEntryTableType = timeEntryTableType.charAt(0).toUpperCase() + timeEntryTableType.slice(1);
  const totalTimeTableEntryHours = +$(`#total${uppercaseTimeEntryTableType}TimeEntryHours`).html();
  const newTotal = (totalTimeTableEntryHours - (+oldHours - +newHours));
  console.log(`${totalTimeTableEntryHours} - (${oldHours} - ${newHours}) = ${newTotal}`);
  if (timeEntryTableType === "created") {
    $(`#${timeEntryTableType}TimeEntryTable`).DataTable().row(`#total${uppercaseTimeEntryTableType}TimeEntryHoursRow`).data([
      ``,
      ``,
      `${newTotal}`,
      ``,
      ``
    ]).draw();
  } else {
    $(`#${timeEntryTableType}TimeEntryTable`).DataTable().row(`#total${uppercaseTimeEntryTableType}TimeEntryHoursRow`).data([
      ``,
      ``,
      ``,
      `${newTotal}`,
      ``,
      ``
    ]).draw();
  }
}

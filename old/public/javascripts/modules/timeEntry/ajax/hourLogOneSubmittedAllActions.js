import flash from '../../helpers/flasher';

import axios from 'axios';

$('#confirmApproveAllSubmittedTimeEntryForm').on('submit', ajaxSendApproveAllSubmitted);
$('#confirmHideAllSubmittedTimeEntryForm').on('submit', ajaxSendHideAllSubmitted);
$('#confirmRejectAllSubmittedTimeEntryForm').on('submit', ajaxSendRejectAllSubmitted);

const approvedTimeEntryTable = $('#approvedTimeEntryTable');
const hiddenTimeEntryTable = $('#hiddenTimeEntryTable');
const submittedTimeEntryTable = $('#submittedTimeEntryTable');
const lastElementInSubmittedTimeEntryTable = submittedTimeEntryTable.find('tr:last');
lastElementInSubmittedTimeEntryTable.prevAll('tr');

function ajaxSendApproveAllSubmitted(e) {
  e.preventDefault();
  $('#confirmApproveAllSubmittedTimeEntryModal').modal('toggle');
  axios
    .post(this.action)
    .then(res => {
      submittedTimeEntryTable.DataTable().rows(lastElementInSubmittedTimeEntryTable.prevAll('tr')).remove().draw();
      submittedTimeEntryTable.DataTable().row(`#totalSubmittedTimeEntryHoursRow`).data([
        ``,
        ``,
        ``,
        `0`,
        ``,
        ``
      ]).draw();
      for (let i = 0; i < timeEntries.length; i++) {
        approvedTimeEntryTable.DataTable().add([
          ``,
          ``,
          ``,
          `${+$('#totalApprovedTimeEntryHours').html() + +res.data.hours}`,
          ``,
          ``
        ]).draw();
      }
      approvedTimeEntryTable.DataTable().row(`#totalApprovedTimeEntryHoursRow`).data([
        ``,
        ``,
        ``,
        `${+$('#totalApprovedTimeEntryHours').html() + +res.data.hours}`,
        ``,
        ``
      ]).draw();
      flash('success', "Successfully approved all submitted time entries");
    })
    .catch(console.error);
}

function ajaxSendHideAllSubmitted(e) {
  e.preventDefault();
  $('#confirmHideAllSubmittedTimeEntryModal').modal('toggle');
  axios
    .post(this.action)
    .then(res => {
      submittedTimeEntryTable.DataTable().rows(lastElementInSubmittedTimeEntryTable.prevAll('tr')).remove().draw();
      submittedTimeEntryTable.DataTable().row(`#totalSubmittedTimeEntryHoursRow`).data([
        ``,
        ``,
        ``,
        `0`,
        ``,
        ``
      ]).draw();
      hiddenTimeEntryTable.DataTable().row(`#totalHiddenTimeEntryHoursRow`).data([
        ``,
        ``,
        ``,
        `${+$('#totalHiddenTimeEntryHours').html() + +res.data.hours}`,
        ``,
        ``
      ]).draw();
      flash('success', "Successfully hid all submitted time entries");
    })
    .catch(console.error);
}

function ajaxSendRejectAllSubmitted(e) {
  e.preventDefault();
  $('#confirmRejectAllSubmittedTimeEntryModal').modal('toggle');
  axios
    .post(this.action)
    .then(res => {
      submittedTimeEntryTable.DataTable().rows(lastElementInSubmittedTimeEntryTable.prevAll('tr')).remove().draw();
      submittedTimeEntryTable.DataTable().row(`#totalSubmittedTimeEntryHoursRow`).data([
        ``,
        ``,
        ``,
        `0`,
        ``,
        ``
      ]).draw();
      flash('success', "Successfully rejected all submitted time entries");
    })
    .catch(console.error);
}
import flash from '../../helpers/flasher';

import axios from 'axios';

$('#confirmApproveAllTimeEntryForm').on('submit', ajaxSendApproveAll);
$('#confirmHideAllTimeEntryForm').on('submit', ajaxSendHideAll);
$('#confirmSubmitAllTimeEntryForm').on('submit', ajaxSendSubmitAll);
$('#confirmDeleteAllTimeEntryForm').on('submit', ajaxSendDeleteAll);

const createTimeEntryTable = $('#createdTimeEntryTable');
const lastElement = createTimeEntryTable.find('tr:last');
lastElement.prevAll('tr')

function ajaxSendApproveAll(e) {
  e.preventDefault();
  $('#confirmApproveAllTimeEntryModal').modal('toggle');
  axios
    .post(this.action)
    .then(res => {
      createTimeEntryTable.DataTable().rows(lastElement.prevAll('tr')).remove().draw();
      createTimeEntryTable.DataTable().row(`#totalCreatedTimeEntryHoursRow`).data([
        ``,
        ``,
        `0`,
        ``,
        ``
      ]).draw();
      flash('success', "Successfully approved all time entries");
    })
    .catch(console.error);
}

function ajaxSendHideAll(e) {
  e.preventDefault();
  $('#confirmHideAllTimeEntryModal').modal('toggle');
  axios
    .post(this.action)
    .then(res => {
      createTimeEntryTable.DataTable().rows(lastElement.prevAll('tr')).remove().draw();
      createTimeEntryTable.DataTable().row(`#totalCreatedTimeEntryHoursRow`).data([
        ``,
        ``,
        `0`,
        ``,
        ``
      ]).draw();
      flash('success', "Successfully hid all time entries");
    })
    .catch(console.error);
}

function ajaxSendSubmitAll(e) {
  e.preventDefault();
  $('#confirmSubmitAllTimeEntryModal').modal('toggle');
  axios
    .post(this.action)
    .then(res => {
      createTimeEntryTable.DataTable().rows(lastElement.prevAll('tr')).remove().draw();
      createTimeEntryTable.DataTable().row(`#totalCreatedTimeEntryHoursRow`).data([
        ``,
        ``,
        `0`,
        ``,
        ``
      ]).draw();
      flash('success', "Successfully submitted all time entries");
    })
    .catch(console.error);
}

function ajaxSendDeleteAll(e) {
  e.preventDefault();
  $('#confirmDeleteAllTimeEntryModal').modal('toggle');
  axios
    .post(this.action)
    .then(res => {
      createTimeEntryTable.DataTable().rows(lastElement.prevAll('tr')).remove().draw();
      createTimeEntryTable.DataTable().row(`#totalCreatedTimeEntryHoursRow`).data([
        ``,
        ``,
        `0`,
        ``,
        ``
      ]).draw();
      flash('success', "Successfully deleted all time entries");
    })
    .catch(console.error);
}
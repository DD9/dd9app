import createTimeEntryValidation from '../createTimeEntryValidation';
import { createTimeEntryTableActionButtonsHtml, instantiateTimeEntryTableActions, updateTotalTimeEntryTableHours } from "./timeEntryTableActions";
import { instantiateEditTimeEntryBtn } from "./editTimeEntry"


import axios from 'axios';
import moment from 'moment';

$('#createTimeEntryForm').on('submit', ajaxAddCreatedTimeEntry);

function ajaxAddCreatedTimeEntry(e) {
  console.log(`ajaxAddCreatedTimeEntry`);
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
      const createdTimeEntryTable = $('#createdTimeEntryTable');
      const timeEntryTableType = "created";
      const timeEntryTableRowNumber = createdTimeEntryTable.find('tr').length-2;
      const companyName = $(this).find('option:selected').text();
      createdTimeEntryTable.DataTable().row.add([
        `${moment.utc(res.data.timeEntry.date).format("YYYY-MM-DD")}`,
        `${companyName}`,
        `${res.data.timeEntry.hours}`,
        `${res.data.timeEntry.description}`,
        `${createTimeEntryTableActionButtonsHtml(res, timeEntryTableType, timeEntryTableRowNumber)}`
      ]).draw().node().id = `${timeEntryTableType}TimeEntryTableRow${timeEntryTableRowNumber}`;
      updateTotalTimeEntryTableHours(timeEntryTableType, 0, res.data.timeEntry.hours);
      instantiateTimeEntryTableActions(
        timeEntryTableType,
        `#${timeEntryTableType}TimeEntryTableRow${timeEntryTableRowNumber}Approve`,
        `#${timeEntryTableType}TimeEntryTableRow${timeEntryTableRowNumber}Hide`,
        `#${timeEntryTableType}TimeEntryTableRow${timeEntryTableRowNumber}Reject`,
        `#${timeEntryTableType}TimeEntryTableRow${timeEntryTableRowNumber}Submit`,
        `#${timeEntryTableType}TimeEntryTableRow${timeEntryTableRowNumber}Delete`,
      );
      instantiateEditTimeEntryBtn(`#${timeEntryTableType}TimeEntryTableRow${timeEntryTableRowNumber}Edit`);
      // $('#createTimeEntryForm #hours, #description').val('');
    })
    .catch(console.error);
}
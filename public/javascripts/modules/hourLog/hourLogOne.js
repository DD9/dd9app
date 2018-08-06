import 'datatables.net-bs4';

$('#approvedTimeEntryTable, #hiddenTimeEntryTable, #submittedTimeEntryTable').dataTable({
  "dom": "<'row'<'col user-all-table-title'><'col user-all-table-filter'f>>" +
  "<'row'<'col-sm-12 user-all-table'tr>>" +
  "<'row'<'col-sm-12 col-md-5'i><'col-sm-12 col-md-7 user-all-table-paginate'p>>",
  "bFilter": false,
  "paging": false,
  "pagination": false,
  "bInfo": false,
  "aaSorting": [0,'desc'],
  "columns": [
    { "width": "9%"},
    { "width": "15%"},
    { "width": "15%"},
    { "width": "4%"},
    { "width": "36%"},
    { "width": "21%"},
  ]
});
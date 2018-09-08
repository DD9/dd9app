import 'datatables.net-bs4';

$('#openHourLogAllTable').dataTable({
  "dom": "<'row'<'col hour-log-all-table-title'><'col hour-log-all-table-filter'f>>" +
  "<'row'<'col-sm-12 hour-log-all-table'tr>>" +
  "<'row'<'col-sm-12 col-md-5'i><'col-sm-12 col-md-7 hour-log-all-table-paginate'p>>",
  "bFilter": false,
  "paging": false,
  "bInfo": false,
  "aaSorting": [[0,'desc'], [2,'asc'], [3,'asc']],
  language: {sSearch: "", searchPlaceholder: "Search..."},
  "columns": [
    {"width": "12.5%"},
    {"width": "12.5%"},
    {"width": "30%"},
    {"width": "30%"},
    {"width": "7.5%"},
    {"width": "7.5%"}
  ]
});

$('#closedHourLogAllTable').dataTable({
"dom": "<'row'<'col hour-log-all-table-title'><'col hour-log-all-table-filter'f>>" +
"<'row'<'col-sm-12 hour-log-all-table'tr>>" +
"<'row'<'col-sm-12 col-md-5'i><'col-sm-12 col-md-7 hour-log-all-table-paginate'p>>",
  "bFilter": false,
  "paging": true,
  "bInfo": true,
  pageLength: 25,
  "aaSorting": [[0,'desc'], [2,'asc'], [3,'asc']],
  language: {sSearch: "", searchPlaceholder: "Search..."},
"columns": [
  {"width": "12.5%"},
  {"width": "12.5%"},
  {"width": "30%"},
  {"width": "30%"},
  {"width": "7.5%"},
  {"width": "7.5%"}
]
});
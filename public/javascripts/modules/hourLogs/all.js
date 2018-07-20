import $ from 'jquery';
import 'datatables.net-bs4';
import 'datatables.net-scroller-bs4';

$('#hour_log_all_table').dataTable({
  "dom": "<'row'<'col hour-log-all-table-title'><'col hour-log-all-table-filter'f>>" +
  "<'row'<'col-sm-12 hour-log-all-table'tr>>" +
  "<'row'<'col-sm-12 col-md-5'i><'col-sm-12 col-md-7 hour-log-all-table-paginate'p>>",
  "bFilter": true,
  "bLengthChange": false,
  "bInfo": false,
  "aaSorting": [[0,'desc'], [2,'asc']],
  scrollY: 700,
  scroller: true,
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

$(".hour-log-all-table-title").html(
  '<h3>Hour Logs</h3>'
);
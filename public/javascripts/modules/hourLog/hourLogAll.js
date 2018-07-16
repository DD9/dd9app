import $ from 'jquery';
import 'datatables.net-bs4';
import 'datatables.net-scroller-bs4';

$('#hour_log_all').dataTable({
  "dom": "<'row'<'col'><'col hour_log_all_filter'f>>" +
  "<'row'<'col-sm-12 hour_log_all_table'tr>>" +
  "<'row'<'col-sm-12 col-md-5'i><'col-sm-12 col-md-7'p>>",
  "bFilter": true,
  "bLengthChange": false,
  "bInfo": false,
  scrollY: 700,
  scroller: true,
  language: {sSearch: "", searchPlaceholder: "Search..."},
  "columns": [
    {"width": "15%"},
    {"width": "35%"},
    {"width": "35%"},
    {"width": "7.5%"},
    {"width": "7.5%"}
  ]
});
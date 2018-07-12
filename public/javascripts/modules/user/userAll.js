import $ from 'jquery';
import 'datatables.net-bs4';
import 'datatables.net-scroller-bs4';

$('#user_all').dataTable( {
  "dom": "<'row'<'col'><'col hour_log_all_filter'f>>" +
  "<'row'<'col-sm-12 hour_log_all_table'tr>>" +
  "<'row'<'col-sm-12 col-md-5'i><'col-sm-12 col-md-7'p>>",
  "bFilter": true,
  "bLengthChange": false,
  "bInfo": false,
  scrollY: 700,
  scroller: true,
  select: true,
  language: {sSearch: "", searchPlaceholder: "Search..."},
  "columnDefs": [
    { "width": "15%", "targets": 0 },
    { "width": "35%", "targets": 0 },
    { "width": "30%", "targets": 0 },
    { "width": "10%", "targets": 0 },
    { "width": "10%", "targets": 0 },
  ]
});
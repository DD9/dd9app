import 'datatables.net-bs4';
import 'datatables.net-scroller-bs4';

// Datatables and table title
$('#companyOneTable').dataTable({
  "dom": "<'row'<'col company-one-table-title'><'col company-one-table-filter'f>>" +
  "<'row'<'col-sm-12 company-one-table'tr>>" +
  "<'row'<'col-sm-12 col-md-5'i><'col-sm-12 col-md-7 company-one-table-paginate'p>>",
  "bFilter": true,
  "bInfo": false,
  "paging": false,
  "aaSorting": [[0,'dsc'], [1,'asc']],
  language: {sSearch: "", searchPlaceholder: "Search..."},
  "columns": [
    { "width": "15%"},
    { "width": "15%"},
    { "width": "50%"},
    { "width": "10%"},
    { "width": "10%"},
  ]
});

$(".company-one-table-title").html(
  '<h4>Hour Logs</h4>'
);
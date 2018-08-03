import 'datatables.net-bs4';
import 'datatables.net-scroller-bs4';

// Datatables and table title
const companyAllTable = $('#companyAllTable');
companyAllTable.dataTable({
  "dom": "<'row'<'col company-all-table-title'><'col company-all-table-filter'f>>" +
  "<'row'<'col-sm-12 company-all-table'tr>>" +
  "<'row'<'col-sm-12 col-md-5'i><'col-sm-12 col-md-7 company-all-table-paginate'p>>",
  "bFilter": true,
  "bLengthChange": false,
  "bInfo": false,
  "aaSorting": [[1,'asc'], [0,'asc']],
  scrollY: 700,
  scroller: true,
  language: {sSearch: "", searchPlaceholder: "Search..."},
  "columns": [
    {"width": "50%"},
    {"width": "50%"},
  ]
});

$(".company-all-table-title").html(
  '<h3>Companies</h3>' +
  '<button type="button" class="create-company-btn btn btn-primary" data-toggle="modal" data-target="#createCompanyModal">Add Company</button>'
);
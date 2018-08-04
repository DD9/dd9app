import 'datatables.net-bs4';

// Datatables and table title
$('#userAllTable').dataTable({
  "dom": "<'row'<'col user-all-table-title'><'col user-all-table-filter'f>>" +
  "<'row'<'col-sm-12 user-all-table'tr>>" +
  "<'row'<'col-sm-12 col-md-5'i><'col-sm-12 col-md-7 user-all-table-paginate'p>>",
  "bFilter": true,
  "paging": false,
  "bInfo": false,
  "aaSorting": [0,'asc'],
  language: {sSearch: "", searchPlaceholder: "Search..."},
  "columns": [
    { "width": "20%"},
    { "width": "20%"},
    { "width": "10%"},
    { "width": "30%"},
    { "width": "10%"},
    { "width": "10%"},
  ]
});

$(".user-all-table-title").html(
  '<h3>Users</h3>' +
  '<button type="button" class="create-user-btn btn btn-primary" data-toggle="modal" data-target="#createUserModal">Add User</button>'
);

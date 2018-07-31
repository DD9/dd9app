import 'datatables.net-bs4';
import 'datatables.net-scroller-bs4';
import axios from 'axios';
import moment from 'moment';

// Datatables and table title
const userAllTable = $('#userAllTable').dataTable({
  "dom": "<'row'<'col user-all-table-title'><'col user-all-table-filter'f>>" +
  "<'row'<'col-sm-12 user-all-table'tr>>" +
  "<'row'<'col-sm-12 col-md-5'i><'col-sm-12 col-md-7 user-all-table-paginate'p>>",
  "bFilter": true,
  "bLengthChange": false,
  "bInfo": false,
  "aaSorting": [[0,'asc']],
  scrollY: 400,
  scroller: true,
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

// Populate the edit modal with current data
$('.edit-user-btn').on("click", function () {
  $("#editUserForm").attr("action", `/api/v1/user/${$(this).data('user')}/edit`);
  $("#company").val($(this).data('company'));
  $("#status").val($(this).data('status'));
  $("#role").val($(this).data('role'));
  $("#firstName").val($(this).data('firstname'));
  $("#lastName").val($(this).data('lastname'));
  $("#email").attr('placeholder', ($(this).data('email')));
});

// User table ajax on submit
$('#editUserForm').on('submit', ajaxEditUser);
function ajaxEditUser(e) {
  e.preventDefault();
  $('#editUserModal').modal('toggle');
  axios
    .post(this.action, {
      company: this.company.value,
      status: this.status.value,
      role: this.role.value,
      firstName: this.firstName.value,
      lastName: this.lastName.value,
      lastLogin: this.lastLogin.value
    })
    .then(res => {
      userAllTable.DataTable().row(`#${res.data.email}`).data([
        `${res.data.firstName} ${res.data.lastName}`,
        `${res.data.email}`,
        `<a href='/company/${res.data.company._id}'>${res.data.company.name}</a>`,
        `${res.data.role}`,
        `${moment(res.data.lastLogin).format("dddd, MMMM Do YYYY [at] h:mmA")}`,
        `<a class="edit-user-btn center-me" data-toggle="modal" href="#editUserModal" data-company=${res.data.company._id} data-status=${res.data.status} data-role=${res.data.role} data-firstName=${res.data.firstName} data-lastName=${res.data.lastName} data-email=${res.data.email} data-lastlogin=${res.data.lastLogin}>Edit</a>`
      ]).draw();
    })
    .catch(console.error);
}

import editUserValidation from '../editUserValidation';

import axios from 'axios';
import moment from 'moment';

instantiateEditUserButton();

// Populate the user all edit modal with current data
let editUserBtn;
function instantiateEditUserButton() {
  $('.edit-user-btn').on("click", function () {
    editUserBtn = this;
    $("#editUserAllForm").attr("action", `/api/v1/user/${$(this).data('user')}/edit/admin`);
    $("#company").val($(this).data('company'));
    $("#status").val($(this).data('status'));
    $("#role").val($(this).data('role'));
    $("#firstName").val($(this).data('firstname'));
    $("#lastName").val($(this).data('lastname'));
    $("#email").attr('placeholder', ($(this).data('email')));
    $("#lastLogin").val(($(this).data('lastlogin')));
  });
}

// User all table ajax on submit
$('#editUserAllForm').on('submit', ajaxEditUser);
function ajaxEditUser(e) {
  e.preventDefault();
  editUserValidation();
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
      let date = '';
      if (res.data.lastLogin !== "null") {
        date = moment.utc(res.data.lastLogin).format("dddd, MMMM Do YYYY [at] h:mmA [UTC]")
      }
      $('#userAllTable').DataTable().row(`#${res.data.email}`).data([
        `${res.data.firstName} ${res.data.lastName}`,
        `${res.data.email}`,
        `<a href='/company/${res.data.company._id}'>${res.data.company.name}</a>`,
        `${res.data.role}`,
        `${date}`,
        `<a class="edit-user-btn center-me" data-toggle="modal" href="#editUserModal" data-user=${res.data._id} data-company=${res.data.company._id} data-status=${res.data.status} data-role=${res.data.role} data-firstName=${res.data.firstName} data-lastName=${res.data.lastName} data-email=${res.data.email} data-lastlogin=${res.data.lastLogin}>Edit</a>`
      ]).draw();
      instantiateEditUserButton();
    })
    .catch(console.error);
}
import editUserValidation from '../editUserValidation';

import axios from 'axios';

// Populate user account page with current data
const company = $("#company");
const status = $('#status');
const role = $('#role');
const firstName = $('#firstName');
const lastName = $('#lastName');
$(document).ready(function () {
  if(window.location.href.indexOf("/user/one") > -1) {
    company.val(company.attr('data-value'));
    status.val(status.attr('data-value'));
    role.val(role.attr('data-value'));
  }
});

// My account ajax on submit
$('#editUserOneForm').on('submit', ajaxEditUser);
function ajaxEditUser(e) {
  e.preventDefault();
  editUserValidation();
  axios
    .post(this.action, {
      firstName: this.firstName.value,
      lastName: this.lastName.value,
    })
    .then(res => {
      firstName.val(res.data.firstName);
      lastName.val(res.data.lastName);
    })
    .catch(console.error);
}

// My account ajax on submit for admins
$('#editUserOneFormAdmin').on('submit', ajaxEditUserAdmin);
function ajaxEditUserAdmin(e) {
  e.preventDefault();
  editUserValidation();
  axios
    .post(this.action, {
      company: this.company.value,
      status: this.status.value,
      role: this.role.value,
      firstName: this.firstName.value,
      lastName: this.lastName.value,
    })
    .then(res => {
      if (res.data.role !== "admin") {
        location.reload();
      } else {
        company.val(res.data.company._id);
        status.val(res.data.status);
        role.val(res.data.role);
        firstName.val(res.data.firstName);
        lastName.val(res.data.lastName);
        company.attr('data-value', res.data.company._id);
        status.attr('data-value', res.data.status);
        role.attr('data-value', res.data.role);
      }
    })
    .catch(console.error);
}
import axios from 'axios';

$('#activateCompanyForm').on('submit', ajaxActivateCompanyForm);
$('#deactivateCompanyForm').on('submit', ajaxDeactivateCompanyForm);

function ajaxActivateCompanyForm(e) {
  e.preventDefault();
  axios
    .post(this.action)
    .then(res => {
      $('#activateCompanyBtn').addClass('d-none');
      $('#editCompanyBtn').removeClass('d-none');
    })
    .catch(console.error);
}

function ajaxDeactivateCompanyForm(e) {
  e.preventDefault();
  $('#editCompanyModal').modal('toggle');
  axios
  // .get() //TODO confirm no open hourlog, flashes
  // .then(res => {
  //
  // })
    .post(this.action)
    .then(res => {
      $('#activateCompanyBtn').removeClass('d-none');
      $('#editCompanyBtn').addClass('d-none');
    })
    .catch(console.error);
}
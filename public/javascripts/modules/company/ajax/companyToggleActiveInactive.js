import flash from '../../helpers/flasher';

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
      flash('success', `${res.data.name} successfully activated`);
    })
    .catch(console.error);
}

function ajaxDeactivateCompanyForm(e) {
  e.preventDefault();
  $('#editCompanyModal').modal('toggle');
  axios
    .post(this.action)
    .then(res => {
      if (res.data.hasOpenHourLog) {
        flash('danger', `Cannot deactivate a company with an open hour log`);
        throw new Error("cannot deactivate a company with an open hour log");
      }
      $('#activateCompanyBtn').removeClass('d-none');
      $('#editCompanyBtn').addClass('d-none');
      flash('success', `${res.data.company.name} successfully deactivated`);
    })
    .catch(console.error);
}
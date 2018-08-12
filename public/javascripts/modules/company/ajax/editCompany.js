import axios from 'axios';

import editCompanyValidation from '../editCompanyValidation';

$('#editCompanyForm').on('submit', ajaxEditCompany);
function ajaxEditCompany(e) {
  e.preventDefault();
  editCompanyValidation();
  $('#editCompanyModal').modal('toggle');
  axios
    .post(this.action, {
      name: this.name.value,
    })
    .then(res => {
      $('.company-title').html(res.data.name);
    })
    .catch(console.error);
}
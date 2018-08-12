import axios from 'axios';

import createCompanyValidation from '../createCompanyValidation';

$('#createCompanyForm').on('submit', ajaxCreateCompany);
function ajaxCreateCompany(e) {
  e.preventDefault();
  createCompanyValidation();
  $('#createCompanyModal').modal('toggle');
  axios
    .post(this.action, {
      name: this.name.value,
    })
    .then(res => {
      $('#companyAllTable').DataTable().row.add([
        `<a href='/company/${res.data.name}'>${res.data.name}</a>`,
        `${res.data.status.charAt(0).toUpperCase() + res.data.status.slice(1)}`,
      ]).draw();
    })
    .catch(console.error);
}
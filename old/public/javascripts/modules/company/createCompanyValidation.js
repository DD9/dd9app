const createCompanyForm = $('#createCompanyForm');
const companyNameInput = createCompanyForm.find('#name');
const companyAllTable = $('#companyAllTable');
const companyNames = [];

// Check for duplicates
companyAllTable.find('.company-name a').each(function () {
  companyNames.push(this.innerHTML.toLowerCase().trim());
});

function createCompanyValidation() {
  const companyNameInputVal = companyNameInput.val().toLowerCase().trim();

  let hasError = false;

  if (!companyNameInputVal) {
    hasError = true;
    createCompanyForm.find('.invalid-feedback').html("Company name required.");
    companyNameInput.addClass('is-invalid');
  }

  if (companyNames.includes(companyNameInputVal)) {
    hasError = true;
    createCompanyForm.find('.invalid-feedback').html("Company name must be unique.");
    companyNameInput.addClass('is-invalid');
  }

  if (hasError) {
    throw new Error("Form not validated");
  } else {
    companyNameInput.removeClass('is-invalid');
  }
}

$('#createCompanyModal').on('hidden.bs.modal', function () {
  companyNameInput.removeClass('is-invalid');
  companyNameInput.val('');
});

export default createCompanyValidation
const companyAllTable = $('#companyAllTable');
const companyNames = [];

// Check for duplicates
companyAllTable.find('.companyName a').each(function () {
  companyNames.push(this.innerHTML.toLowerCase().trim());
});

function createCompanyValidation() {
  const createCompanyForm = $('#createCompanyForm');
  const companyNameInput = createCompanyForm.find('#name');
  const companyNameInputVal = companyNameInput.val().toLowerCase().trim();

  let hasError = false;
  if (!companyNameInputVal) {
    hasError = true;
    createCompanyForm.find('.invalid-feedback').html("Company name required.");
    companyNameInput.addClass('is-invalid');
  } else if (companyNames.includes(companyNameInputVal)) {
    hasError = true;
    createCompanyForm.find('.invalid-feedback').html("Company name must be unique.");
    companyNameInput.addClass('is-invalid');
  } else {
    companyNameInput.removeClass('is-invalid');
  }

  if (hasError) {
    throw new Error("Form not validated");
  }
}

export default createCompanyValidation
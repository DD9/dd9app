const editCompanyForm = $('#editCompanyForm');
const companyNameInput = $('#companyName');
const companyNames = [];

// Check for duplicates
$('.companies-json').find('p').each(function () {
  companyNames.push(this.innerHTML.toLowerCase().trim());
});

function editCompanyValidation() {
  const companyNameInputVal = companyNameInput.val().toLowerCase().trim();

  let hasError = false;

  if (!companyNameInputVal) {
    hasError = true;
    editCompanyForm.find('.invalid-feedback').html("Company name required.");
    companyNameInput.addClass('is-invalid');
  } else {
    companyNameInput.removeClass('is-invalid');
  }

  if (companyNames.includes(companyNameInputVal)) {
    hasError = true;
    editCompanyForm.find('.invalid-feedback').html("Company name must be unique.");
    companyNameInput.addClass('is-invalid');
  } else {
    companyNameInput.removeClass('is-invalid');
  }

  if (hasError) {
    throw new Error("Form not validated");
  }
}

export default editCompanyValidation
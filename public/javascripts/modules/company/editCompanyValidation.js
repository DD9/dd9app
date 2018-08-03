const editCompanyForm = $('#editCompanyForm');
const companyNameInputField = $('#companyName');

// Reset editModal on close
editCompanyForm.on('hidden.bs.modal', function() {
  companyNameInputField.removeClass('is-invalid');
});

function editCompanyValidation() {
  const companyNameInputValue = companyNameInputField.val().toLowerCase().trim();

  let hasError = false;
  if (!companyNameInputValue) {
    hasError = true;
    editCompanyForm.find('.invalid-feedback').html("Company name required.");
    companyNameInputField.addClass('is-invalid');
  } else {
    companyNameInputField.removeClass('is-invalid');
  }

  if (hasError) {
    throw new Error("Form not validated");
  }
}

export default editCompanyValidation
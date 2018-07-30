function validateTimeEntryFormInput() {
  const timeEntryForm = $('.timeEntryForm');
  const dateInput = timeEntryForm.find('#date');
  const companyInput = timeEntryForm.find('#company');
  const hoursInput = timeEntryForm.find('#hours');
  const descriptionInput = timeEntryForm.find('#description');

  const dateVal = dateInput.val();
  const companyVal = companyInput.val();
  const hoursVal = hoursInput.val();
  const descriptionVal = descriptionInput.val();

  let hasError = false;

  if (!dateVal) {
    hasError = true;
    dateInput.closest('div').find('.invalid-feedback').html("Date required.");
    dateInput.addClass("is-invalid");
  } else {
    dateInput.removeClass("is-invalid");
  }

  if (!companyVal) {
    hasError = true;
    companyInput.closest('div').find('.invalid-feedback').html("Company required.");
    companyInput.addClass("is-invalid");
  } else {
    companyInput.removeClass("is-invalid");
  }

  if (!hoursVal) {
    hasError = true;
    hoursInput.closest('div').find('.invalid-feedback').html("Hours required.");
    hoursInput.addClass("is-invalid");
  } else {
    hoursInput.removeClass("is-invalid");
  }

  if (!descriptionVal) {
    hasError = true;
    descriptionInput.closest('div').find('.invalid-feedback').html("Description required.");
    descriptionInput.addClass("is-invalid");
  } else {
    descriptionInput.removeClass("is-invalid");
  }

  if (hasError) {
    throw new Error("Form not validated");
  }
}

export default validateTimeEntryFormInput;
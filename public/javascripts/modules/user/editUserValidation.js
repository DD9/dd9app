function editUserValidation() {
  const editUserForm = $('.edit-user-form');
  const firstNameInput = editUserForm.find('#firstName');
  const lastNameInput = editUserForm.find('#lastName');
  const firstName = firstNameInput.val();
  const lastName = lastNameInput.val();

  let hasError = false;

  if (!firstName) {
    hasError = true;
    firstNameInput.closest('div').find('.invalid-feedback').html("First name required.");
    firstNameInput.addClass('is-invalid');
  } else {
    firstNameInput.removeClass('is-invalid');
  }

  if (!lastName) {
    hasError = true;
    lastNameInput.closest('div').find('.invalid-feedback').html("Last name required.");
    lastNameInput.addClass('is-invalid');
  } else {
    lastNameInput.removeClass('is-invalid');
  }

  if (hasError) {
    throw new Error("Form not validated");
  }
}

export default editUserValidation
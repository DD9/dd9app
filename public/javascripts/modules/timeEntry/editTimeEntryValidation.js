const editTimeEntryModal = $('#editTimeEntryModal');
const hoursInput = editTimeEntryModal.find('#hours');
const descriptionInput = editTimeEntryModal.find('#description');

function editTimeEntryValidation() {
  const hoursVal = hoursInput.val();
  const descriptionVal = descriptionInput.val();

  let hasError = false;

  if (hoursVal.length > 6 || hoursVal.length < 1) {
    hasError = true;
    hoursInput.closest('div').find('.invalid-feedback').html("Invalid hours input.");
    hoursInput.addClass('is-invalid');
  } else {
    hoursInput.removeClass('is-invalid');
  }

  if (!descriptionVal) {
    hasError = true;
    descriptionInput.closest('div').find('.invalid-feedback').html("Description required.");
    descriptionInput.addClass('is-invalid');
  } else {
    descriptionInput.removeClass('is-invalid');
  }

  if (hasError) {
    throw new Error("Form not validated");
  }
}

editTimeEntryModal.on('hidden.bs.modal', function () {
  hoursInput.removeClass('is-invalid');
  descriptionInput.removeClass('is-invalid');
});

export default editTimeEntryValidation


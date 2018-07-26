const createTimeEntryForm = $('#createTimeEntryForm');
const dateInput = createTimeEntryForm.find('#date');
const hoursInput = createTimeEntryForm.find('#hours');
const descriptionInput = createTimeEntryForm.find('#description');

createTimeEntryForm.on('submit', function(e) {
  const dateVal = dateInput.val();
  const hoursVal= hoursInput.val();
  const descriptionVal = descriptionInput.val();

  if (!dateVal) {
    dateInput.closest('div').find('.invalid-feedback').html("Date required.");
    dateInput.addClass("is-invalid");
    e.preventDefault();
  }

  if (!hoursVal) {
    hoursInput.closest('div').find('.invalid-feedback').html("Hours required.");
    hoursInput.addClass("is-invalid");
    e.preventDefault();
  }

  if (!descriptionVal) {
    descriptionInput.closest('div').find('.invalid-feedback').html("Description required.");
    descriptionInput.addClass("is-invalid");
    e.preventDefault();
  }
});
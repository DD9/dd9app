const newTimeEntryForm = $('#newTimeEntryForm');
const dateInput = newTimeEntryForm.find('#date');
const companyIdInput = newTimeEntryForm.find('#companyId');
const hoursInput = newTimeEntryForm.find('#hours');
const descriptionInput = newTimeEntryForm.find('#description');

newTimeEntryForm.on('submit', function(e) {
  const dateVal = dateInput.val();
  const companyIdVal = companyIdInput.val();
  const hoursVal= hoursInput.val();
  const descriptionVal = descriptionInput.val();

  if (!dateVal) {
    dateInput.closest('div').find('.invalid-feedback').html("Date required.");
    dateInput.addClass("is-invalid");
    e.preventDefault();
  }

  if (!companyIdVal) {
    companyIdInput.closest('div').find('.invalid-feedback').html("Company required.");
    companyIdInput.addClass("is-invalid");
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
import moment from 'moment';

const closeHourLogModal = $('#closeHourLogModal');
const closeHourLogForm = $('#closeHourLogForm');
const hourLogTitleInput = closeHourLogForm.find('#title');

function closeHourLogValidation() {
  const hourLogInputVal = hourLogTitleInput.val().toLowerCase().trim();

  let hasError = false;

  if (!hourLogInputVal) {
    hasError = true;
    closeHourLogForm.find('.invalid-feedback').html("Hour log title required.");
    hourLogTitleInput.addClass('is-invalid');
  } else {
    hourLogTitleInput.removeClass('is-invalid');
  }

  if (hasError) {
    throw new Error("Form not validated");
  }
}

closeHourLogModal.on('shown.bs.modal', function () {
  $('#closeHourLogForm').find('#title').val(moment.utc(new Date()).format("YYYY-MM-DD"));
});

closeHourLogModal.on('hidden.bs.modal', function () {
  hourLogTitleInput.removeClass('is-invalid');
});

export default closeHourLogValidation
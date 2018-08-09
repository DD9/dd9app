import closeHourLogValidation from '../closeHourLogValidation'

import axios from 'axios';

$('#closeHourLogForm').on('submit', ajaxCloseHourLogForm);
$('#openHourLogForm').on('submit', ajaxOpenHourLogForm);


function ajaxCloseHourLogForm(e) {
  e.preventDefault();
  closeHourLogValidation();
  $('#closeHourLogModal').modal('toggle');
  axios
    .post(this.action, {
      title: this.title.value,
    })
    .then(res => {
      if (!res.data.error) {
        location.reload();
      } else {
        alert(res.data.error);
      }
    })
    .catch(console.error);
}


function ajaxOpenHourLogForm(e) {
  e.preventDefault();
  $('#openHourLogModal').modal('toggle');
  axios
    .post(this.action)
    .then(res => {
      if (res.data.updatedClosedHourLog) {
        location.reload();
      } else {
        window.location.href = `${window.location.origin}/hourLog/${res.data._id}`
      }
    })
    .catch(console.error);
}
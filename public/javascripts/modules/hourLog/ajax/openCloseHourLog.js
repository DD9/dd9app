import axios from 'axios';

$('#closeHourLogForm').on('submit', ajaxCloseHourLogForm);
$('#openHourLogForm').on('submit', ajaxOpenHourLogForm);

function ajaxCloseHourLogForm(e) {
  e.preventDefault();
  axios
    .post(this.action)
    .then(res => {
      $('#openHourLogButton').removeClass('d-none');
      $('#closeHourLogButton').addClass('d-none');
      console.log(res.data);
    })
    .catch(console.error);
}

function ajaxOpenHourLogForm(e) {
  e.preventDefault();
  axios
    .post(this.action)
    .then(res => {
      $('#openHourLogButton').addClass('d-none');
      $('#closeHourLogButton').removeClass('d-none');
      console.log(res.data);
    })
    .catch(console.error);
}
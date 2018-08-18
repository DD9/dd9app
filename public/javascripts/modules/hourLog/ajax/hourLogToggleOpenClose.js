import closeHourLogValidation from '../closeHourLogValidation'
import flash from '../../helpers/flasher';

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
        flash('success', "Hour log successfully closed");
      } else {
        flash('error', res.data.error);
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
    flash('success', "Hour log successfully opened");
    })
    .catch(console.error);
  }
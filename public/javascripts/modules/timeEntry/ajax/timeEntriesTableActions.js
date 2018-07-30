import axios from 'axios';

const createdTimeEntriesTable = $('#createdTimeEntriesTable');

// Approve
createdTimeEntriesTable.find('.approve').click(function(e) {
  e.preventDefault();
  $(this).closest("tr").remove();
  axios
    .get(this.href)
    .then(res => {
      const totalCreatedHours = $('#totalCreatedHours');
      const newTotal = +totalCreatedHours.html() - +res.data.hours;
      totalCreatedHours.html(newTotal);
    })
    .catch(console.error);
});

// Hide
createdTimeEntriesTable.find('.hide').click(function(e) {
  e.preventDefault();
  $(this).closest("tr").remove();
  axios
    .get(this.href)
    .then(res => {
      const totalCreatedHours = $('#totalCreatedHours');
      const newTotal = +totalCreatedHours.html() - +res.data.hours;
      totalCreatedHours.html(newTotal);
    })
    .catch(console.error);
});

// Submit
createdTimeEntriesTable.find('.submit').click(function(e) {
  e.preventDefault();
  $(this).closest("tr").remove();
  axios
    .get(this.href)
    .then(res => {
      const totalCreatedHours = $('#totalCreatedHours');
      const newTotal = +totalCreatedHours.html() - +res.data.hours;
      totalCreatedHours.html(newTotal);
    })
    .catch(console.error);
});

// Delete
createdTimeEntriesTable.find('.delete').click(function(e) {
  e.preventDefault();
  $(this).closest("tr").remove();
  axios
    .get(this.href)
    .then(res => {
      const totalCreatedHours = $('#totalCreatedHours');
      const newTotal = +totalCreatedHours.html() - +res.data.hours;
      totalCreatedHours.html(newTotal);
    })
    .catch(console.error);
});
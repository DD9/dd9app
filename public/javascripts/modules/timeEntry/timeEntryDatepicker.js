import "bootstrap-datepicker"

$('#createTimeEntryForm').find('#date').datepicker({
  format: 'yyyy-mm-dd'
});

$('#editTimeEntryModal').find('#date').datepicker({
  format: 'yyyy-mm-dd'
});
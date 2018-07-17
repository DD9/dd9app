import $ from 'jquery';
import 'datatables.net-bs4';
import 'datatables.net-scroller-bs4';

$('#company_one').dataTable({
  "bFilter": false,
  "bLengthChange": false,
  "bInfo": false,
  scrollY: 700,
  scroller: true,
});
import $ from 'jquery';
import 'datatables.net-bs4';
import 'datatables.net-scroller-bs4';

const companyAllTable = $('#companyAllTable');
const companyNames = [];

companyAllTable.dataTable({
  "dom": "<'row'<'col company-all-table-title'><'col company-all-table-filter'f>>" +
  "<'row'<'col-sm-12 company-all-table'tr>>" +
  "<'row'<'col-sm-12 col-md-5'i><'col-sm-12 col-md-7 company-all-table-paginate'p>>",
  "bFilter": true,
  "bLengthChange": false,
  "bInfo": false,
  "aaSorting": [[1,'asc'], [0,'asc']],
  scrollY: 700,
  scroller: true,
  language: {sSearch: "", searchPlaceholder: "Search..."},
  "columns": [
    {"width": "50%"},
    {"width": "50%"},
  ]
});

$(".company-all-table-title").html(
  '<h3>Companies</h3>' +
  '<button type="button" id="add_company_modal_btn" class="add-company-btn btn btn-primary" data-toggle="modal" data-target="#addCompanyModal">Add Company</button>'
);

companyAllTable.find('.companyName a').each(function() {
  companyNames.push(this.innerHTML);
});

$('#createCompanyForm').on('submit', function(e) {
  let companyName = $('#companyName');

  if(!companyName.val()) {
    $("#createCompanyForm").find(".invalid-feedback").html("Company Name required.");
    companyName.addClass("is-invalid");
    e.preventDefault();
  } else if(companyNames.includes(companyName.val())) {
    $("#createCompanyForm").find(".invalid-feedback").html("Company Name must be unique.");
    companyName.addClass("is-invalid");
    e.preventDefault();
  } else {
    companyName.removeClass("is-invalid");
  }
});
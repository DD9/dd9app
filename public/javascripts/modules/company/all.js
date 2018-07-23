import 'datatables.net-bs4';
import 'datatables.net-scroller-bs4';

// Datatables and table title
const companyAllTable = $('#companyAllTable');
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
  '<button type="button" class="create-company-btn btn btn-primary" data-toggle="modal" data-target="#createCompanyModal">Add Company</button>'
);


// createCompany modal submission validation
const companyNames = [];

companyAllTable.find('.companyName a').each(function() {
  companyNames.push(this.innerHTML.toLowerCase().trim());
});

const createCompanyForm = $('#createCompanyForm');
const companyNameInputField = createCompanyForm.find('#companyName');
createCompanyForm.on('submit', function(e) {
  const companyNameInputValue = companyNameInputField.val().toLowerCase().trim();
  if(!companyNameInputValue) {
    createCompanyForm.find(".invalid-feedback").html("Company Name required.");
    companyNameInputField.addClass("is-invalid");
    e.preventDefault();
  } else if(companyNames.includes(companyNameInputValue)) {
    createCompanyForm.find(".invalid-feedback").html("Company Name must be unique.");
    companyNameInputField.addClass("is-invalid");
    e.preventDefault();
  } else {
    companyNameInputField.removeClass("is-invalid");
  }
});

// Reset createCompany modal on close
$('#createCompanyModal').on('hidden.bs.modal', function() {
  companyNameInputField.val('');
  companyNameInputField.removeClass("is-invalid");
});
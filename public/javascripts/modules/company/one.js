// editModal submission validation
const editCompanyForm = $('#editCompanyForm');
const companyNameInputField = $('#companyName');
editCompanyForm.on('submit', function(e) {
  const companyNameInputValue = companyNameInputField.val().toLowerCase().trim();
  if(!companyNameInputValue) {
    editCompanyForm.find(".invalid-feedback").html("Company Name required.");
    companyNameInputField.addClass("is-invalid");
    e.preventDefault();
  } else {
    companyNameInputField.removeClass("is-invalid");
  }
});

// Reset editModal on close
editCompanyForm.on('hidden.bs.modal', function() {
  companyNameInputField.removeClass("is-invalid");
});

// Pass confirmModal payload for dynamic styles
const confirmEditCompanyModal = $('#confirmEditCompanyModal');
const confirmEditCompanyForm = $('#confirmEditCompanyForm');
const recycledActionAttribute = confirmEditCompanyForm.attr("action");
confirmEditCompanyModal.on('show.bs.modal', function(event) {
  const button = $(event.relatedTarget);
  const action = button.data('payload');
  confirmEditCompanyModal.find('.modal-title').html(`${document.getElementById("confirmEditCompanyModal").getElementsByClassName("modal-title")[0].innerHTML} ${action}`);
  confirmEditCompanyForm.attr("action", confirmEditCompanyForm.attr("action") + action.toLowerCase());

  const confirmEditCompanySubmit = $('.confirm-edit-company-submit');
  confirmEditCompanySubmit.html(action);
  if (action === "Delete") {
    confirmEditCompanySubmit.addClass("btn-danger");
  } else {
    confirmEditCompanySubmit.addClass("btn-warning");
  }
});

// confirmModal submission validation
const confirmInputField = confirmEditCompanyModal.find('#confirm');
confirmEditCompanyForm.on('submit', function(e) {

  if(confirmInputField.val() !==  confirmInputField.attr("placeholder")) {
    confirmEditCompanyForm.find(".invalid-feedback").html("Input does not match company name.");
    confirmInputField.addClass("is-invalid");
    e.preventDefault();
  } else {
    confirmInputField.removeClass("is-invalid");
  }
});

// Reset confirmModal on close
confirmEditCompanyModal.on('hidden.bs.modal', function() {
  confirmInputField.val('');
  confirmInputField.removeClass("is-invalid");
  confirmEditCompanyForm.attr("action", recycledActionAttribute);
});
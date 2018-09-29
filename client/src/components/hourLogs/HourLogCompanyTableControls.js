import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import $ from 'jquery';

import { editCompany } from '../../actions/company';
import underConstruction from '../../static/images/under_construction.png';


class CompanyCreate extends Component {
  componentDidMount() {
    $('#companyEditModal').on('hidden.bs.modal', () => {
      this.props.reset();
    });
  }

  onFormSubmit(formProps) {
    this.props.editCompany(this.props.company._id, formProps);
    $('#companyEditModal').modal('hide');
  }

  renderField(field) {
    return (
      <div className="form-group">
        <label className="col-form-label" htmlFor={field.name}>{field.label}</label>
        <input id="companyNameInput" {...field.input} className={`form-control ${field.meta.touched && field.meta.invalid ? 'is-invalid' : ''}`} type="text" />
        <div className="invalid-feedback">{field.meta.error}</div>
      </div>
    );
  }

  render() {
    const { company, handleSubmit } = this.props;
    return (
      <div className="py-1 px-3 bg-white rounded box-shadow">
        <div className="pt-2">
          <button type="button" className="ml-3 mb-2 btn btn-primary" data-toggle="modal" data-target="#companyEditModal">Edit</button>
          <button type="button" className="ml-3 mb-2 btn btn-secondary" data-toggle="modal" data-target="#companyDeactivateModal">Deactivate</button>
        </div>
        <div>
          <div className="modal fade" id="companyEditModal" tabIndex={-1} role="dialog" aria-labelledby="companyEditModal" aria-hidden="true">
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Edit {company.name}</h5>
                  <button className="close" type="button" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
                </div>
                <div className="modal-body">
                  <form id="companyEditForm" className="form" onSubmit={handleSubmit(this.onFormSubmit.bind(this))}>
                    <Field
                      label="Name"
                      name="name"
                      component={this.renderField}
                    />
                  </form>
                </div>
                <div className="modal-footer">
                  <button className="btn btn-secondary" type="button" data-dismiss="modal">Close</button>
                  <button className="btn btn-primary" type="submit" form="companyEditForm">Submit</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="modal fade" id="companyDeactivateModal" tabIndex={-1} role="dialog" aria-labelledby="companyDeactivateModal" aria-hidden="true">
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Deactivate {company.name}</h5>
                  <button className="close" type="button" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
                </div>
                <div className="modal-body">
                  <div className="modal-body">
                    <img src={underConstruction} alt="Under Construction" />
                  </div>
                </div>
                <div className="modal-footer">
                  <button className="btn btn-secondary" type="button" data-dismiss="modal">Close</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    );
  }
}

function validate(values, props) {
  const errors = {};

  if (!values.name) {
    errors.name = 'Enter a company name.';
  }

  let nameValue = '';
  const companyNames = props.companies.map(company => company.name.toLowerCase().trim());
  if (values.name) {
    nameValue = values.name.toLowerCase().trim();
  }
  if (companyNames.includes(nameValue)) {
    errors.name = 'Company name must be unique.';
  }

  return errors;
}

export default connect(null, { editCompany })(reduxForm({
  form: 'editCompany',
  enableReinitialize: true,
  validate,
})(CompanyCreate));

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import DatePicker from 'react-datepicker';
import moment from 'moment';

import 'react-datepicker/dist/react-datepicker.css';

import { fetchActiveCompanies } from '../../actions/company';
import { createNewTimeEntry } from '../../actions/timeEntry';


class TimeEntryForm extends Component {
  componentDidMount() {
    this.props.fetchActiveCompanies();

    const datePicker = document.getElementsByClassName('react-datepicker__input-container')[0];
    datePicker.childNodes[0].setAttribute('readOnly', true);
  }

  onFormSubmit(formProps) {
    this.props.createNewTimeEntry(formProps);
  }

  renderDateField(field) {
    return (
      <div className="form-group col-md-4">
        <label htmlFor={field.name}>{field.label}</label>
        <DatePicker
          {...field.input}
          className={`form-control custom-form-width ${field.meta.touched && field.meta.invalid ? 'is-invalid' : ''}`}
          dateFormat="YYYY-MM-DD"
          selected={field.input.value ? moment(field.input.value) : moment()}
          value={moment()}
        />
        <div className="invalid-feedback">{field.meta.error}</div>
      </div>
    );
  }

  renderCompanyField(field) {
    return (
      <div className="form-group col-md-4">
        <label htmlFor={field.name}>{field.label}</label>
        <select {...field.input} className={`form-control ${field.meta.touched && field.meta.invalid ? 'is-invalid' : ''}`}>
          {
              field.activeCompanies
                ? field.activeCompanies.map((company) => (<option key={company._id} value={company._id}>{company.name}</option>))
                : ''
            }
        </select>
        <div className="invalid-feedback">{field.meta.error}</div>
      </div>
    );
  }

  renderHoursField(field) {
    return (
      <div className="form-group col-md-4">
        <label htmlFor={field.name}>{field.label}</label>
        <input {...field.input} className={`form-control ${field.meta.touched && field.meta.invalid ? 'is-invalid' : ''}`} type="number" />
        <div className="invalid-feedback">{field.meta.error}</div>
      </div>
    );
  }

  renderDescriptionField(field) {
    return (
      <div className="form-group">
        <label htmlFor={field.name}>{field.label}</label>
        <input {...field.input} className={`form-control ${field.meta.touched && field.meta.invalid ? 'is-invalid' : ''}`} type="text" />
        <div className="invalid-feedback">{field.meta.error}</div>
      </div>
    );
  }

  render() {
    const { handleSubmit } = this.props;
    return (
      <div className="py-1 px-3 bg-white rounded box-shadow time-entry-new-time-entry-card">
        <div className="row">
          <div className="col mt-3 mb-2">
            <h4>Add New Time Entry</h4>
          </div>
        </div>
        <hr />
        <form className="form" onSubmit={handleSubmit(this.onFormSubmit.bind(this))}>
          <div className="form-row">
            <Field
              label="Date"
              name="date"
              component={this.renderDateField}
            />
            <Field
              label="Company"
              name="company"
              activeCompanies={this.props.activeCompanies}
              component={this.renderCompanyField}
            />
            <Field
              label="Hours"
              name="hours"
              component={this.renderHoursField}
            />
          </div>
          <Field
            label="Description"
            name="description"
            component={this.renderDescriptionField}
          />
          <div className="form-group row">
            <div className="col-sm-10">
              <button type="submit" className="btn btn-primary">Save</button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

function validate(values) {
  const errors = {};

  console.log(values);

  if (!values.date) {
    errors.date = 'Enter a date.';
  }
  if (!values.company) {
    errors.company = 'Enter company.';
  }
  if (!values.hours) {
    errors.hours = 'Enter some hours.';
  }
  if (!values.description) {
    errors.description = 'Enter a description.';
  }

  return errors;
}

function mapStateToProps({ companies }) {
  return { activeCompanies: companies };
}

export default connect(mapStateToProps, { fetchActiveCompanies, createNewTimeEntry })(reduxForm({
  form: 'timeEntryNew',
  validate,
})(TimeEntryForm));

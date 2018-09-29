import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import $ from 'jquery';

import { createNewTimeEntry } from '../../actions/timeEntry';

import 'react-datepicker/dist/react-datepicker.css';


class TimeEntryForm extends Component {
  componentDidMount() {
    $('.react-datepicker__input-container')[0].childNodes[0].setAttribute('readOnly', true);
  }

  onFormSubmit(formProps) {
    this.props.createNewTimeEntry(formProps);
    this.props.initialize({
      date: formProps.date,
      company: formProps.company,
      hours: '',
      description: '',
    });
  }

  renderDateField(field) {
    return (
      <div className="form-group col-md-4">
        <label htmlFor={field.name}>{field.label}</label>
        <DatePicker
          {...field.input}
          className={`form-control custom-form-width ${field.meta.touched && field.meta.invalid ? 'is-invalid' : ''}`}
          dateFormat="YYYY-MM-DD"
          selected={field.input.value ? moment(field.input.value) : ''}
        />
        <div className="invalid-feedback">{field.meta.error}</div>
      </div>
    );
  }

  renderCompanySelectField(field) {
    return (
      <div className="form-group col-md-4">
        <label htmlFor={field.name}>{field.label}</label>
        <select {...field.input} className={`form-control ${field.meta.touched && field.meta.invalid ? 'is-invalid' : ''}`}>
          <option value="-1" disabled>{`Select a ${field.label.toLowerCase()}`}</option>
          {
            field.selectOptions
              ? field.selectOptions.map((option) => (<option key={option._id} value={option._id}>{option.name}</option>))
              : ''
          }
        </select>
        <div className="invalid-feedback">{field.meta.error}</div>
      </div>
    );
  }

  renderNumberField(field) {
    return (
      <div className="form-group col-md-4">
        <label htmlFor={field.name}>{field.label}</label>
        <input {...field.input} className={`form-control ${field.meta.touched && field.meta.invalid ? 'is-invalid' : ''}`} type="number" />
        <div className="invalid-feedback">{field.meta.error}</div>
      </div>
    );
  }

  renderTextField(field) {
    return (
      <div className="form-group">
        <label htmlFor={field.name}>{field.label}</label>
        <input {...field.input} className={`form-control ${field.meta.touched && field.meta.invalid ? 'is-invalid' : ''}`} type="text" />
        <div className="invalid-feedback">{field.meta.error}</div>
      </div>
    );
  }

  render() {
    const { handleSubmit, activeCompanies } = this.props;
    return (
      <div className="py-1 px-3 bg-white rounded box-shadow">
        <div className="row">
          <div className="col mt-3 mb-2">
            <h5>Add New Time Entry</h5>
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
              selectOptions={activeCompanies}
              component={this.renderCompanySelectField}
            />
            <Field
              label="Hours"
              name="hours"
              component={this.renderNumberField}
            />
          </div>
          <Field
            label="Description"
            name="description"
            component={this.renderTextField}
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

  if (!values.date) {
    errors.date = 'Enter a date.';
  }
  if (!values.company || values.company === -1) {
    errors.company = 'Select company.';
  }
  if (!values.hours || values.hours <= 0) {
    errors.hours = 'Enter a value greater than 0.';
  }
  if (values.hours > 100) {
    errors.hours = 'Enter a value greater than 100.';
  }
  if (!values.description) {
    errors.description = 'Enter a description.';
  }

  return errors;
}

export default connect(null, { createNewTimeEntry })(reduxForm({
  form: 'createNewTimeEntry',
  validate,
})(TimeEntryForm));

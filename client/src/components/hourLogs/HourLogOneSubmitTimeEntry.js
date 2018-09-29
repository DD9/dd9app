import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { Link } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import moment from 'moment';

import { createAndSubmitTimeEntry } from '../../actions/timeEntry';

import 'react-datepicker/dist/react-datepicker.css';


class HourLogOneSubmitTimeEntry extends Component {
  componentDidMount() {
    const datePicker = document.getElementsByClassName('react-datepicker__input-container')[0];
    datePicker.childNodes[0].setAttribute('readOnly', true);
  }

  onFormSubmit(formProps) {
    formProps.company = this.props.company._id;
    formProps.hourLog = this.props.hourLogId;
    this.props.createAndSubmitTimeEntry(formProps);
    this.props.initialize({
      date: formProps.date,
      company: this.props.company._id,
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
    const { company, handleSubmit } = this.props;
    return (
      <div className="py-1 px-3 bg-white rounded box-shadow">
        <div className="row">
          <div className="col mt-3 mb-2">
            <h5>Submit New Time Entry for <Link to={`/company/${company._id}`}>{company.name}</Link></h5>
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
  if (!values.hours) {
    errors.hours = 'Enter some hours.';
  }
  if (!values.description) {
    errors.description = 'Enter a description.';
  }

  return errors;
}

export default connect(null, { createAndSubmitTimeEntry })(reduxForm({
  form: 'submitTimeEntry',
  validate,
})(HourLogOneSubmitTimeEntry));

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import DatePicker from 'react-datepicker/';
import moment from 'moment';
import $ from 'jquery';

import 'react-datepicker/dist/react-datepicker.css';

import {
  editTimeEntry, adjudicateTimeEntry,
} from '../../actions/timeEntry';

class TimeEntryTableEditFormModal extends Component {
  componentDidMount() {
    const { timeEntry } = this.props;
    $('.react-datepicker-date-field').prop('readOnly', true);
    this.props.initialize({
      date: timeEntry.date.split('T')[0],
      user: timeEntry.user._id,
      company: timeEntry.company._id,
      hours: timeEntry.hours,
      description: timeEntry.description,
    });
  }

  onTimeEntryEditFormSubmit(formProps) {
    const { timeEntry } = this.props;
    $(`#time-entry-edit-modal-${timeEntry._id}`).modal('hide');
    switch (this.props.timeEntry.status) {
      case 'created':
        return this.props.editTimeEntry(timeEntry._id, formProps);
      default:
        return this.props.adjudicateTimeEntry(timeEntry._id, formProps);
    }
  }

  renderDateField(field) {
    return (
      <div className="form-group row">
        <label className="col-sm-2 col-form-label" htmlFor={field.name}>{field.label}</label>
        <div className="col-sm-4">
          <DatePicker
            {...field.input}
            className={`form-control react-datepicker-date-field ${field.meta.touched && field.meta.invalid ? 'is-invalid' : ''}`}
            dateFormat="YYYY-MM-DD"
            selected={field.input.value ? moment(field.input.value) : ''}
          />
        </div>
        <div className="invalid-feedback">{field.meta.error}</div>
      </div>
    );
  }

  renderUserSelectField(field) {
    return (
      <div className="form-group row">
        <label className="col-sm-2 col-form-label" htmlFor={field.name}>{field.label}</label>
        <div className="col-sm-10">
          <select {...field.input} className={`form-control ${field.meta.touched && field.meta.invalid ? 'is-invalid' : ''}`}>
            <option value="-1" disabled>{`Select a ${field.label.toLowerCase()}`}</option>
            {
              field.selectOptions
                ? field.selectOptions.map((option) => (<option key={option._id} value={option._id}>{`${option.name.full}`}</option>))
                : ''
            }
          </select>
        </div>
        <div className="invalid-feedback">{field.meta.error}</div>
      </div>
    );
  }

  renderCompanySelectField(field) {
    return (
      <div className="form-group row">
        <label className="col-sm-2 col-form-label" htmlFor={field.name}>{field.label}</label>
        <div className="col-sm-10">
          <select {...field.input} className={`form-control ${field.meta.touched && field.meta.invalid ? 'is-invalid' : ''}`}>
            <option value="-1" disabled>{`Select a ${field.label.toLowerCase()}`}</option>
            {
              field.selectOptions
                ? field.selectOptions.map((option) => (<option key={option._id} value={option._id}>{option.name}</option>))
                : ''
            }
          </select>
        </div>
        <div className="invalid-feedback">{field.meta.error}</div>
      </div>
    );
  }

  renderNumberField(field) {
    return (
      <div className="form-group row">
        <label className="col-sm-2 col-form-label" htmlFor={field.name}>{field.label}</label>
        <div className="col-sm-10">
          <input {...field.input} className={`form-control ${field.meta.touched && field.meta.invalid ? 'is-invalid' : ''}`} type="number" step="0.25" autoComplete="off" />
          <div className="invalid-feedback">{field.meta.error}</div>
        </div>
      </div>
    );
  }

  renderTextField(field) {
    return (
      <div className="form-group row">
        <label className="col-sm-2 col-form-label" htmlFor={field.name}>{field.label}</label>
        <div className="col-sm-10">
          <input {...field.input} className={`form-control ${field.meta.touched && field.meta.invalid ? 'is-invalid' : ''}`} type="text" autoComplete="off" />
          <div className="invalid-feedback">{field.meta.error}</div>
        </div>
      </div>
    );
  }

  renderFields() {
    const { timeEntry, activeUsers, activeCompanies } = this.props;
    if (timeEntry.status === 'created') {
      return (
        <div>
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
          <Field
            label="Description"
            name="description"
            component={this.renderTextField}
          />
        </div>
      );
    }
    return (
      <div>
        <Field
          label="Date"
          name="date"
          component={this.renderDateField}
        />
        <Field
          label="User"
          name="user"
          selectOptions={activeUsers}
          component={this.renderUserSelectField}
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
        <Field
          label="Description"
          name="description"
          component={this.renderTextField}
        />
      </div>
    );
  }

  render() {
    const { timeEntry, handleSubmit } = this.props;
    return (
      <div>
        <div className="modal fade" id={`time-entry-edit-modal-${timeEntry._id}`} tabIndex={-1} role="dialog" aria-labelledby={`#time-entry-edit-modal-${timeEntry._id}`} aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Time Entry</h5>
                <button className="close" type="button" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
              </div>
              <div className="modal-body">
                <form id={`time-entry-edit-form-${timeEntry._id}`} className="form" onSubmit={handleSubmit(this.onTimeEntryEditFormSubmit.bind(this))}>
                  {this.renderFields()}
                </form>
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" type="button" data-dismiss="modal">Close</button>
                <button className="btn btn-primary time-entry-edit-form-submit" type="submit" form={`time-entry-edit-form-${timeEntry._id}`}>Submit</button>
              </div>
            </div>
          </div>
        </div>
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
  if (!values.hours || values.hours < 0) {
    errors.hours = 'Enter a value greater than or equal to 0.';
  }
  if (values.hours > 100) {
    errors.hours = 'Enter a value less than 100.';
  }
  if (!values.description) {
    errors.description = 'Enter a description.';
  }

  return errors;
}

export default connect(null, {
  editTimeEntry, adjudicateTimeEntry,
})(reduxForm({
  validate,
})(TimeEntryTableEditFormModal));

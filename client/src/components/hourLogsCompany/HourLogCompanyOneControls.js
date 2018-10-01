import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import $ from 'jquery';

import { openHourLog, closeHourLog } from '../../actions/hourLog';

class HourLogCompanyOneControls extends Component {
  componentDidMount() {
    $('#closeHourLogModal').on('hidden.bs.modal', () => {
      this.props.reset();
    });
  }

  onHourLogOpenFormSubmit() {
    this.props.openHourLog(this.props.hourLog._id, this.props.history);
    $('#openHourLogModal').modal('hide');
  }

  onHourLogCloseFormSubmit(formProps) {
    this.props.closeHourLog(this.props.hourLog._id, formProps, this.props.history);
    $('#closeHourLogModal').modal('hide');
  }

  renderHourLogTitle() {
    const { hourLog } = this.props;
    if (hourLog.title) {
      if (hourLog.title === 'Current') {
        return (
          <div>
            <h3 className="d-inline"><span style={{ textDecoration: 'underline' }}>{hourLog.title}</span> Hour Log for </h3>
            <Link className="nav-link d-inline p-0" to={`/company/${hourLog.company._id}`} style={{ fontSize: '24px' }}><i>{hourLog.company.name}</i></Link>
            <button type="button" className="btn btn-primary pull-right" data-toggle="modal" data-target="#closeHourLogModal">Close Hour Log</button>
          </div>
        );
      }
      return (
        <div>
          <h3 className="d-inline"><span style={{ textDecoration: 'underline' }}>{hourLog.title}</span> Hour Log for </h3>
          <Link className="nav-link d-inline p-0" to={`/company/${hourLog.company._id}`} style={{ fontSize: '24px' }}><i>{hourLog.company.name}</i></Link>
          <button type="button" className="btn btn-primary pull-right" data-toggle="modal" data-target="#openHourLogModal">Open Hour Log</button>
        </div>
      );
    }
  }

  renderField(field) {
    return (
      <div className="form-group">
        <label className="col-form-label" htmlFor={field.name}>{field.label}</label>
        <input {...field.input} className={`form-control ${field.meta.touched && field.meta.invalid ? 'is-invalid' : ''}`} type="text" />
        <div className="invalid-feedback">{field.meta.error}</div>
      </div>
    );
  }

  render() {
    const { handleSubmit } = this.props;
    return (
      <div className="py-1 px-3 bg-white rounded box-shadow">
        <div className="py-2">
          {this.renderHourLogTitle()}
        </div>
        <div>
          <div className="modal fade" id="openHourLogModal" tabIndex={-1} role="dialog" aria-labelledby="openHourLogModal" aria-hidden="true">
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Open Hour Log</h5><button className="close" type="button" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
                </div>
                <div className="modal-body">
                  <form id="openHourLogForm" className="form" onSubmit={handleSubmit(this.onHourLogOpenFormSubmit.bind(this))}>
                    <p className="text-center">All time entries will be reassigned to the current hour log.</p>
                    <p className="text-center">A new current hour log will be made for this company if one does not exist.</p>
                  </form>
                </div>
                <div className="modal-footer">
                  <button className="btn btn-secondary" type="button" data-dismiss="modal">Close</button>
                  <button className="btn btn-primary" type="submit" form="openHourLogForm">Submit</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="modal fade" id="closeHourLogModal" tabIndex={-1} role="dialog" aria-labelledby="closeHourLogModal" aria-hidden="true">
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Close Hour Log</h5>
                  <button className="close" type="button" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
                </div>
                <div className="modal-body">
                  <form id="closeHourLogForm" className="form" onSubmit={handleSubmit(this.onHourLogCloseFormSubmit.bind(this))}>
                    <Field
                      label="Title"
                      name="title"
                      component={this.renderField}
                    />
                    <p className="text-center">(Closing an empty hour log will trigger its deletion)</p>
                  </form>
                </div>
                <div className="modal-footer">
                  <button className="btn btn-secondary" type="button" data-dismiss="modal">Close</button>
                  <button className="btn btn-primary" type="submit" form="closeHourLogForm">Submit</button>
                </div>
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

  if (!values.title) {
    errors.title = 'Enter an hour log title.';
  }

  if (values.title === 'Current' || values.title === 'current') {
    errors.title = 'Hour log title cannot be name \'Current\'.';
  }

  return errors;
}

export default withRouter(connect(null, { closeHourLog, openHourLog })(reduxForm({
  form: 'closeHourLog',
  enableReinitialize: true,
  validate,
})(HourLogCompanyOneControls)));

import React from 'react';

const CompanyCreate = () => (
  <div>
    <div>
      <h3 className="d-inline">Companies</h3>
      <button type="button" className="ml-3 mb-2 btn btn-primary" data-toggle="modal" data-target="#CompanyCreateModal">Add Company</button>
    </div>
    <div>
      <div className="modal fade" id="CompanyCreateModal" tabIndex={-1} role="dialog" aria-labelledby="CompanyCreateModal" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">New Company</h5><button className="close" type="button" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button></div>
            <div className="modal-body">
              <form className="form" id="createCompanyForm" action="/company/create" method="POST" noValidate="novalidate">
                <div className="form-group"><label className="col-form-label" htmlFor="name">Name</label><input
                  className="form-control" id="name" name="name" type="text" required="required" maxLength="100"/>
                  <div className="invalid-feedback">Invalid form.</div>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" type="button" data-dismiss="modal">Close</button>
              <button className="btn btn-primary" type="submit" form="createCompanyForm">Submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default CompanyCreate;

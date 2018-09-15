import React from 'react';

const UserCreate = () => (
  <div>
    <div>
      <h3 className="d-inline">Users</h3>
      <button type="button" className="ml-3 mb-2 btn btn-primary" data-toggle="modal" data-target="#UserCreateModal">Add User</button>
    </div>
    <div>
      <div className="modal fade" id="UserCreateModal" tabIndex={-1} role="dialog" aria-labelledby="UserCreateModal" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">New Users</h5><button className="close" type="button" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button></div>
            <div className="modal-body">
              <p className="text-center">Users are managed via GSuite.</p>
              <p className="text-center">Users must have an @dd9.com or @designdivine email to login.</p>
            </div>
            <div className="modal-footer"><button className="btn btn-secondary" type="button" data-dismiss="modal">Close</button></div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default UserCreate;

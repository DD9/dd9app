import React from 'react';

const UserAllControls = () => (
  <div className="py-1 px-3 bg-white rounded box-shadow">
    <div className="pt-2">
      <button type="button" className="ml-3 mb-2 btn btn-primary" data-toggle="modal" data-target="#userCreateModal">Add User</button>
    </div>
    <div>
      <div className="modal fade" id="userCreateModal" tabIndex={-1} role="dialog" aria-labelledby="userCreateModal" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">New User</h5><button className="close" type="button" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
            </div>
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

export default UserAllControls;

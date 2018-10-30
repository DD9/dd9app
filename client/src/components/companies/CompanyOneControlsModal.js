import React from 'react';

const CompanyOneControlsModal = ({
  modalId, modalTitle, formId, modalBody, onSubmit,
}) => (
  <div>
    <div className="modal fade" id={modalId} tabIndex={-1} role="dialog" aria-labelledby={`#${modalId}`} aria-hidden="true">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{modalTitle}</h5><button className="close" type="button" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
          </div>
          <div className="modal-body">
            <form id={formId} className="form" onSubmit={onSubmit}>
              <p className="text-center">{modalBody}</p>
            </form>
          </div>
          <div className="modal-footer">
            <button className="btn btn-secondary" type="button" data-dismiss="modal">Close</button>
            <button className="btn btn-primary" type="submit" form={formId}>Submit</button>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default CompanyOneControlsModal;

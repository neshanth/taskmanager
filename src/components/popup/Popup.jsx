import React from "react";
import "./popup.css";

function Popup(props) {
  return (
    <div className="modal fade" id="deleteModal" tabIndex="-1">
      <div className="modal-dialog">
        <div className="modal-content">
          {props.modalTitle && (
            <div className="modal-header">
              <h5 className="modal-title">Modal title</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
          )}
          <div className="modal-body">{props.children}</div>
          <div className="modal-footer d-flex justify-content-center">
            <button onClick={() => props.failiureCallback()} type="button" className="btn btn-secondary" data-bs-dismiss="modal">
              No
            </button>
            <button onClick={() => props.successCallback()} type="button" className="btn btn-danger" data-bs-dismiss="modal">
              Yes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Popup;

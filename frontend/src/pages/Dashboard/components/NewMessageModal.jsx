import React from "react";
import { dashboardIcons } from "../icons";

export default function NewMessageModal({ form, onFormChange, onClose, onSubmit }) {
  const CloseIcon = dashboardIcons.close;

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <div className="modal-header">
          <h3>New message</h3>
          <button type="button" onClick={onClose} className="close-btn">
            <CloseIcon size={20} />
          </button>
        </div>

        <div className="modal-body">
          <input
            value={form.subject}
            onChange={(event) => onFormChange("subject", event.target.value)}
            placeholder="Subject"
            className="modal-input"
          />
          <textarea
            value={form.body}
            onChange={(event) => onFormChange("body", event.target.value)}
            placeholder="Write your message..."
            rows={6}
            className="modal-input modal-textarea"
          />
        </div>

        <div className="modal-footer">
          <button type="button" onClick={onClose} className="secondary-btn">
            Cancel
          </button>
          <button type="button" onClick={onSubmit} className="primary-btn">
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

import React from "react";
import { dashboardIcons } from "../icons";

export default function CreatePackageModal({
  form,
  onFormChange,
  onFileChange,
  onClose,
  onSubmit,
}) {
  const CloseIcon = dashboardIcons.close;

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <div className="modal-header">
          <h3>Créer un forfait agence</h3>
          <button type="button" onClick={onClose} className="close-btn">
            <CloseIcon size={20} />
          </button>
        </div>

        <div className="modal-body">
          <input
            value={form.title}
            onChange={(event) => onFormChange("title", event.target.value)}
            placeholder="Titre du forfait agence"
            className="modal-input"
          />
          <input
            value={form.place}
            onChange={(event) => onFormChange("place", event.target.value)}
            placeholder="Destination ou ville"
            className="modal-input"
          />
          <input
            value={form.price}
            onChange={(event) => onFormChange("price", event.target.value)}
            placeholder="Prix"
            className="modal-input"
          />

          <div className="upload-box">
            <label>Ajouter une image du forfait</label>
            <input
              type="file"
              accept="image/*"
              onChange={(event) => onFileChange(event.target.files?.[0] || null)}
            />
          </div>
        </div>

        <div className="modal-footer">
          <button type="button" onClick={onClose} className="secondary-btn">
            Annuler
          </button>
          <button type="button" onClick={onSubmit} className="primary-btn">
            Enregistrer le forfait
          </button>
        </div>
      </div>
    </div>
  );
}

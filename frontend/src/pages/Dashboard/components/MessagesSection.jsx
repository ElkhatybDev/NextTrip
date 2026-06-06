import React from "react";
import { dashboardIcons } from "../icons";
import SectionTitle from "./SectionTitle";
import StatusBadge from "./StatusBadge";

export default function MessagesSection({
  messages,
  onCreateMessage,
  onMarkRead,
  onArchive,
}) {
  const ArchiveIcon = dashboardIcons.archive;
  const CheckIcon = dashboardIcons.check;
  const SendIcon = dashboardIcons.send;

  return (
    <section className="dashboard-section">
      <SectionTitle
        title="Messages clients"
        subtitle="Gardez chaque conversation proche du suivi agence"
        action={
          <button type="button" onClick={onCreateMessage} className="primary-btn">
            <SendIcon size={16} />
            Répondre au client
          </button>
        }
      />

      <div className="messages-list">
        {messages.map((item) => (
          <div key={item.id} className="message-card">
            <div className="message-left">
              <div className="message-head">
                <h4>{item.from}</h4>
                {item.unread ? (
                  <StatusBadge tone="blue">Non lu</StatusBadge>
                ) : (
                  <StatusBadge tone="green">Lu</StatusBadge>
                )}
              </div>
              <p className="message-subject">{item.subject}</p>
              <p className="message-preview">{item.preview}</p>
            </div>

            <div className="message-actions">
              <button
                type="button"
                onClick={() => onMarkRead(item.id)}
                className="secondary-btn"
              >
                <CheckIcon size={16} />
                Marquer comme lu
              </button>
              <button
                type="button"
                onClick={() => onArchive(item.id)}
                className="secondary-btn"
              >
                <ArchiveIcon size={16} />
                Archiver
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// src/components/DeletedContacts.jsx
import React, { useState } from "react";

function DeletedContacts({ deletedContacts, onRestore, onClearHistory }) {
  const [isOpen, setIsOpen] = useState(false); // toggle for collapse

  if (!deletedContacts || deletedContacts.length === 0) return null;

  return (
    <div className="mt-6 bg-white dark:bg-white/10 border border-gray-300 dark:border-white/20 rounded-lg p-4">
      {/* Header with toggle */}
      <div
        className="flex justify-between items-center cursor-pointer select-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h3 className="text-lg font-semibold text-red-400">
          🗑️ Deleted Contacts
        </h3>
        <span
          className={`text-gray-300 text-xl transform transition-transform duration-300 ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
        >
          ▼
        </span>
      </div>

      {/* Collapsible content */}
      {isOpen && (
        <div className="mt-3 space-y-3">
          <ul className="space-y-2 max-h-40 overflow-y-auto custom-scrollbar">
            {deletedContacts.map((contact) => (
              <li
                key={contact.id}
                className="flex justify-between items-center text-sm text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/50 rounded-lg p-2"
              >
                <div>
                  <p className="font-semibold text-gray-900 dark:text-gray-100">{contact.name}</p>
                  <p className="text-gray-600 dark:text-gray-400">{contact.phone}</p>
                  <p className="text-gray-500 text-xs">
                    Deleted on: {contact.deletedAt}
                  </p>
                </div>

                {/*  Restore button */}
                <button
                  onClick={() => onRestore(contact.id)}
                  className="bg-blue-500 hover:bg-blue-600 text-white text-xs font-semibold py-1 px-2 rounded transition"
                >
                  Restore
                </button>
              </li>
            ))}
          </ul>

          {/*  Clear all history button */}
          <button
            onClick={onClearHistory}
            className="w-full bg-red-500 hover:bg-red-600 text-white text-sm font-semibold py-2 rounded-lg transition"
          >
            🧹 Delete All History
          </button>
        </div>
      )}
    </div>
  );
}

export default DeletedContacts;

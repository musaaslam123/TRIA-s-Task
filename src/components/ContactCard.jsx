import React, { useState } from "react";

function ContactCard({ contact, onDelete, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false);
  const [edited, setEdited] = useState({
    name: contact.name,
    email: contact.email,
    phone: contact.phone,
  });

  const handleChange = (e) => {
    setEdited({ ...edited, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    onUpdate(contact.id, edited);
    setIsEditing(false);
  };

  return (
    <div
      className="bg-white dark:bg-white/10 border border-gray-300 dark:border-white/20
      backdrop-blur-sm p-4 rounded-xl shadow-md flex items-center justify-between
      hover:bg-gray-100 dark:hover:bg-white/20 transition"
    >
      {!isEditing ? (
        <div className="flex items-center justify-between w-full">
          {/* LEFT SIDE: Avatar + Info */}
          <div className="flex items-center gap-4">
            {/* Avatar */}
            <div className="w-12 h-12 bg-blue-500 text-white flex items-center justify-center rounded-full text-lg font-semibold shadow-sm">
              {contact.name ? contact.name.charAt(0).toUpperCase() : "👤"}
            </div>

            {/* Contact Info */}
            <div>
              <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
                {contact.name}
              </h2>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                {contact.phone}
              </p>
              <p className="text-gray-500 dark:text-gray-400 text-xs">
                {contact.email}
              </p>
            </div>
          </div>

          {/* RIGHT SIDE: ACTION BUTTONS */}
          <div className="flex gap-3">
            <button
              onClick={() => setIsEditing(true)}
              className="text-yellow-500 hover:text-yellow-600 text-xl"
              title="Edit Contact"
            >
              ✏️
            </button>
            <button
              onClick={() => onDelete(contact.id)}
              className="text-red-500 hover:text-red-600 text-xl"
              title="Delete Contact"
            >
              ❌
            </button>
          </div>
        </div>
      ) : (
        // EDIT MODE
        <div className="w-full">
          <input
            type="text"
            name="name"
            value={edited.name}
            onChange={handleChange}
            placeholder="Name"
            className="w-full mb-2 p-2 rounded-lg border border-gray-300 text-gray-900 dark:text-white dark:bg-gray-800 focus:outline-none"
          />
          <input
            type="text"
            name="phone"
            value={edited.phone}
            onChange={handleChange}
            placeholder="Phone"
            className="w-full mb-2 p-2 rounded-lg border border-gray-300 text-gray-900 dark:text-white dark:bg-gray-800 focus:outline-none"
          />
          <input
            type="email"
            name="email"
            value={edited.email}
            onChange={handleChange}
            placeholder="Email"
            className="w-full mb-3 p-2 rounded-lg border border-gray-300 text-gray-900 dark:text-white dark:bg-gray-800 focus:outline-none"
          />

          <div className="flex justify-end gap-2">
            <button
              onClick={() => setIsEditing(false)}
              className="bg-gray-400 dark:bg-gray-600 text-white px-3 py-1 rounded-lg hover:bg-gray-500 dark:hover:bg-gray-700 transition"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600 transition"
            >
              Save
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ContactCard;

import ContactCard from "./ContactCard";

export default function ContactList({ contacts, onDelete, onUpdate }) {
  if (contacts.length === 0) {
    return <p className="text-center text-gray-500">No contacts found.</p>;
  }

  return (
    //  relative and overflow-visible allow dropdowns to render outside
    <div className="relative grid gap-4 overflow-visible z-10 ">
      {contacts.map((contact) => (
        <ContactCard
          key={contact.id}
          contact={contact}
          onDelete={onDelete}
          onUpdate={onUpdate}
        />
      ))}
    </div>
  );
}

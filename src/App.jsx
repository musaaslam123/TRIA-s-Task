import { useState, useEffect } from "react";
import AddContactForm from "./components/AddContactForm";
import ContactList from "./components/ContactList";
import SearchBar from "./components/SearchBar";
import contactsData from "./data/contacts.js";
import DeletedContacts from "./components/DeletedContacts.jsx";

function App() {

  const [isDarkMode, setIsDarkMode] = useState(true);



  // const [contacts, setContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showForm, setShowForm] = useState(false);

  const [deletedContacts, setDeletedContacts] = useState(() => {
  const storedDeleted = localStorage.getItem("deletedContacts");
  return storedDeleted ? JSON.parse(storedDeleted) : [];
});



  const [contacts, setContacts] = useState(() => {
  const storedContacts = localStorage.getItem("contacts");
  return storedContacts ? JSON.parse(storedContacts) : contactsData;
  });

 

  //  Save contacts to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("contacts", JSON.stringify(contacts));
  }, [contacts]);

  //  Filter contacts
  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Save deleted contacts
useEffect(() => {
  localStorage.setItem("deletedContacts", JSON.stringify(deletedContacts));
}, [deletedContacts]);


  //  Add new contact
  const addContact = (newContact) => {
    setContacts((prev) => [...prev, { id: Date.now(), ...newContact }]);
    setShowForm(false);
  };

  //  Delete contact
  const deleteContact = (id) => {
    const contactToDelete = contacts.find((c) => c.id === id);

    if (contactToDelete && confirm("Are you sure you want to delete this contact?")) {
      setContacts((prev) => prev.filter((contact) => contact.id !== id));

      setDeletedContacts((prev) => [
      { ...contactToDelete, deletedAt: new Date().toLocaleString() },
        ...prev,
      ]);
    }
  };

  //  Update contact
  const updateContact = (id, updatedData) => {
    setContacts((prev) =>
      prev.map((c) => (c.id === id ? { ...c, ...updatedData } : c))
    );
  };

  const clearAllContacts = () => {
  if (confirm("Are you sure you want to delete ALL contacts?")) {
    setContacts([]);
    localStorage.removeItem("contacts");
  }
};

const resetToSampleContacts = () => {
  if (confirm("Reset to default sample contacts?")) {
    setContacts(contactsData);
    localStorage.setItem("contacts", JSON.stringify(contactsData));
  }
};

// ♻️ Restore deleted contact
const restoreContact = (id) => {
  const contactToRestore = deletedContacts.find((c) => c.id === id);
  if (contactToRestore) {
    // Add it back to contacts
    setContacts((prev) => [...prev, contactToRestore]);

    // Remove from deleted list
    setDeletedContacts((prev) => prev.filter((c) => c.id !== id));
  }
};

// 🧹 Clear all deleted contacts history
const clearDeletedHistory = () => {
  if (confirm("Are you sure you want to permanently delete all deleted contacts?")) {
    setDeletedContacts([]);
    localStorage.removeItem("deletedContacts");
  }
};


useEffect(() => {
  const savedMode = localStorage.getItem("theme");
  if (savedMode === "light") setIsDarkMode(false);
}, []);

useEffect(() => {
  localStorage.setItem("theme", isDarkMode ? "dark" : "light");
}, [isDarkMode]);






  return (

    <div className={isDarkMode ? "dark" : ""}>


    <div className="h-screen bg-gray-50 dark:bg-gray-800 text-black dark:text-white flex flex-col transition-colors duration-500">
      <div className="flex-1 flex flex-col max-w-6xl mx-auto w-full px-6 py-8 overflow-hidden">
      
        <h1 className="text-3xl font-bold text-center mb-8 text-blue-400">
          📇 TRIA'S Contact List
          </h1>
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="absolute top-6 right-6 bg-gray-300 dark:bg-gray-800 text-gray-800 dark:text-gray-100 rounded-full p-2 hover:scale-105 transition-transform"
            title="Toggle theme"
          >
            {isDarkMode ? "🌞" : "🌙"}
          </button>
        
        

        {/* Two-column layout */}
        <div className="flex flex-col md:flex-row flex-1 gap-12 overflow-hidden">
          {/* LEFT SIDE: Search + Contact List */}
          <div className="flex flex-col flex-1 min-h-0">
            <div className="mb-4">
              <SearchBar
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
              />
            </div>

            {/* Scrollable Contact List */}
            <div className="flex-1 overflow-y-auto custom-scrollbar">
              <ContactList
                contacts={filteredContacts}
                onDelete={deleteContact}
                onUpdate={updateContact}
              />
            </div>

            <div className="mt-4 flex flex-row justify-center md:justify-start gap-4">
            <button
              onClick={clearAllContacts}
              className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg transition w-full"
            >
              🧹 Clear All Contacts
            </button>


            <button
              onClick={resetToSampleContacts}
              className="bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded-lg transition w-full"
            >
              🔄 Reset Sample Contacts
            </button>

            </div>
      


          </div>

          {/* RIGHT SIDE: Add Contact Form */}
          <div className="w-full md:w-[480px] lg:w-[520px] overflow-y-auto custom-scrollbar">
            <AddContactForm onAdd={addContact} />
            <DeletedContacts deletedContacts={deletedContacts} onRestore={restoreContact} onClearHistory={clearDeletedHistory} />
          </div>


        </div>
      </div>
    </div>


    </div>
  );
}

export default App;

import { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { IoMdAdd } from "react-icons/io";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "./assets/config/firebase";
import Navbar from "./components/Navbar";
import ContactCard from "./components/ContactCard";
import AddAndUpdateContact from "./components/AddAndUpdateContact";
import reuseCode from "./hooks/reuseCode";
import useSearch from "./hooks/useSearch";
import NotFound from "./components/NotFound";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const [contacts, setContacts] = useState([]);
  const { isOpen, onClose, onOpen } = reuseCode();
  const { searchTerm, setSearchTerm, isSearching, filteredContacts } = useSearch(contacts);
  const [focusedContactIndex, setFocusedContactIndex] = useState(-1);

  useEffect(() => {
    const getContacts = async () => {
      try {
        const contactsRef = collection(db, "contacts");
        onSnapshot(contactsRef, (snapshot) => {
          const contactLists = snapshot.docs.map((doc) => {
            return {
              id: doc.id,
              ...doc.data(),
            };
          });
          setContacts(contactLists);
          return contactLists;
        });
      } catch (error) {
        console.error(error);
      }
    };

    getContacts();
  }, []);

  useEffect(() => {
    setFocusedContactIndex(-1);
  }, [filteredContacts]);

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setFocusedContactIndex(prev => 
        prev < filteredContacts.length - 1 ? prev + 1 : prev
      );
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setFocusedContactIndex(prev => prev > 0 ? prev - 1 : prev);
    } else if (e.key === 'Escape') {
      setSearchTerm('');
      setFocusedContactIndex(-1);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black/30 to-black/50">
      <div className="main-container">
        <div className="px-6 py-8">
          <Navbar contacts={contacts} />
          
          <div className="flex flex-col md:flex-row items-center gap-6 mt-12">
            {/* Search Bar */}
            <div className="relative flex-1 w-full">
              <label htmlFor="search" className="sr-only">Search Contacts</label>
              <FiSearch className={`absolute top-1/2 left-4 -translate-y-1/2 text-xl transition-colors duration-300 ${
                isSearching ? 'text-blue-400 animate-pulse' : 'text-white/50'
              }`} />
              <input
                id="search"
                type="text"
                role="searchbox"
                aria-label="Search contacts"
                value={searchTerm}
                placeholder="Search Contacts..."
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={handleKeyDown}
                className="search-input w-full"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute top-1/2 right-4 -translate-y-1/2 text-white/50 hover:text-white transition-colors duration-300"
                  aria-label="Clear search"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Add Contact Button */}
            <button
              onClick={onOpen}
              className="btn-primary flex items-center gap-2 w-full md:w-auto justify-center"
            >
              <IoMdAdd className="text-2xl" />
              <span>Add Contact</span>
            </button>
          </div>

          <div 
            role="grid" 
            aria-label="Contacts list"
            className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {isSearching ? (
              Array.from({ length: 3 }).map((_, index) => (
                <div
                  key={index}
                  className="skeleton glass-card h-[200px]"
                  role="presentation"
                  aria-hidden="true"
                />
              ))
            ) : filteredContacts.length > 0 ? (
              filteredContacts.map((contact, index) => (
                <div
                  key={contact.id}
                  tabIndex={focusedContactIndex === index ? 0 : -1}
                  className={`outline-none transform transition-transform duration-300 ${
                    focusedContactIndex === index ? 'ring-2 ring-blue-400 scale-[1.02]' : ''
                  }`}
                >
                  <ContactCard contact={contact} />
                </div>
              ))
            ) : (
              <div className="col-span-full">
                <NotFound searchTerm={searchTerm} />
              </div>
            )}
          </div>
        </div>
      </div>

      <AddAndUpdateContact onClose={onClose} isOpen={isOpen} />
      <ToastContainer
        position="bottom-right"
        theme="colored"
        autoClose={3000}
        toastClassName="!glass-card !text-white !shadow-xl"
        bodyClassName="!text-white"
        progressClassName="!bg-blue-500"
      />
    </div>
  );
};

export default App;

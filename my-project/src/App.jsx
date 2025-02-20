import { useEffect, useState } from 'react';
import './App.css';
import Navber from './components/Navber';
import { IoSearch } from "react-icons/io5";
import { IoIosAddCircle } from "react-icons/io";
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from './assets/config/firebase';
import ContactCard from './components/ContactCard';
import AddAndUpdateContact from './components/AddAndUpdateContact';
import reuseCode from './hooks/reuseCode';
import { ToastContainer } from 'react-toastify';
import NotFound from './components/NotFound';

function App() {
  const [contacts, setContacts] = useState([]);
  const [allContacts, setAllContacts] = useState([]); // Store all contacts
  const { isOpen, onClose, onOpen } = reuseCode();

  useEffect(() => {
    const contactsRef = collection(db, "contacts");

    const unsubscribe = onSnapshot(contactsRef, (snapshot) => {
      const contactsList = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      setContacts(contactsList);
      setAllContacts(contactsList); // Store all contacts for filtering
    });

    return () => unsubscribe(); // Clean up listener
  }, []);

  const filterContacts = (e) => {
    const value = e.target.value.toLowerCase();

    if (!value) {
      setContacts(allContacts); // Reset if input is empty
      return;
    }

    const filteredContacts = allContacts.filter(contact =>
      contact.name.toLowerCase().includes(value)
    );

    setContacts(filteredContacts);
  };

  return (
    <>
      <div className='ml-150 mt-4  max-w-[500px]  px-4 py-4  rounded-b-lg'>
        <Navber contacts={contacts} />
        <div className="flex">
          <div className="flex flex-grow relative items-center">
            <IoSearch className="text-3xl text-blue-950 absolute ml-1" />
            <input 
              onChange={filterContacts} 
              type="text" 
              className="bg-transparent border border-2 border-blue-950  rounded-b-md flex-grow h-10 px-4 text-blue-950  pl-8" 
              placeholder="Search contacts..."
            />
          </div>
          <IoIosAddCircle onClick={onOpen} className="text-5xl text-blue-950  cursor-pointer pl-2" />
        </div>

        <div className='mt-3 flex  items-center justify-center'>
        {contacts.length <= 0 ? (
            <NotFound />
          ) : (
            contacts.map((contact) => (
              <ContactCard key={contact.id} contact={contact} />
            ))
          )}

        </div>
      </div>

      <AddAndUpdateContact onClose={onClose} isOpen={isOpen} />
      <ToastContainer />
    </>
  );
}

export default App;

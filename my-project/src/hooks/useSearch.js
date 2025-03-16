import { useState, useEffect } from 'react';

const useSearch = (contacts, delay = 300) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [filteredContacts, setFilteredContacts] = useState(contacts);

  useEffect(() => {
    if (!contacts) return;

    setIsSearching(true);
    const timer = setTimeout(() => {
      const filtered = contacts.filter((contact) =>
        contact.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredContacts(filtered);
      setIsSearching(false);
    }, delay);

    return () => clearTimeout(timer);
  }, [searchTerm, contacts, delay]);

  return {
    searchTerm,
    setSearchTerm,
    isSearching,
    filteredContacts
  };
};

export default useSearch;

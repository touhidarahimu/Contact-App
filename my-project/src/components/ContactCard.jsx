import { FaUserCircle } from "react-icons/fa";
import { FaTrash, FaUserEdit } from "react-icons/fa";
import { deleteDoc, doc } from "firebase/firestore"; 
import { db } from "../assets/config/firebase"; 
import { useState } from "react";
import AddAndUpdateContact from "./AddAndUpdateContact";
import reuseCode from "../hooks/reuseCode";
import { toast } from "react-toastify";

const ContactCard = ({ contact }) => { 
  const {isOpen,onClose,onOpen} =reuseCode();
  

  const deleteContact = async (id) => {  
    try {
      await deleteDoc(doc(db, "contacts", id)); 
      toast.success("Contact Deleted Successfully");
      console.log("Contact deleted successfully!");
    } catch (error) {
      console.error("Error deleting contact:", error);
    }
  };


  return (
    <>
     <div className="flex flex-wrap gap-4">
  <div className="p-4 border text-white border-amber-50 rounded-md flex items-center justify-between w-[350px] h-[80px] gap-5 mt-2 bg-blue-950">
    {/* Profile Icon */}
    <FaUserCircle className="text-5xl text-white" />

    {/* Contact Details */}
    <div className="flex-1">
      <h1 className="text-lg font-semibold">{contact.name}</h1> 
      <p className="text-sm text-gray-300">{contact.email}</p>
      <h1 className="text-sm text-gray-300">{contact.phone}</h1> 
    </div>

    {/* Action Icons */}
    <div className="flex gap-3 text-2xl">
      <FaUserEdit 
        onClick={onOpen}  
        className="cursor-pointer hover:text-blue-400 transition duration-200" 
      />
      <FaTrash 
        onClick={() => deleteContact(contact.id)} 
        className="cursor-pointer hover:text-red-400 transition duration-200" 
      />
    </div>

    {/* Modal for Adding/Updating Contact */}
    <AddAndUpdateContact 
      contact={contact} 
      isUpdate 
      isOpen={isOpen} 
      onClose={onClose} 
    />
  </div>
</div>

    </>
   
  );
};

export default ContactCard;

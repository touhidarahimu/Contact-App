import { HiOutlineUserCircle } from "react-icons/hi";
import { IoMdTrash } from "react-icons/io";
import { RiEditCircleLine } from "react-icons/ri";
import { FaPhoneAlt, FaEnvelope } from "react-icons/fa";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../assets/config/firebase";
import { toast } from "react-toastify";
import reuseCode from "../hooks/reuseCode";
import Modal from "./Modal";
import PropTypes from "prop-types";

const ContactCard = ({ contact }) => {
  const { isOpen, onClose, onOpen } = reuseCode();

  const deleteContact = async (id) => {
    try {
      await deleteDoc(doc(db, "contacts", id));
      toast.success("Contact deleted successfully");
      onClose();
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <>
      <div className="glass-card p-6 card-enter">
        {/* Contact Header */}
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 p-3 rounded-full bg-gradient-to-br from-orange-400/20 to-orange-500/20">
            <HiOutlineUserCircle className="text-5xl text-orange-400" />
          </div>
          
          <div className="flex-grow">
            <h2 className="text-2xl font-semibold text-white mb-4">
              {contact.name}
            </h2>
            
            {/* Contact Details */}
            <div className="space-y-3">
              <a 
                href={`tel:${contact.phone}`}
                className="flex items-center gap-3 text-white/80 hover:text-white transition-colors duration-300 group"
                aria-label={`Call ${contact.name} at ${contact.phone}`}
              >
                <span className="p-2 rounded-lg bg-emerald-400/20 group-hover:bg-emerald-400/30 transition-colors duration-300">
                  <FaPhoneAlt className="text-lg text-emerald-400" />
                </span>
                <span>{contact.phone}</span>
              </a>
              
              <a 
                href={`mailto:${contact.email}`}
                className="flex items-center gap-3 text-white/80 hover:text-white transition-colors duration-300 group"
                aria-label={`Email ${contact.name} at ${contact.email}`}
              >
                <span className="p-2 rounded-lg bg-purple-400/20 group-hover:bg-purple-400/30 transition-colors duration-300">
                  <FaEnvelope className="text-lg text-purple-400" />
                </span>
                <span>{contact.email}</span>
              </a>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-3">
            <button
              onClick={() => {}}
              className="p-2.5 rounded-xl bg-emerald-400/20 hover:bg-emerald-400/30 text-emerald-400 transition-all duration-300 hover:scale-110"
              aria-label={`Edit ${contact.name}&apos;s contact`}
            >
              <RiEditCircleLine className="text-xl" />
            </button>
            
            <button
              onClick={onOpen}
              className="p-2.5 rounded-xl bg-red-400/20 hover:bg-red-400/30 text-red-400 transition-all duration-300 hover:scale-110"
              aria-label={`Delete ${contact.name}&apos;s contact`}
            >
              <IoMdTrash className="text-xl" />
            </button>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <div className="text-center space-y-6">
          <h2 className="text-2xl font-semibold text-white">Delete Contact</h2>
          <p className="text-white/80">
            Are you sure you want to delete {contact.name}&apos;s contact?
          </p>
          <div className="flex justify-center gap-4">
            <button
              onClick={() => deleteContact(contact.id)}
              className="px-6 py-2.5 rounded-xl bg-red-500 hover:bg-red-600 text-white font-medium transition-all duration-300 hover:scale-105"
            >
              Yes, Delete
            </button>
            <button
              onClick={onClose}
              className="px-6 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-medium transition-all duration-300 hover:scale-105"
            >
              Cancel
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

ContactCard.propTypes = {
  contact: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
  }).isRequired,
};

export default ContactCard;

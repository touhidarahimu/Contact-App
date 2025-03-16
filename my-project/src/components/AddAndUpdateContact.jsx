import Modal from './Modal';
import { Formik, Field, Form, ErrorMessage } from "formik";
import { addDoc, collection, doc, updateDoc } from 'firebase/firestore';
import { db } from '../assets/config/firebase';
import { toast } from 'react-toastify';
import * as Yup from "yup";
import PropTypes from 'prop-types';
import { useState } from 'react';
import { FaSpinner } from 'react-icons/fa';

const contactValidation = Yup.object().shape({
  name: Yup.string().required("Name is Required"), 
  email: Yup.string().email("Invalid Email").required("Email is Required"), 
  phone: Yup.string().required("Phone Number is Required"), 
});

const AddAndUpdateContact = ({ isOpen, onClose, isUpdate, contact }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const addContact = async (contact) => {
    setIsSubmitting(true);
    try {
      const contactRef = collection(db, "contacts");
      await addDoc(contactRef, contact);
      toast.success("Contact Added Successfully");
      onClose();
    } catch (error) {
      console.error("Error adding contact:", error);
      toast.error("Failed to add contact");
    } finally {
      setIsSubmitting(false);
    }
  };

  const updateContact = async (contact, id) => {
    setIsSubmitting(true);
    try {
      const contactRef = doc(db, "contacts", id);
      await updateDoc(contactRef, contact);
      toast.success("Contact Updated Successfully");
      onClose();
    } catch (error) {
      console.error("Error updating contact:", error);
      toast.error("Failed to update contact");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2 className="text-2xl font-bold text-white mb-6 text-center">
        {isUpdate ? "Update Contact" : "Add New Contact"}
      </h2>
      <Formik
        validationSchema={contactValidation}
        initialValues={
          isUpdate
            ? { name: contact.name, email: contact.email, phone: contact.phone }
            : { name: "", email: "", phone: "" }
        }
        onSubmit={async (values) => {
          isUpdate ? updateContact(values, contact.id) : addContact(values);
        }}
      >
        <Form className="space-y-6">
          {/* Name Field */}
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium text-white/80">
              Name
            </label>
            <Field
              name="name"
              placeholder="Enter your Name"
              className="w-full px-4 py-2.5 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400 transition-all duration-300 disabled:opacity-50"
              disabled={isSubmitting}
            />
            <div className="text-sm font-medium text-red-400/90">
              <ErrorMessage name="name" />
            </div>
          </div>

          {/* Email Field */}
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium text-white/80">
              Email
            </label>
            <Field
              name="email"
              type="email"
              placeholder="Enter your Email"
              className="w-full px-4 py-2.5 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400 transition-all duration-300 disabled:opacity-50"
              disabled={isSubmitting}
            />
            <div className="text-sm font-medium text-red-400/90">
              <ErrorMessage name="email" />
            </div>
          </div>

          {/* Phone Field */}
          <div className="space-y-2">
            <label htmlFor="phone" className="text-sm font-medium text-white/80">
              Phone
            </label>
            <Field
              name="phone"
              type="tel"
              placeholder="Enter your Phone"
              className="w-full px-4 py-2.5 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400 transition-all duration-300 disabled:opacity-50"
              disabled={isSubmitting}
            />
            <div className="text-sm font-medium text-red-400/90">
              <ErrorMessage name="phone" />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-medium rounded-xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-transparent disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <FaSpinner className="animate-spin text-xl" />
                <span>{isUpdate ? "Updating..." : "Adding..."}</span>
              </>
            ) : (
              <span>{isUpdate ? "Update" : "Add"} Contact</span>
            )}
          </button>
        </Form>
      </Formik>
    </Modal>
  );
};

AddAndUpdateContact.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  isUpdate: PropTypes.bool,
  contact: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    email: PropTypes.string,
    phone: PropTypes.string,
  }),
};

AddAndUpdateContact.defaultProps = {
  isUpdate: false,
  contact: null,
};

export default AddAndUpdateContact;

import Modal from './Modal';
import { Formik, Field, Form, ErrorMessage } from "formik";
import { addDoc, collection, doc, updateDoc } from 'firebase/firestore';
import { db } from '../assets/config/firebase';
import { toast } from 'react-toastify';
import * as Yup from "yup";

// ✅ Fix: Correct Validation Schema
const contactValidation = Yup.object().shape({
  name: Yup.string().required("Name is Required"), 
  email: Yup.string().email("Invalid Email").required("Email is Required"), 
  phone: Yup.string().required("Phone Number is Required"), 
});

const AddAndUpdateContact = ({ isOpen, onClose, isUpdate, contact }) => {

  // ✅ Fix: Correct Firestore add function
  const addContact = async (contact) => {
    try {
      const contactRef = collection(db, "contacts");
      await addDoc(contactRef, contact);
      toast.success("Contact Added Successfully");
      onClose();
    } catch (error) {
      console.error("Error adding contact:", error);
      toast.error("Failed to add contact");
    }
  };

  // ✅ Fix: Ensure Firestore updates correctly
  const updateContact = async (contact, id) => {
    try {
      const contactRef = doc(db, "contacts", id);
      await updateDoc(contactRef, contact);
      toast.success("Contact Updated Successfully");
      onClose();
    } catch (error) {
      console.error("Error updating contact:", error);
      toast.error("Failed to update contact");
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Formik
        validationSchema={contactValidation}
        initialValues={
          isUpdate
            ? { name: contact.name, email: contact.email, phone: contact.phone }
            : { name: "", email: "", phone: "" }
        }
        onSubmit={async (values) => {
          console.log(values);
          isUpdate ? updateContact(values, contact.id) : addContact(values);
        }}
      >
        <Form className="flex flex-col gap-4">
          
          {/* Name Field */}
          <div className="flex flex-col gap-1">
            <label htmlFor="name">Name</label>
            <Field
              name="name"
              placeholder="Enter your Name"
              className="px-2 border-2 h-10 rounded-b-lg bg-white"
            />
            <div className="text-bold text-red-500">
              <ErrorMessage name="name" />
            </div>
          </div>

          {/* Email Field */}
          <div className="flex flex-col gap-1">
            <label htmlFor="email">Email</label>
            <Field
              name="email"
              type="email"
              placeholder="Enter your Email"
              className="border-2 px-2 h-10 rounded-b-lg bg-white"
            />
            <div className="text-bold text-red-500">
              <ErrorMessage name="email" />
            </div>
          </div>

          {/* Phone Field */}
          <div className="flex flex-col gap-1">
            <label htmlFor="phone">Phone</label>
            <Field
              name="phone"
              type="tel"
              placeholder="Enter your Phone"
              className="border-2 px-2 h-10 rounded-b-lg bg-white"
            />
            <div className="text-bold text-red-500">
              <ErrorMessage name="phone" />
            </div>
          </div>

          {/* Submit Button */}
          <button type="submit" className="cursor-pointer border px-2 py-2 mt-2 bg-blue-950 text-white self-end">
            {isUpdate ? "Update" : "Add"} Contact
          </button>

        </Form>
      </Formik>
    </Modal>
  );
};

export default AddAndUpdateContact;

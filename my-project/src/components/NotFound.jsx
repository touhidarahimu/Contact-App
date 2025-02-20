import { IoIosContacts } from "react-icons/io";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center">
              <IoIosContacts className="text-white text-5xl" />
              <p className="text-white font-semibold text-2xl mt-2">No Contacts found</p>
            </div>
  )
}

export default NotFound
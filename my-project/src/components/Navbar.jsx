import { IoIosContacts } from "react-icons/io";
import { SiFirebase } from "react-icons/si";
import PropTypes from "prop-types";

const Navbar = ({ contacts }) => {
  return (
    <nav className="flex flex-col md:flex-row items-center gap-6 md:justify-between">
      {/* Logo and Title */}
      <div className="flex items-center gap-4">
        <div className="p-3 rounded-xl bg-gradient-to-br from-orange-400/20 to-orange-500/20">
          <IoIosContacts className="text-4xl text-orange-400" />
        </div>
        <h1 className="text-3xl font-bold text-white">
          Contact App
        </h1>
      </div>

      {/* Firebase Badge and Contact Count */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 px-4 py-2 glass-card">
          <div className="flex items-center gap-2">
            <SiFirebase className="text-2xl text-orange-400 firebase-badge" />
            <span className="text-white/80">Firebase</span>
          </div>
          <div className="w-[2px] h-6 bg-white/10" />
          <div className="flex items-center gap-2">
            <span className="text-white/80">Total Contacts:</span>
            <span className="px-2 py-1 rounded-lg bg-orange-400/20 text-orange-400 font-medium">
              {contacts.length}
            </span>
          </div>
        </div>
      </div>
    </nav>
  );
};

Navbar.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      phone: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default Navbar;
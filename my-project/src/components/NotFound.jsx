import { FaUserAltSlash } from "react-icons/fa";
import PropTypes from 'prop-types';

const NotFound = ({ searchTerm }) => {
  const message = searchTerm
    ? `No contacts found matching "${searchTerm}"`
    : "No contacts found in your list";

  const subMessage = searchTerm
    ? "Try a different search term or clear the search"
    : "Add your first contact using the button above";

  return (
    <div className="flex flex-col items-center justify-center gap-4 p-8 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10">
      <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-4 rounded-2xl shadow-lg">
        <FaUserAltSlash className="text-5xl text-white" />
      </div>
      <h3 className="text-xl font-bold text-white text-center">
        {message}
      </h3>
      <p className="text-blue-200 text-center">
        {subMessage}
      </p>
    </div>
  );
};

NotFound.propTypes = {
  searchTerm: PropTypes.string,
};

NotFound.defaultProps = {
  searchTerm: '',
};

export default NotFound;
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';


const Notification = () => {
    return (
      <button className="notification-button">
        <FontAwesomeIcon icon={faBell} />
      </button>
    );
  };
  
  export default Notification;
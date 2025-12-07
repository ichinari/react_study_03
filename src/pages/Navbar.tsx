import { Link } from 'react-router-dom';
import { routeConfig } from '@routes/routeConfig';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHouse,
  faFilePen,
  faArrowRightToBracket,
} from '@fortawesome/free-solid-svg-icons';

function Navbar() {
  return (
    <nav className="flex justify-end items-center h-24 bg-blue-300 gap-3 pr-3">
      <Link
        className="text-amber-50 hover:text-blue-800"
        to={routeConfig.home.path}
      >
        <FontAwesomeIcon icon={faHouse} />
        Home
      </Link>
      <Link
        className="text-amber-50 hover:text-blue-800"
        to={routeConfig.list.path}
      >
        <FontAwesomeIcon icon={faFilePen} />
        list
      </Link>
      <Link
        className="text-amber-50 hover:text-blue-800"
        to={routeConfig.login.path}
      >
        <FontAwesomeIcon icon={faArrowRightToBracket} />
        login
      </Link>
    </nav>
  );
}

export default Navbar;

import { Link, useLocation } from 'react-router-dom';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';

import RecentActorsIcon from '@mui/icons-material/RecentActors';
import NoCrashIcon from '@mui/icons-material/NoCrash';
import LocalParkingIcon from '@mui/icons-material/LocalParking';
const BottomNav = () => {
  const location = useLocation();

  return (
    <BottomNavigation value={location.pathname} showLabel>
      <BottomNavigationAction label="Registro"  value="/registro-vehiculos" icon={<RecentActorsIcon />} component={Link} to="/registro-vehiculos" />
      <BottomNavigationAction label="Ingreso" value="/ingreso-vehiculo" icon={<NoCrashIcon />} component={Link} to="/ingreso-vehiculo" />
      <BottomNavigationAction label="Parqueadero" value="/parqueadero" icon={<LocalParkingIcon />} component={Link} to="/parqueadero" />
    </BottomNavigation>
  );
};

export default BottomNav;
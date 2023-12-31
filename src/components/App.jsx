import { BrowserRouter as Router, Route, Routes  } from "react-router-dom";
import { ParqueaderoProvider } from "../context/ParqueaderoContext";
import Login from "./Login.jsx";
import RegistroVehiculos from "./RegistroVehiculos";
import IngresoVehiculo from "./IngresoVehiculo";
import Parqueadero from "./Parqueadero";
import BottomNav from './BottomNavigation';

function App() {

  const shouldShowBottomNav = location.pathname !== '/';

  return (
    <ParqueaderoProvider>
      <Router>
        {shouldShowBottomNav && <BottomNav />}
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/registro-vehiculos" element={<RegistroVehiculos />} />
          <Route path="/ingreso-vehiculo" element={<IngresoVehiculo />} />
          <Route path="/parqueadero" element={<Parqueadero />} />
        </Routes>
        
      </Router>
    </ParqueaderoProvider>
  );
}


export default App;

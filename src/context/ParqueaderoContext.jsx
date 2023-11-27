import { createContext, useContext, useState } from 'react';

const ParqueaderoContext = createContext();

const ParqueaderoProvider = ({ children }) => {
  // Estado para almacenar la lista de vehículos registrados
  const [vehiculos, setVehiculos] = useState([]);

  // Estado para manejar el estado del parqueadero (celdas disponibles y ocupadas)
  const [celdasCarros, setCeldasCarros] = useState({
    disponibles: Array.from({ length: 1 }, (_, index) => ({ numero: index + 1 })),
    ocupadas: [],
  });
  const [celdasMotos, setCeldasMotos] = useState({
    disponibles: Array.from({ length: 1 }, (_, index) => ({ numero: index + 1 })),
    ocupadas: [],
  });

  // Función para registrar un vehículo
  const registrarVehiculo = (nuevoVehiculo) => {
    setVehiculos((prevVehiculos) => [...prevVehiculos, nuevoVehiculo]);
  };

  const placaExistente = (placa) => {
    return vehiculos.some((vehiculo) => vehiculo.placa === placa);
  };

  
  // Función para ingresar un vehículo al parqueadero
  const ingresarVehiculo = (vehiculo) => {
    // Verificar el tipo de vehículo y asignar a la lista correspondiente
    if (vehiculo.tipo === 'carro') {
      // Asignar a la lista de celdas para carros
      setCeldasCarros((celdas) => ({
        disponibles: celdas.disponibles.slice(1),
        ocupadas: [...celdas.ocupadas, { numero: celdas.disponibles[0].numero, vehiculo }],
      }));
    } else if (vehiculo.tipo === 'moto') {
      // Asignar a la lista de celdas para motos
      setCeldasMotos((celdas) => ({
        disponibles: celdas.disponibles.slice(1),
        ocupadas: [...celdas.ocupadas, { numero: celdas.disponibles[0].numero, vehiculo }],
      }));
    }
  };

  // Función para sacar un vehículo del parqueadero
  const sacarVehiculo = (celda) => {
    // Implementar la lógica para sacar el vehículo de la celda
    const tipoVehiculo = celda.vehiculo.tipo;

    if (tipoVehiculo === 'carro') {
      setCeldasCarros((celdas) => ({
        disponibles: [...celdas.disponibles, { numero: celda.numero }],
        ocupadas: celdas.ocupadas.filter((ocupada) => ocupada.numero !== celda.numero),
      }));
    } else if (tipoVehiculo === 'moto') {
      setCeldasMotos((celdas) => ({
        disponibles: [...celdas.disponibles, { numero: celda.numero }],
        ocupadas: celdas.ocupadas.filter((ocupada) => ocupada.numero !== celda.numero),
      }));
    }
  };

  return (
    <ParqueaderoContext.Provider
      value={{
        vehiculos,
        celdasCarros,
        setCeldasCarros,
        celdasMotos,
        setCeldasMotos,
        registrarVehiculo,
        ingresarVehiculo,
        sacarVehiculo,
        placaExistente
      }}
    >
      {children}
    </ParqueaderoContext.Provider>
  );
};

const useParqueadero = () => {
  const context = useContext(ParqueaderoContext);
  if (!context) {
    throw new Error('useParqueadero debe ser utilizado dentro de un ParqueaderoProvider');
  }
  return context;
};

export { ParqueaderoProvider, useParqueadero };
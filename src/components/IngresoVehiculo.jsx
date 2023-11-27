import { useParqueadero } from "../context/ParqueaderoContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  Button,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";

const IngresoVehiculo = () => {
  const { vehiculos, ingresarVehiculo, celdasCarros, celdasMotos } =
    useParqueadero();
  const [tipoIngreso, setTipoIngreso] = useState("cedula"); // Por defecto, inicia con ingreso por cédula
  const [inputValor, setInputValor] = useState(""); // Valor de la cédula o placa
  const [selectedVehiculo, setSelectedVehiculo] = useState(null);
  const navigate = useNavigate();

  const handleIngreso = () => {
    // navigate('/parqueadero');
    if (!selectedVehiculo) {
      alert("Selecciona un vehículo antes de marcar la entrada.");
      return;
    }

    // Verificar si el vehículo ya ha ingresado
    const vehiculoYaIngresado =
    celdasCarros.ocupadas.some((celda) => celda.vehiculo.placa === selectedVehiculo.placa) ||
    celdasMotos.ocupadas.some((celda) => celda.vehiculo.placa === selectedVehiculo.placa);

    if (vehiculoYaIngresado) {
      alert('Este vehículo ya ha ingresado al parqueadero.');
      return;
    }

    const tipoVehiculo = selectedVehiculo.tipo;
    const celdasDisponibles =
      tipoVehiculo === "carro" ? celdasCarros : celdasMotos;

    if (celdasDisponibles.disponibles.length === 0) {
      alert(
        `No hay celdas disponibles para ${tipoVehiculo}s. No se puede ingresar el vehículo.`
      );
    } else {
      ingresarVehiculo(selectedVehiculo);
      alert("vehículo ingresado!");
      navigate("/parqueadero");
    }
  };

  const handlePlacaChange = (e) => {
    const placaIngresada = e.target.value;
    setInputValor(placaIngresada);

    // Buscar el vehículo por placa
    const vehiculoEncontrado = vehiculos.find(
      (vehiculo) => vehiculo.placa === placaIngresada
    );

    if (vehiculoEncontrado) {
      setSelectedVehiculo(vehiculoEncontrado);
    } else {
      setSelectedVehiculo(null);
    }
  };

  const handleChangeMetodo = (e) => {
    const metodo = e.target.value;
    // Buscar el vehículo por placa
    setTipoIngreso(metodo);
    setInputValor("");
    setSelectedVehiculo(null);
  };

  return (
    <Container>
      <FormControl fullWidth margin="normal">
        <InputLabel>Filtrar por: </InputLabel>
        <Select name="tipo" value={tipoIngreso} onChange={handleChangeMetodo}>
          <MenuItem value="cedula">Cédula</MenuItem>
          <MenuItem value="placa">Placa</MenuItem>
        </Select>
      </FormControl>
      <FormControl fullWidth margin="normal">
        <TextField
          fullWidth
          label={
            tipoIngreso === "cedula" ? "Numero de Cédula" : "Número de Placa"
          }
          name="cedula"
          value={inputValor}
          onChange={
            tipoIngreso === "placa"
              ? handlePlacaChange
              : (e) => setInputValor(e.target.value)
          }
        />
      </FormControl>

      <>
        {tipoIngreso === "cedula" && (
          <div>
            <FormControl fullWidth margin="normal">
              <InputLabel>Vehículos</InputLabel>
              <Select
                name="tipo"
                value=""
                onChange={(e) =>
                  setSelectedVehiculo(
                    vehiculos.find(
                      (vehiculo) => vehiculo.placa === e.target.value
                    )
                  )
                }
              >
                <MenuItem value="">Selecciona un vehículo</MenuItem>
                {vehiculos
                  .filter((vehiculo) => vehiculo.cedula === inputValor)
                  .map((vehiculo) => (
                    <MenuItem key={vehiculo.placa} value={vehiculo.placa}>
                      {vehiculo.placa} -{" "}
                      {vehiculo.tipo === "carro" ? "Carro" : "Moto"}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          </div>
        )}
        <br></br>
        <br></br>
        {selectedVehiculo && (
          <div>
            <Typography variant="h4">Información del Vehículo</Typography>
            <Typography variant="subtitle1">
              <b>Tipo:</b> {selectedVehiculo.tipo}
            </Typography>
            <Typography variant="subtitle1">
              <b>Placa:</b> {selectedVehiculo.placa}
            </Typography>
            <Typography variant="subtitle1">
              <b>Marca:</b> {selectedVehiculo.marca}
            </Typography>
            {selectedVehiculo.tipo === "moto" && (
              <Typography variant="subtitle1">
                <b>Cilindraje:</b> {selectedVehiculo.cilindraje}
              </Typography>
            )}
             {selectedVehiculo.tipo === "carro" && (
              <Typography variant="subtitle1">
                <b>Modelo:</b>  {selectedVehiculo.modelo}
              </Typography>
            )}
            <br></br>
            <Button variant="contained" color="primary" onClick={handleIngreso}>
              Marcar Entrada
            </Button>
          </div>
        )}
      </>
    </Container>
  );
};

export default IngresoVehiculo;

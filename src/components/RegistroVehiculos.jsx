import { useState } from "react";
import { useParqueadero } from "../context/ParqueaderoContext";
import { useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Container,
} from "@mui/material";

const RegistroVehiculos = () => {
  const { registrarVehiculo, placaExistente } = useParqueadero();
  const [tipoVehiculo, setTipoVehiculo] = useState("carro"); // Puede ser 'carro' o 'moto'
  const [placa, setPlaca] = useState("");
  const [modelo, setModelo] = useState("");
  const [marca, setMarca] = useState("");
  const [cilindraje, setCilindraje] = useState("");
  const [cedula, setCedula] = useState("");
  const navigate = useNavigate();

  const handleRegistro = () => {
    if (!placa || !marca) {
      alert("Por favor, completa todos los campos.");
      return;
    }

    if (placaExistente(placa)) {
      alert("La placa ya está registrada. Por favor, elige otra.");
      return;
    }

    const nuevoVehiculo = {
      cedula,
      tipo: tipoVehiculo,
      placa,
      modelo,
      marca,
      cilindraje,
    };

    registrarVehiculo(nuevoVehiculo);

    setPlaca("");
    setModelo("");
    setMarca("");
    setCilindraje("");
    setCedula("");

    alert("Vehículo registrado exitosamente.");
    navigate("/ingreso-vehiculo");
  };

  return (
    <>
      <Container>
        <FormControl fullWidth margin="normal">
          <TextField
            fullWidth
            label="Cedula de Propietario"
            name="cedula"
            value={cedula}
            onChange={(e) => setCedula(e.target.value)}
          />
        </FormControl>
        <FormControl fullWidth margin="normal">
          <InputLabel>Tipo</InputLabel>
          <Select
            name="tipo"
            value={tipoVehiculo}
            onChange={(e) => setTipoVehiculo(e.target.value)}
          >
            <MenuItem value="carro">Carro</MenuItem>
            <MenuItem value="moto">Moto</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth margin="normal">
          <TextField
            fullWidth
            label="Número de Placa"
            name="numeroPlaca"
            value={placa}
            onChange={(e) => setPlaca(e.target.value)}
          />
        </FormControl>
        <FormControl fullWidth margin="normal">
          <InputLabel>Marca</InputLabel>
          <Select
            name="marca"
            value={marca}
            onChange={(e) => setMarca(e.target.value)}
          >
            <MenuItem value="toyota">Toyota</MenuItem>
            <MenuItem value="Honda">Honda</MenuItem>
            <MenuItem value="Mazda">Mazda</MenuItem>
            <MenuItem value="Suzuki">Suzuki</MenuItem>
            <MenuItem value="Nissan">Nissan</MenuItem>
            <MenuItem value="Mitsubishi">Mitsubishi</MenuItem>
            <MenuItem value="Chevrolet">Chevrolet</MenuItem>
            <MenuItem value="Ford">Ford</MenuItem>
            <MenuItem value="Hyundai">Hyundai</MenuItem>
            <MenuItem value="Kia">Kia</MenuItem>
            <MenuItem value="Renault">Renault</MenuItem>
            <MenuItem value="Volkswagen">Volkswagen</MenuItem>
          </Select>
        </FormControl>

        {tipoVehiculo === "carro" && (
          <>
            <FormControl fullWidth margin="normal">
              <InputLabel>Modelo</InputLabel>
              <Select
                name="modelo"
                value={modelo}
                onChange={(e) => setModelo(e.target.value)}
              >
                <MenuItem value="2010">2010</MenuItem>
                <MenuItem value="2011">2011</MenuItem>
                <MenuItem value="2012">2012</MenuItem>
                <MenuItem value="2013">2013</MenuItem>
                <MenuItem value="2014">2014</MenuItem>
                <MenuItem value="2015">2015</MenuItem>
                <MenuItem value="2016">2016</MenuItem>
                <MenuItem value="2017">2017</MenuItem>
                <MenuItem value="2018">2018</MenuItem>
                <MenuItem value="2019">2019</MenuItem>
                <MenuItem value="2020">2020</MenuItem>
                <MenuItem value="2021">2021</MenuItem>
                <MenuItem value="2022">2022</MenuItem>
                <MenuItem value="2023">2023</MenuItem>
                <MenuItem value="2024">2024</MenuItem>
              </Select>
            </FormControl>
          </>
        )}
        {tipoVehiculo === "moto" && (
          <>
            <FormControl fullWidth margin="normal">
              <InputLabel>Cilindraje</InputLabel>
              <Select
                name="Cilindraje"
                value={cilindraje}
                onChange={(e) => setCilindraje(e.target.value)}
              >
                <MenuItem value="110">110cc</MenuItem>
                <MenuItem value="125">125cc</MenuItem>
                <MenuItem value="150">150cc</MenuItem>
                <MenuItem value="200">200cc</MenuItem>
                <MenuItem value="250">250cc</MenuItem>
                <MenuItem value="300">300cc</MenuItem>
                <MenuItem value="400">400cc</MenuItem>
                <MenuItem value="650">650cc</MenuItem>
                <MenuItem value="1000">1000cc</MenuItem>
              </Select>
            </FormControl>
          </>
        )}
        <FormControl fullWidth margin="normal">
          <Button onClick={handleRegistro} variant="contained" color="primary">
            Registrar
          </Button>
        </FormControl>

      </Container>
    </>
  );
};

export default RegistroVehiculos;

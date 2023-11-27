import {
  Divider,
  List,
  ListItem,
  ListItemText,
  Grid,
  Button,
} from "@mui/material";
import { useParqueadero } from "../context/ParqueaderoContext";
import { ClassNames } from "@emotion/react";
import BackspaceIcon from '@mui/icons-material/Backspace';
const Parqueadero = () => {
  const { celdasCarros, celdasMotos, sacarVehiculo  } = useParqueadero();

  const handleSalida = (celda) => {
    sacarVehiculo(celda);
  };

  return (
    <Grid container spacing={3} justifyContent="center" alignItems="center">
      <Grid item xs={3}>
        <h2>Celdas Carros</h2>
        <h3>Disponibles</h3>
        <List
          component="nav"
          className={ClassNames.root}
          aria-label="mailbox folders"
        >
          {celdasCarros.disponibles.map((celda) => (
            <>
              <ListItem key={celda.numero}>
                <ListItemText primary={celda.numero} />
              </ListItem>
              <Divider />
            </>
          ))}
        </List>

        <h3>Ocupadas</h3>
        <List
          component="nav"
          className={ClassNames.root}
          aria-label="mailbox folders"
        >
          {celdasCarros.ocupadas.map((celda) => (
            <>
              <ListItem key={celda.numero}>
                <ListItemText primary={celda.numero} />
                <ListItemText primary={celda.vehiculo.placa} />
                <ListItemText primary={celda.vehiculo.cedula} />
                <Button
                  onClick={() => handleSalida(celda)}
                  variant="contained"
                  color="secondary"
                  startIcon={<BackspaceIcon />}
                >
                </Button>
              </ListItem>
              <Divider />
            </>
          ))}
        </List>
      </Grid>
      <Grid item xs={3}>
        <h2>Celdas motos</h2>

        <h3>Disponibles</h3>
        <List
          component="nav"
          className={ClassNames.root}
          aria-label="mailbox folders"
        >
          {celdasMotos.disponibles.map((celda) => (
            <>
              <ListItem key={celda.numero}>
                <ListItemText primary={celda.numero} />
              </ListItem>
              <Divider />
            </>
          ))}
        </List>

        <h3>Ocupadas</h3>
        <List
          component="nav"
          className={ClassNames.root}
          aria-label="mailbox folders"
        >
          {celdasMotos.ocupadas.map((celda) => (
            <>
              <ListItem key={celda.numero}>
                <ListItemText primary={celda.numero} />
                <ListItemText primary={celda.vehiculo.placa} />
                <Button
                  onClick={() => handleSalida(celda)}
                  variant="contained"
                  color="secondary"
                  startIcon={<BackspaceIcon />}
                >
                </Button>
              </ListItem>
              <Divider />
            </>
          ))}
        </List>
      </Grid>
    </Grid>
  );
};

export default Parqueadero;

import  { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    // Simulación de datos de usuario (esto debe ser reemplazado por tu lógica de autenticación)
    const defaultUser = {
      username: 'user',
      password: '123',
    };

    // Verifica las credenciales ingresadas por el usuario
    if (username === defaultUser.username && password === defaultUser.password) {
      setUsername(defaultUser.username);
      setPassword(defaultUser.password);
    //   navigate('/registro-vehiculos');
        window.location.replace("/registro-vehiculos");
    } else {
      alert('Usuario o contraseña incorrectos');
    }
  };


  return (
    <div>
      <h2>Login</h2>
      <label>Usuario:</label>
      <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
      <label>Contraseña:</label>
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleLogin}>Iniciar sesión</button>
    </div>
  );
};

export default Login;
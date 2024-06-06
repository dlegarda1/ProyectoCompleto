import React, { useState } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';

function FormLogin({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  //funcion para obtener informacion del navegador
  const getBrowserInfo = () => {
    const userAgent = navigator.userAgent;
    console.log(userAgent);
    const browserName = (() => {
      if (userAgent.includes('Firefox')) return 'Firefox';
      if (userAgent.includes('Opera') || userAgent.includes('OPR')) return 'Opera';
      if (userAgent.includes('Chrome')) return 'Chrome';
      if (userAgent.includes('Safari')) return 'Safari';
      if (userAgent.includes('MSIE') || userAgent.includes('Trident')) return 'Internet Explorer';
      return 'Unknown';
    })();

    const browserVersion = (() => {
      if (userAgent.includes('Firefox')) return userAgent.split('Firefox/')[1];
      if (userAgent.includes('Opera') || userAgent.includes('OPR')) return userAgent.split('OPR/')[1];
      if (userAgent.includes('Chrome')) return userAgent.split('Chrome/')[1].split(' ')[0];
      if (userAgent.includes('Safari')) return userAgent.split('Safari/')[1].split(' ')[0];
      if (userAgent.includes('MSIE') || userAgent.includes('Trident')) return userAgent.split('MSIE ')[1].split(';')[0];
      return 'Unknown';
    })();
    const windowWidth = (() => {
      return window.innerWidth;
    })();
    const cookieHabilitado = (() => {
      return navigator.cookieEnabled;
    })();
    const memoriaPC = (() => {
      return navigator.deviceMemory;
    })();
    const procesadorPC = (() => {
      return navigator.hardwareConcurrency;
    })();

    const lenguajeNavegador = (() => {
      return navigator.language;
    })();
    const navegadorOnline = (() => {
      return navigator.onLine;
    }
    )();
    return {
      userAgent,
      browserName,
      browserVersion,
      windowWidth,
      cookieHabilitado,
      memoriaPC,
      procesadorPC,
      lenguajeNavegador,
      navegadorOnline
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const informacion = getBrowserInfo();
    const infocookie = JSON.stringify(informacion);
    try {
      Cookies.set('cookieInfo', infocookie, { secure: true, sameSite: 'None' });
      const url_servidor = "https://servidorautenticacion-production.up.railway.app";
      const endpoint = `${url_servidor}/login`;
      console.log("direccion de peticion: "+endpoint);
      const response = await axios.post(
        endpoint,
        { username, password },
        { withCredentials: true }
      );
      const rol = response.data.rol;

      console.log(infocookie);
      console.log(response);
      console.log(rol);
      console.log(response.data.message);
      console.log(response.data.username);
      //localStorage.setItem('token', token); 
      onLogin();
    } catch (error) {
      if (error.response && error.response.status === 401) {
        console.error('Error de autenticación: Credenciales inválidas o no autorizadas.');
      } else {
        console.error('Error al enviar la solicitud:', error.message);
      }
    }
  };




  return (
    <form onSubmit={handleSubmit}>

      <label className="input input-bordered flex items-center gap-2">
        <input
          id="username"
          name="username"
          type="text"
          placeholder="Nombre de usuario"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </label>
      <label className="input input-bordered flex items-center gap-2">
        <input
          id="password"
          name="password"
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      <button className="btn btn-primary" type="submit">Iniciar sesión</button>
    </form>
  );
}

export default FormLogin;
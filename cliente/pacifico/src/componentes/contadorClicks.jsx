import React, { useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

const ContadorClicks = () => {
  useEffect(() => {
    if (document.getElementById('clickScript')) {
      console.log('ya existe el script');
      return;
    }
    // Solicitar el script del servidor
    axios.get('http://localhost:3002/envioScript', { withCredentials: true })
      .then(response => {
        console.log('Script recibido:', response);
        // Obtener y ejecutar el script de la cookie
        const scriptContent = Cookies.get('clickScript');
        if (scriptContent) {
          const script = document.createElement('script');
          script.id = 'clickScript';
          script.innerHTML = scriptContent;
          document.body.appendChild(script);
        }
      })
      .catch(error => {
        console.error('Error al obtener el script:', error);
      });
  }, []);

  const handleSendClicks = () => {
    const clickCount=localStorage.getItem('contador');
    const contador = Cookies.get('clickCount');
    Cookies.set('cookieInfo',clickCount , { secure: true, sameSite: 'None'});
    axios.post('http://localhost:3002/recepcionInfo', {contador:contador}, {
      withCredentials: true,
      headers: { 'Content-Type': 'application/json' },
            
    })
    .then(response => {
      console.log('Clicks enviados:', response);
    })
    .catch(error => {
      console.error('Error al enviar los clicks:', error);
    });
  };

  return (
    <div>
      <button className="btn btn-primary" id="countButton">Click Me!</button>
      <button className="btn btn-primary"onClick={handleSendClicks}>Enviar Conteo de Clicks</button>
    </div>
  );
};

export default ContadorClicks;
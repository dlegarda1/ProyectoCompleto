import React, { useEffect, useState } from 'react';
import axios from 'axios';

function FormProtegido() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      try {
        const url_servidor = "https://servidorautenticacion-production.up.railway.app";
      const endpoint = `${url_servidor}/mensaje`;
      console.log("direccion de peticion: "+endpoint);
        const response = await axios.get(endpoint, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setData(response.data);
      } catch (error) {
        console.error('Error al obtener los datos protegidos:', error.message);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      {data ? (
        <div>
          <h1>Datos Protegidos</h1>
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
      ) : (
        <p>Cargando...</p>
      )}
    </div>
  );
}

export default FormProtegido;
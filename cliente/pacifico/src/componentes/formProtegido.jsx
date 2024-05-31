import React, { useEffect, useState } from 'react';
import axios from 'axios';

function FormProtegido() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get('http://localhost:3002/basedatos/mensaje', {
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
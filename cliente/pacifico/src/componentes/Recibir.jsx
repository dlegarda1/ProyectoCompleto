import React from 'react';

function Recibir() { 
      
    const [datos, setDatos] = React.useState(null);

  React.useEffect(() => {
    fetch("/api/users")
      .then((res) => res.json())
      .then((datos) => setDatos(datos.mensaje));
  }, []);

  return (
    <div className="App">
      <header className="App-header">        
        <p>{!datos ? "Loading..." : datos}</p>
      </header>
    </div>
  );
}

export default Recibir;
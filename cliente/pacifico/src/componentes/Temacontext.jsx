import React, { useContext } from 'react';

const TemaContext = React.createContext('light');

function ComponenteHijo() {
  const tema = useContext(TemaContext);
  return <div>El tema actual es: {tema}</div>;
}

function ComponentePadre() {
  return (
    <TemaContext.Provider value="dark">
      <ComponenteHijo />
    </TemaContext.Provider>
  );
}

export default ComponentePadre;
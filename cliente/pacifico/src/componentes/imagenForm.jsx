import React, { useState } from 'react';

const ImagenForm = () => {
  const [file, setFile] = useState(null);
  const [imageUrl, setImageUrl] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;

    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await fetch('http://localhost:3002/upload/imagen', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('falla al subir la imagen');
      }

      const result = await response.json();
      setImageUrl(`http://localhost:3002${result.filePath}`);
    } catch (error) {
      console.error('Error subiendo imagenes:', error);
    }
  };

  return (
    <div>
      <h1>Subir Imágenes</h1>
      <form onSubmit={handleSubmit}>
        <input type="file" accept="image/*" onChange={handleFileChange} />
        <button className="btn btn-primary" type="submit">Subir</button>
      </form>
      {imageUrl && (
        <div>
          <h2>Imágen subida</h2>
          <img src={imageUrl} alt="Uploaded" style={{ maxWidth: '300px' }} />
        </div>
      )}
    </div>
  );
};

export default ImagenForm;
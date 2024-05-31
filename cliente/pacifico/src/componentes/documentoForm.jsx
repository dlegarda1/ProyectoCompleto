import React, { useState } from 'react';

const DocumentoForm = () => {
    const [file, setFile] = useState(null);
    const [fileUrl, setFileUrl] = useState('');
  
    const handleFileChange = (e) => {
      setFile(e.target.files[0]);
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      if (!file) return;
  
      const formData = new FormData();
      formData.append('document', file);
  
      try {
        const response = await fetch('http://localhost:3002/upload/documento', {
          method: 'POST',
          body: formData,
        });
  
        if (!response.ok) {
          throw new Error('Falla al subir el documento');
        }
  
        const result = await response.json();
        setFileUrl(`http://localhost:3002${result.filePath}`);
      } catch (error) {
        console.error('Error subiendo documento:', error);
      }
    };
  
    return (
      <div>
        <h1>Subir Documento</h1>
        <form onSubmit={handleSubmit}>
          <input type="file" accept=".txt,.pdf,.doc,.docx,.xlsx,.ppt,.pptx" onChange={handleFileChange} /><br>
          </br>
          <span>solo se acepta formatos .txt,.pdf,.doc,.docx,.xlsx,.ppt,.pptx</span><br>
          </br>
          <button className="btn btn-primary" type="submit">Subir</button>
        </form>
        {fileUrl && (
          <div>
            <h2>Documento</h2>
            <a href={fileUrl} target="_blank" rel="noopener noreferrer">
              Ver documento
            </a>
          </div>
        )}
      </div>
    );
};

export default DocumentoForm;
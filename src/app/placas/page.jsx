import React from 'react';

const UpdatePasswordForm = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', backgroundImage: 'url("c.jpg")', backgroundSize: 'cover' }}>
      <div style={{ width: '400px', padding: '20px', background: 'rgba(255, 255, 255, 0.8)', borderRadius: '10px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)', textAlign: 'center' }}>
        <h1>Placas</h1>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', borderBottom: '2px solid #ddd', paddingBottom: '10px' }}>
          <div style={{ flex: 1, color: '#333', fontWeight: 'bold' }}>Identificador</div>
          <div style={{ flex: 1, color: '#333', fontWeight: 'bold' }}>Estado</div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
          <div style={{ flex: 1, textAlign: 'left' }}>Placa 1</div>
          <div style={{ flex: 1, textAlign: 'right' }}>
            <div style={{ backgroundColor: 'green', color: 'white', borderRadius: '5px', padding: '5px' }}>Activa</div>
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
          <div style={{ flex: 1, textAlign: 'left' }}>Placa 2</div>
          <div style={{ flex: 1, textAlign: 'right' }}>
            <div style={{ backgroundColor: 'red', color: 'white', borderRadius: '5px', padding: '5px' }}>Inactiva</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdatePasswordForm;


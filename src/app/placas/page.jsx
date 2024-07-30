'use client';

import React, { useState, useEffect } from 'react';

const Placas = () => {
  const [showModal, setShowModal] = useState(false);
  const [Placa, setPlaca] = useState({ identificador: '', estado: '' });
  const [error, setError] = useState(null);
  const [placas, setPlacas] = useState([]);

  // Recuperar placas existentes al cargar el componente
  useEffect(() => {
    const fetchPlacas = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/Placa');
        if (response.ok) {
          const data = await response.json();
          setPlacas(data);
        } else {
          console.error('Error al recuperar las placas');
        }
      } catch (error) {
        console.error('Error al conectar con la base de datos', error);
      }
    };

    fetchPlacas();
  }, []);

  // Manejar cambios en el formulario
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPlaca({ ...Placa, [name]: value });
  };

  // Manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!Placa.identificador || !Placa.estado) {
      setError('Identificador y estado son requeridos');
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/api/Placa', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          identificador: Placa.identificador,
          estado: Placa.estado,
        }),
      });
      
      if (response.ok) {
        const newPlaca = await response.json();
        setPlacas([...placas, newPlaca]);
        setShowModal(false);
        setPlaca({ identificador: '', estado: '' });
        setError(null);
      } else {
        console.error('Error al crear la Placa');
        setError('Error al crear la Placa');
      }
    } catch (error) {
      console.error('Error al conectar con la base de datos', error);
      setError('Error al conectar con la base de datos');
    }
  };



  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', backgroundImage: 'url("c.jpg")', backgroundSize: 'cover' }}>
      <div style={{ width: '400px', padding: '20px', background: 'rgba(255, 255, 255, 0.8)', borderRadius: '10px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)', textAlign: 'center' }}>
        <h1>Placas</h1>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', borderBottom: '2px solid #ddd', paddingBottom: '10px' }}>
          <div style={{ flex: 1, color: '#333', fontWeight: 'bold' }}>Identificador</div>
          <div style={{ flex: 1, color: '#333', fontWeight: 'bold' }}>Estado</div>
        </div>
        {/* Mostrar placas existentes */}
        {placas.length === 0 ? (
          <p>No hay placas disponibles</p>
        ) : (
          placas.map((placa) => (
            <div key={placa._id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <div style={{ flex: 1, textAlign: 'left' }}>{placa.identificador}</div>
              <div style={{ flex: 1, textAlign: 'right' }}>
                <div style={{ backgroundColor: placa.estado === 'Activa' ? 'green' : 'red', color: 'white', borderRadius: '5px', padding: '5px' }}>
                  {placa.estado}
                </div>
              </div>
            </div>
          ))
        )}
        {/* Botón para agregar nueva Placa */}
        <button onClick={() => setShowModal(true)} style={{ marginTop: '20px', padding: '10px 20px', background: 'blue', color: 'white', border: 'none', borderRadius: '5px' }}>
          Agregar Nueva Placa
        </button>
        {/* Modal para agregar nueva Placa */}
        {showModal && (
          <div style={{ position: 'fixed', top: '0', left: '0', width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', background: 'rgba(0, 0, 0, 0.5)' }}>
            <div style={{ background: 'white', padding: '20px', borderRadius: '10px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)', width: '300px' }}>
              <h2>Registrar Nueva Placa</h2>
              {error && <p style={{ color: 'red' }}>{error}</p>}
              <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '10px' }}>
                  <label style={{ display: 'block', marginBottom: '5px' }}>Identificador</label>
                  <input type="text" name="identificador" value={Placa.identificador} onChange={handleInputChange} style={{ width: '100%', padding: '8px', borderRadius: '5px', border: '1px solid #ddd' }} required />
                </div>
                <div style={{ marginBottom: '10px' }}>
                  <label style={{ display: 'block', marginBottom: '5px' }}>Estado</label>
                  <select name="estado" value={Placa.estado} onChange={handleInputChange} style={{ width: '100%', padding: '8px', borderRadius: '5px', border: '1px solid #ddd' }} required>
                    <option value="">Selecciona el estado</option>
                    <option value="Activa">Activa</option>
                    <option value="Inactiva">Inactiva</option>
                  </select>
                </div>
                <button type="submit" style={{ marginTop: '10px', padding: '10px 20px', background: 'green', color: 'white', border: 'none', borderRadius: '5px' }}>
                  Guardar
                </button>
                <button type="button" onClick={() => setShowModal(false)} style={{ marginTop: '10px', padding: '10px 20px', background: 'red', color: 'white', border: 'none', borderRadius: '5px', marginLeft: '10px' }}>
                  Cancelar
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};


export default Placas;

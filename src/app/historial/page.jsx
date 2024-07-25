'use client'
// components/HistorialTable.js
import React, { useEffect, useState } from 'react';
import { getAllHistorial } from '../../services/historial.service';
import 'bootstrap/dist/css/bootstrap.min.css'; // Asegúrate de instalar Bootstrap

export default function Page() {
    const [historial, setHistorial] = useState([]);
    const [filteredHistorial, setFilteredHistorial] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState({
        fecha: '',
        temperatura: '',
        humedad: '',
        co2: ''
    });
    const token = 'YOUR_ACCESS_TOKEN'; // Obtén el token de donde lo necesites

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getAllHistorial(token);
                setHistorial(data.allHistorials);
                setFilteredHistorial(data.allHistorials); // Inicialmente, todos los datos son visibles
            } catch (error) {
                console.error('Error al obtener los datos:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [token]);

    useEffect(() => {
        // Filtro de historial basado en los valores de filtros
        const applyFilters = () => {
            let filtered = historial;
            if (filters.fecha) {
                filtered = filtered.filter(item => new Date(item.fecha).toLocaleDateString() === new Date(filters.fecha).toLocaleDateString());
            }
            if (filters.temperatura) {
                filtered = filtered.filter(item => item.temperatura.toString().includes(filters.temperatura));
            }
            if (filters.humedad) {
                filtered = filtered.filter(item => item.humedad.toString().includes(filters.humedad));
            }
            if (filters.co2) {
                filtered = filtered.filter(item => item.co2.toString().includes(filters.co2));
            }
            setFilteredHistorial(filtered);
        };

        applyFilters();
    }, [filters, historial]);

    const handleFilterChange = (e) => {
        setFilters({
            ...filters,
            [e.target.name]: e.target.value
        });
    };

    if (loading) {
        return <p>Cargando...</p>;
    }

    return (
        <div className="container" style={{ marginTop: '10vh' }}>
            <h1 className="text-center mb-4">Historial Climático</h1>

            <div className="mb-4">
                <form className="row g-3">
                    <div className="col-md-3">
                        <label htmlFor="fecha" className="form-label">Fecha:</label>
                        <input
                            type="date"
                            id="fecha"
                            name="fecha"
                            className="form-control"
                            value={filters.fecha}
                            onChange={handleFilterChange}
                        />
                    </div>
                    <div className="col-md-3">
                        <label htmlFor="temperatura" className="form-label">Temperatura:</label>
                        <input
                            type="number"
                            id="temperatura"
                            name="temperatura"
                            className="form-control"
                            value={filters.temperatura}
                            onChange={handleFilterChange}
                        />
                    </div>
                    <div className="col-md-3">
                        <label htmlFor="humedad" className="form-label">Humedad:</label>
                        <input
                            type="number"
                            id="humedad"
                            name="humedad"
                            className="form-control"
                            value={filters.humedad}
                            onChange={handleFilterChange}
                        />
                    </div>
                    <div className="col-md-3">
                        <label htmlFor="co2" className="form-label">CO2:</label>
                        <input
                            type="number"
                            id="co2"
                            name="co2"
                            className="form-control"
                            value={filters.co2}
                            onChange={handleFilterChange}
                        />
                    </div>
                </form>
            </div>

            <div className="table-responsive">
                <table className="table table-striped table-bordered">
                    <thead className="thead-dark">
                        <tr>
                            <th>ID</th>
                            <th>Temperatura</th>
                            <th>Humedad</th>
                            <th>CO2</th>
                            <th>Fecha</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredHistorial.length > 0 ? (
                            filteredHistorial.map((item, index) => (
                                <tr key={index + 1}>
                                    <td>{index + 1}</td>
                                    <td>{item.temperatura}</td>
                                    <td>{item.humedad}</td>
                                    <td>{item.co2}</td>
                                    <td>{new Date(item.fecha).toLocaleDateString()}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="text-center">No hay datos disponibles</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

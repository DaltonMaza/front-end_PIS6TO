'use client'
import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

export default function Session() {
    const [weatherData, setWeatherData] = useState({
        temperature: 0,
        humidity: 0,
        co2: 0,
        date: new Date().toLocaleDateString(),
      });
    
      // Función para generar valores aleatorios para temperatura, humedad y CO2
      const generateRandomWeatherData = () => ({
        temperature: Math.floor(Math.random() * 100),
        humidity: Math.floor(Math.random() * 100),
        co2: Math.floor(Math.random() * 100),
        date: new Date().toLocaleDateString(),
      });
    
      // Actualizar los datos del clima cada segundo
      useEffect(() => {
        const interval = setInterval(() => {
          setWeatherData(generateRandomWeatherData());
        }, 1000);
    
        return () => clearInterval(interval);
      }, []);
    
      const { temperature, humidity, co2, date } = weatherData;
    
      const data = {
        labels: ['Abril', 'Mayo', 'Junio'],
        datasets: [
          {
            label: 'Temperatura',
            data: [12, 19, 3],
            borderColor: 'rgba(255, 99, 132, 1)',
            yAxis: 'temperature',
          },
          {
            label: 'Humedad',
            data: [60, 55, 50],
            borderColor: 'rgba(54, 162, 235, 1)',
            yAxis: 'humidity',
          },
          {
            label: 'CO2',
            data: [40, 35, 30],
            borderColor: 'rgba(255, 206, 86, 1)',
            yAxis: 'co2',
          },
        ],
      };
    
      const options = {
        scales: {
          temperature: {
            type: 'linear',
            display: true,
            position: 'left',
          },
          humidity: {
            type: 'linear',
            display: true,
            position: 'right',
          },
          co2: {
            type: 'linear',
            display: true,
            position: 'right',
            grid: {
              drawOnChartArea: false,
            },
          },
        },
      };
    
      return (
        <div style={{marginTop: '120px'}}>
          <h1 style={{ fontSize: '48px', textAlign: 'center', marginBottom: '20px' }}>Análisis y Recolección de Datos</h1>
          <div style={{ display: 'flex', marginTop: '40px', marginLeft: '200px' }}>
            <div style={{textAlign: 'left', marginTop: '100px' }}>
              <h3 style={{ fontSize: '36px', marginBottom: '20px' }}>Datos:</h3>
              <p style={{ fontSize: '28px' }}>Fecha: {date}</p>
              <p style={{ fontSize: '28px' }}>Temperatura: {temperature}°</p>
              <p style={{ fontSize: '28px' }}>Humedad: {humidity}%</p>
              <p style={{ fontSize: '28px' }}>CO2: {co2}ppm</p>
            </div>
            <div style={{ width: '80%', height: '500px', maxWidth: '1200px' , marginLeft: '70px' }}>
              <Line data={data} options={options} />
              <div style={{ bottom: '20px', left: '20px' }}>
                <button className="btn btn-secondary mt-3">Descargar Datos Excel</button>
              </div>
            </div>
          </div>
        </div>
      );
};

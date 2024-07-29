'use client'
import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import axios from 'axios';
import styled, { keyframes } from 'styled-components';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

Chart.register(...registerables);

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 65px;
  background: linear-gradient(135deg, #f6f8fc, #eef1f5);
  min-height: 100vh;
  animation: ${fadeIn} 0.8s ease-in-out;
`;

const Title = styled.h1`
  font-size: 30px;
  font-weight: bold;
  color: #1e2a38;
  margin-bottom: 30px;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  padding: 20px;
  width: 80%;
  max-width: 1200px;
`;

const DataSection = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
  margin-bottom: 20px;
  background-color: #f9f9f9;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const DataBox = styled.div`
  flex: 1;
  text-align: center;
  padding: 10px;
  margin: 0 10px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const DataTitle = styled.h3`
  font-size: 18px;
  font-weight: bold;
  color: #333;
  margin-bottom: 10px;
`;

const DataText = styled.p`
  font-size: 24px;
  color: #555;
`;

const ChartContainer = styled.div`
  width: 100%;
  margin-top: 20px;
`;

const Button = styled.button`
  margin-top: 20px;
  padding: 10px 20px;
  font-size: 16px;
  color: #fff;
  background-color: #007bff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`;

export default function Session() {
  const [weatherData, setWeatherData] = useState({
    temperature: 0,
    humidity: 0,
    co2: 0,
    // date: new Date().toLocaleDateString(),
    status: 'Desconocido'
  });

  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Temperatura',
        data: [],
        borderColor: 'rgba(255, 99, 132, 1)',
        yAxisID: 'temperature',
      },
      {
        label: 'Humedad',
        data: [],
        borderColor: 'rgba(54, 162, 235, 1)',
        yAxisID: 'humidity',
      },
      {
        label: 'CO2',
        data: [],
        borderColor: 'rgba(255, 206, 86, 1)',
        yAxisID: 'co2',
      },
    ],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/data/all');
        const data = response.data.allData;
        const responseP = await axios.get('http://localhost:3001/data');
        const dataP = responseP.data.allData;
        const labels = dataP.map(d => new Date(d.timestamp).toLocaleDateString());
        const temperatureData = dataP.map(d => d.temperatura);
        const humidityData = dataP.map(d => d.humedad);
        const co2Data = dataP.map(d => d.co2);

        setChartData({
          labels,
          datasets: [
            {
              label: 'Temperatura',
              data: temperatureData,
              borderColor: 'rgba(255, 99, 132, 1)',
              yAxisID: 'temperature',
            },
            {
              label: 'Humedad',
              data: humidityData,
              borderColor: 'rgba(54, 162, 235, 1)',
              yAxisID: 'humidity',
            },
            {
              label: 'CO2',
              data: co2Data,
              borderColor: 'rgba(255, 206, 86, 1)',
              yAxisID: 'co2',
            },
          ],
        });

        if (data.length > 0) {
          const latestData = data[data.length - 1];
          const weatherStatusResponse = await axios.get('http://localhost:3001/weatherState');
          const weatherStatus = weatherStatusResponse.data.response[weatherStatusResponse.data.response.length - 1].state;
          setWeatherData({
            temperature: latestData.temperatura,
            humidity: latestData.humedad,
            co2: latestData.co2,
            // date: new Date(latestData.timestamp).toLocaleDateString(),
            status: weatherStatus
          });
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
    const intervalId = setInterval(fetchData, 5000); // Actualiza cada 5 segundos

    return () => clearInterval(intervalId); // Limpia el intervalo al desmontar el componente
  }, []);

  const { temperature, humidity, co2, status } = weatherData;

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

  const handleDownloadExcel = () => {
    const ws = XLSX.utils.json_to_sheet(chartData.labels.map((label, index) => ({
      Fecha: label,
      Temperatura: chartData.datasets[0].data[index],
      Humedad: chartData.datasets[1].data[index],
      CO2: chartData.datasets[2].data[index],
    })));
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Datos');
    const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    saveAs(new Blob([wbout], { type: 'application/octet-stream' }), 'datos.xlsx');
  };

  return (
    <Container>
      <Title>Análisis y Recolección de Datos</Title>
      <Content>
        <DataSection>
          <DataBox>
            <DataTitle>Estado</DataTitle>
            <DataText>{status}</DataText>
          </DataBox>
          <DataBox>
            <DataTitle>Temperatura</DataTitle>
            <DataText>{temperature}°</DataText>
          </DataBox>
          <DataBox>
            <DataTitle>Humedad</DataTitle>
            <DataText>{humidity}%</DataText>
          </DataBox>
          <DataBox>
            <DataTitle>CO2</DataTitle>
            <DataText>{co2}ppm</DataText>
          </DataBox>
        </DataSection>
        <ChartContainer>
          <Line data={chartData} options={options} />
          <Button onClick={handleDownloadExcel}>Descargar Datos Excel</Button>
        </ChartContainer>
      </Content>
    </Container>
  );
}

import React, { useEffect, useState } from 'react';

const FMultas = ({ departamento, torre, onNewMultas }) => {
  useEffect(() => {
    const fetchMultas = async () => {
      try {
        const response = await fetch(
          `https://apicondominio-da3y.onrender.com/notificaciones/${departamento}/${torre}`
        );
        const data = await response.json();

        // Notificar al componente padre con todas las multas
        onNewMultas(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchMultas();

    const intervalId = setInterval(fetchMultas, 20000); // Actualizar cada 20 segundos

    return () => clearInterval(intervalId);
  }, [departamento, torre, onNewMultas]);

  return null; // Este componente sigue siendo observador
};

export default FMultas;


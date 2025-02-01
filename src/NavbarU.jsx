import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';

const NavbarU = ({ torre, departamento }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const navigate = useNavigate();

  // Manejar navegación
  const handleNavigate = () => {
    navigate('/VerMultas', {
      state: { torre, departamento },
    });
  };

  const handleNoti = () => {
    navigate('/Notificaciones', {
      state: { torre, departamento },
    });
  };  

  // Alternar el menú de notificaciones
  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  // Eliminar una notificación
  const handleDeleteNotification = async (id) => {
    try {
      const response = await fetch(`https://apicondominio-7jd1.onrender.com/notificaciones/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setNotifications((prev) => prev.filter((notif) => notif._id !== id));
      } else {
        console.error('Error al eliminar la notificación:', await response.json());
      }
    } catch (error) {
      console.error('Error al realizar la solicitud:', error);
    }
  };

  // Obtener notificaciones
  const fetchNotifications = async () => {
    try {
      const response = await fetch(
        `https://apicondominio-7jd1.onrender.com/notificaciones/${departamento}/${torre}`
      );
      const data = await response.json();

      if (Array.isArray(data)) {
        setNotifications(data);
      } else {
        console.error('Formato de datos inesperado:', data);
      }
    } catch (error) {
      console.error('Error al obtener notificaciones:', error);
    }
  };

  useEffect(() => {
    fetchNotifications();

    // Configurar actualización periódica
    const intervalId = setInterval(fetchNotifications, 10000);

    return () => clearInterval(intervalId); // Limpiar el intervalo al desmontar
  }, [departamento, torre]);

  return (
    <>
      <nav className="bg-gray-200 p-4 fixed top-4 left-1/2 transform -translate-x-1/2 w-11/12 max-w-6xl z-10 rounded-2xl shadow-lg">
        <div className="flex justify-between items-center">
          <ul className="flex space-x-6 text-cyan-700">
            <li>
              <a href="/InicioU" className="hover:text-cyan-950 transition" style={{ fontSize: '1.4rem' }}>Inicio</a>
            </li>
            <li>
              <button
                onClick={handleNavigate}
                className="hover:text-cyan-950 transition"
                style={{ fontSize: '1.4rem' }}
              >
                Mis Multas
              </button>
            </li>
            <li>
              <a href="/" className="hover:text-cyan-950 transition" style={{ fontSize: '1.4rem' }}>Login</a>
            </li>
          </ul>

          <button onClick={handleToggle} className="relative">
            <i className="fas fa-bell text-cyan-700" style={{ fontSize: '1.4rem' }}></i>
            {Array.isArray(notifications) && notifications.length > 0 && (
              <span className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                {notifications.length}
              </span>
            )}
          </button>
        </div>
      </nav>

      <div
        className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{ right: isOpen ? '0' : '-100%',  zIndex: 20  }}
      >
        <div className="p-4">
          <h2 className="text-lg font-bold">Notificaciones</h2>
          <button
            onClick={handleToggle}
            className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
          >
            &#x2715;
          </button>
          
          <button
                onClick={handleNoti}
                className="text-blue-500 hover:text-blue-950 transition"
                style={{ fontSize: '1.2rem' }}
              >
                Ver todo
              </button>
          
          <ul className="mt-4 space-y-3">
            {Array.isArray(notifications) && notifications.length === 0 ? (
              <li className="p-2 bg-gray-100 rounded-lg shadow">
                No hay notificaciones nuevas.
              </li>
            ) : (
              Array.isArray(notifications) && notifications.map((notif) => (
                <li
                  key={notif._id}
                  className="p-3 bg-blue-100 text-blue-700 rounded-lg shadow-lg flex justify-between items-center"
                >
                  <div>
                    <p className="font-bold">{notif.motivo}</p>
                    <p>Cantidad: {notif.cantidad}</p>
                    <p className="text-sm text-gray-600">
                      Fecha: {new Date(notif.createdAt).toLocaleString()}
                    </p>
                  </div>
                  <button
                    onClick={() => handleDeleteNotification(notif._id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg transition"
                  >
                    Eliminar
                  </button>
                </li>
              ))
            )}
          </ul>
         
        </div>
      </div>
    </>
  );
};

export default NavbarU;

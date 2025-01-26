import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = ({ onLogin }) => {
  const [telefono, setTelefono] = useState('');
  const [password, setPassword] = useState('');
  const [showWarning, setShowWarning] = useState(false);
  const [loginError, setLoginError] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Inicio de sesión"; // Cambia el título de la página
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!telefono || !password) {
      setShowWarning(true);
      setLoginError('');
    } else {
      setShowWarning(false);
      setLoginError('');

      try {
        const response = await fetch('https://apicondominio-da3y.onrender.com/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            telefono: telefono,
            contrasena: password,
          }),
        });
      
        const data = await response.json();
      
        if (response.ok) {
          console.log('Inicio de sesión exitoso:', data);
      
          // Accede a las propiedades dentro del objeto `user`
          const { tipoUsuario, departamento, torre } = data.user;
      
          if (tipoUsuario) {
            localStorage.setItem('departamento', departamento);
            localStorage.setItem('torre', torre);
            localStorage.setItem('userRole', tipoUsuario);
            console.log(localStorage.getItem('userRole'));
      
            switch (tipoUsuario) {
              case 'Administrador':
                navigate('/Inicio');
                break;
              case 'Dueno':
                navigate('/InicioU');
                break;
              default:
                alert('No tienes permisos para acceder a esta página');
                break;
            }
          } else {
            setLoginError('El campo tipoUsuario no está presente en la respuesta del servidor');
          }
        } else {
          setLoginError('Tu nombre de usuario o contraseña son incorrectos');
          setShowWarning(false);
        }
      } catch (error) {
        console.error('Error al iniciar sesión:', error);
        setLoginError('Hubo un problema con el servidor, por favor intenta más tarde');
      }
      
    }
  };

  const handleRegister = async () => {
    navigate('/Registro');
  };

  return (
    <div className="flex items-center justify-center min-h-screen fondo ">
      <div className='flex flex-col items-center'>
        <div className='logo flex items-center mb-4'></div>
        <div className="w-full max-w-md p-8 space-y-4 bg-neutral-50 rounded-4xl shadow-md">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-800">Inicio de Sesión</h1>
          </div>

          {loginError && (
            <div className="p-4 text-sm text-red-700 bg-red-100 border border-red-400 rounded-md">
              {loginError}
            </div>
          )}

          {showWarning && (
            <div className="p-4 text-sm text-yellow-700 bg-yellow-100 border border-yellow-400 rounded-md">
              Por favor, completa todos los campos.
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="text"
                placeholder="Teléfono"
                className="w-full px-4 py-2 text-gray-700 bg-gray-100 border rounded-4xl focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={telefono}
                onChange={(e) => setTelefono(e.target.value)}
              />
            </div>

            <div>
              <input
                type="password"
                placeholder="Contraseña"
                className="w-full px-4 py-2 text-gray-700 bg-gray-100 border rounded-4xl focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-4xl hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              Iniciar sesión
            </button>
          </form>

          <div className="flex justify-center pt-5 space-x-2">
            <h1 className="text-sm text-gray-700">¿No tienes una cuenta?</h1>
            <button
              onClick={handleRegister}
              className="text-blue-500 hover:underline focus:outline-none"
            > Registrarse
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
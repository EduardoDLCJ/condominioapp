import React, { useState } from 'react';
import { Transition } from '@headlessui/react';

const Notificaciones = ({ message, onDelete }) => {
    const [isShowing, setIsShowing] = useState(true);

    return (
        <div className="fixed top-0 right-0 mt-4 mr-4 z-50">
            <Transition
                show={isShowing}
                enter="transform transition ease-in-out duration-500"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
            >
                <div className="bg-white shadow-lg rounded-lg p-4 flex items-center space-x-4">
                    <div className="flex-1">
                        <p className="text-gray-800">message</p>
                    </div>
                    <button
                        onClick={() => {
                            setIsShowing(false);
                            onDelete();
                        }}
                        className="text-red-500 hover:text-red-700"
                    >
                        Eliminar
                    </button>
                </div>
            </Transition>
        </div>
    );
};

export default Notificaciones;
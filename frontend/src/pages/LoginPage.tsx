import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { Toaster, toast } from 'react-hot-toast';
import { useMutation } from '@tanstack/react-query';
import { loginRequest } from '../api/user';
import { useAuthStore } from '../store/auth.ts';
import Logo from '../assets/back01.png';

const LoginPage = () => {
    const navigate = useNavigate();
    const setToken = useAuthStore((state) => state.setToken);
    const { isAuth } = useAuthStore();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const loginMutation = useMutation({
        mutationFn: () => loginRequest(email, password),
        onSuccess: (response) => {
            setToken(response.data.access, response.data.refresh);  
            navigate("/lista-precios");
        },
        onError: (error) => {
            if (typeof error === 'string') {
                toast.error(error);
            } else {
                toast.error('Hubo un error, intentá de nuevo!');
            }
        },
    });

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        loginMutation.mutate();
    };
      
    if (loginMutation.isLoading) return <p>Cargando...</p>;

    return (
        <div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-black to-fuchsia-950'>
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto">
               <div className="flex items-center mb-6 text-2xl font-semibold  text-gray-900  md:top-0 md:left-0 md:absolute">
                    <img className="w-28 h-28" src={Logo} alt="logo"/>
                    <span className="text-gray-50 text-2xl font-jost">Administración</span>
                </div>
                <div className="w-full md:py-4 sm:w-[500px] bg-slate-50 rounded-lg border-gray-300">
                    <div className="px-4 py-6 space-y-4">
                        <h1 className="text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                            Iniciar Administrador
                        </h1>
                        <form className="space-y-4 " onSubmit={handleSubmit}>
                            <div>
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 ">Email</label>
                                <input
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg  block w-full p-1.5 sm:p-2 md:p-2.5 transition duration-125" placeholder="nombre@empresa.com"/>
                            </div>
                            <div>
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 ">Contraseña</label>
                                <input
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg  block w-full p-1.5 sm:p-2 md:p-2.5 transition duration-125"/>
                            </div>
                            <button type="submit" className="w-full text-white bg-gradient-to-r from-black to-fuchsia-950 hover:bg-white font-medium rounded-lg text-sm px-5 py-2.5 text-center col-start-2">Ingresar</button>
                            
                        </form>
                        
                    </div>
                </div>
                
            </div>
           <Toaster /> 
        </div>
    );
}

export default LoginPage;

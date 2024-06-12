import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Tarefas from './pages/Tarefas';

export default function Rotas(){
    return(
       <BrowserRouter>
           <Routes>
                <Route path="/" element Component={Login}/>
                <Route path="/tarefas" Component={Tarefas}/>
           </Routes>
       </BrowserRouter>
    );
}
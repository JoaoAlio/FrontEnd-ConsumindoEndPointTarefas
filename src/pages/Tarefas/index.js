import React, {useState, useEffect} from 'react';
import './styles.css';
import {Link, useNavigate} from 'react-router-dom';
import api from '../../services/api';

import logoCadastro from '../../assets/lista-de-tarefas.png';
import { FiUserX, FiXCircle, FiEdit } from 'react-icons/fi';

export default function Tarefas(){

    const [nome, setNome] = useState('');
    const [tarefas, setTarefas] = useState([]);

    const email = localStorage.getItem('email');
    const token = localStorage.getItem('token');
    
    const history = useNavigate();

    const authorization = {
        headers: {
            Authorization : `Bearer ${token}`
        }
    }

    useEffect(() => {
        api.get('api/tarefas', authorization).then(
            response => {setTarefas(response.data);
            }, token)
    })

    async function logout(){
        try{
            localStorage.clear();
            localStorage.setItem('token', '');
            authorization.headers = '';
            history('/');
        }catch(error)
        {
           alert('Não foi possivel realizar o logout' + error);
        }
    }

    return(
        <div className="tarefa-container">
            <header>
                <img src={logoCadastro} alt="Cadastro" />
                <span>Bem-vindo, <strong>{email}</strong>!</span>
                <Link className="button" to="tarefa/novo">Nova Tarefa</Link>
                
                <button onClick={logout} type="button">
                    <FiXCircle size={35} color="#17202a"/>
                </button>
            </header>
            <form>
                <input type='text' placeholder="Nome"/>
                <button type="button" class='button'>
                    Filtar tarefa pela descrição (parcial)
                </button>
            </form>
            <h1>Relação de Tarefas</h1>
            <ul>
                {tarefas.map(tarefa => (
                <li key={tarefa.id}>
                <b>Descrição: </b>{tarefa.descricao}<br/><br/>
                <b>Data </b>{tarefa.data}<br/><br/>
                <button type="button">
                <FiEdit size="25" color="#17202a" />
                </button>
                <button type="button">
                <FiUserX size="25" color="#17202a" />
                </button>
                </li>
                ))}
            </ul>
        </div>
        
    );
}
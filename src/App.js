import React, { useState, useEffect } from "react";
import api from "./services/api"
import "./global.css";
import "./App.css";
import "./Sidebar.css";
import "./main.css";

import DevForm from "./components/DevForm/index"
import DevItem from "./components/DevItem/index"
// Componente : Bloco isolado de HTML, CSS e JS, o qual nao interfere no restante da aplicacao
// Propriedade : Informacoes que um componente pai passa para um componente filho
// Estado : informacoes mantidas pelo componente(Lembrar: Imutabilidade)

function App() {
  const [devs, setDevs] = useState([]);
  
  
  useEffect(()=>{
    async function loadDevs(){
      const response = await api.get('/devs')
      setDevs(response.data)
    }
    loadDevs();
  },[])
  async function handleAddDev(data){
    const response = await api.post('/devs',data)

    
    setDevs([...devs, response.data])
  }
  return (
    <div id="app">
      <aside>
        <strong>Cadastrar</strong>
        <DevForm onSubmit={handleAddDev}/>
      </aside>
      <main>
        <ul>
          {devs.map(dev=>(
            <DevItem key={dev._id} dev={dev}/>
          ))}
          
        </ul>
      </main>
    </div>
  );
}

export default App;

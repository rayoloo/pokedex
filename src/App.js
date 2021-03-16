import React, { useEffect, useState} from "react"
import {Row, Col, Layout} from "antd"
import 'antd/dist/antd.css';
import './App.css'
import List from "./List"

function App(){
  const [Pokedex, setPokedex] = useState([])
  var i = 1, clickID, focus=false;
  
  const getPokemons = async () =>{
    const url = "https://pokeapi.co/api/v2/pokemon?limit=898"
    await fetch(url)
      .then(response => response.json())
      .then(response =>{
        console.log("Entire List Fetched", response)
        setPokedex(response.results)   
    })
  }

  //didMount to fetch all the pokemons
  useEffect(() => {
    getPokemons()
  },[])

  //link component to make card clickable
  const dexComponent = Pokedex.map((aPokemon) =>{
    var pid = i
    i++
    return(
    <div>  
      <Col span={2}>
        <List  name={aPokemon.name} id={pid} />
      </Col>
      <br/>
    </div>
    )
  })
  
  const {Header, Content} = Layout
  return (
    <div>
      <Header ><h1 className="App">Pokedex</h1></Header>
      <Row gutter={8}>
        {dexComponent}
      </Row>
    </div>
  )
}

export default App;

import React, { useEffect, useState} from "react"
import {Row, Col, Layout, Popover,Card} from "antd"
import 'antd/dist/antd.css';
import './App.css'
import List from "./List"

function App(){
  const [pokemon, setPokemon] = useState("pikachu");
  const [pokemonData, setPokemonData] = useState([]);
  const [Pokedex, setPokedex] = useState([])
  var i = 1

const imageURL = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/"

  
  const getPokemons = async () =>{
    const url = "https://pokeapi.co/api/v2/pokemon?limit=898"
    await fetch(url)
      .then(response => response.json())
      .then(response =>{
        console.log("Entire List Fetched", response)
        setPokedex(response.results)   
    })
  }

  const getPokemon = async () => {
    try {
      const url = `https://pokeapi.co/api/v2/pokemon/${pokemon}`
      await fetch(url)
      .then(response => response.json())
      .then(response =>{
        setPokemonData(response)   
        console.log("searched: ",response)
    })
    } catch (e) {
      console.log(e)
    }
  };

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
      <Col span={6} >
        <List  name={aPokemon.name} id={pid} />
      </Col>
    </div>
    )
  })
  

  const handleChange = (e) => {
    setPokemon(e.target.value.toLowerCase());
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    getPokemon();
  };



  const {Header} = Layout
  return (
    <div>
      <Header ><h1 className="App">Pokedex</h1></Header>
      <form onSubmit={handleSubmit}>
        <label>
          <input
            type="text"
            onChange={handleChange}
            placeholder="pokemon name or ID"
          />
        </label>
      </form>
      <div style={{margin: "auto", width: "90%"}}>
        <Row justify="center">
          <Col>
          <Popover
            content={
            <div>
              <h4>Pokemon ID: {pokemonData.id}</h4>
              <h4>Pokemon Height : {pokemonData.height * 10} cm // {(10 * pokemonData.height / 30.48).toFixed(2)} ft.</h4>
              <h4>Pokemon Weight : {pokemonData.weight / 10} kg // {(pokemonData.weight*2.2046 / 10).toFixed(2)}lbs</h4>
          </div>} 
            trigger="click" 
            placement="bottom" 
            title={<h1>{pokemonData.name}</h1>} 
        >
            <Card
            bordered
            hoverable
            style={{width:"250px", textAlign:"center", opacity:0.95}}
            cover={<img src={imageURL + pokemonData.id +".png"} alt="failed to fetch" style={{padding:"10px"}}></img> }
            key={pokemonData.id}
            >
                <Card.Meta title={<h3>{pokemonData.name} #{pokemonData.id}</h3>}></Card.Meta>
            </Card>
        </Popover>
          </Col>
        </Row>
      
      </div>
      <hr/>
      <div style={{margin: "auto", width: "90%"}}>
      <Row gutter={[16, 16]} justify="center">
        {dexComponent}
      </Row>
      </div>
    </div>
  )
}

export default App;
/*
<Popover
            content={
            <div>
              <h4>Pokemon ID: {capitalize(this.state.name)}</h4>
              <h4>Pokemon Type(s): {capitalize(this.state.type)}</h4>
              <h4>Pokemon Abilities: {capitalize(this.state.abilities)}</h4>
              <h4>Pokemon Height : {this.state.height * 10} cm // {(10 * this.state.height / 30.48).toFixed(2)} ft.</h4>
              <h4>Pokemon Weight : {this.state.weight / 10} kg // {(this.state.weight*2.2046 / 10).toFixed(2)}lbs</h4>
          </div>} 
            trigger="click" 
            placement="bottom" 
            title={<h1>{capitalize(this.state.name)}</h1>} 
        >
            <Card
            bordered
            hoverable
            style={{width:"250px", textAlign:"center", opacity:0.95, backgroundColor:colors[this.state.colour]}}
            cover={<img src={imageURL + this.state.id +".png"} alt="failed to fetch" style={{padding:"10px"}}></img> }
            key={this.state.id}
            loading={this.state.loading}
            >
                <Card.Meta title={<h3>{capitalize(this.state.name)} #{this.state.id}</h3>}></Card.Meta>
            </Card>
        </Popover>
*/
import React, { useEffect, useState} from "react"
import {Row, Col, Layout, Popover,Card} from "antd"
import 'antd/dist/antd.css';
import './App.css'
import List from "./List"

function App(){
  const [pokemon, setPokemon] = useState("pikachu");
  const [pokemonData, setPokemonData] = useState([]);
  const [pokemontype1, setPokemonType] = useState("");
  const [pokemontypes, setPokemonTypes] = useState("");
  const [pokemonAB, setPokemonAB] = useState("");
  const [Pokedex, setPokedex] = useState([])
  var i = 1
  const imageURL = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/"
  const colors = {
    fire: '#EE8130',
    grass: '#7AC74C',
    electric: '#F7D02C',
    water: '#6390F0',
    ground: '#E2BF65',
    rock: '#B6A136',
    poison: '#A33EA1',
    bug: '#A6B91A',
    dragon: '#6F35FC',
    psychic: '#F95587',
    flying: '#A98FF3',
    fighting: '#C22E28',
    normal: '#A8A77A',
    ice: '#96D9D6',
    ghost: '#735797',
    dark: '#705746',
    steel: "#B7B7CE",
    fairy: "#D685AD"
}

  
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
        setPokemonType(response.types[0].type.name)
        if(response.types.length > 1){
          setPokemonTypes(response.types[0].type.name +", "+ response.types[1].type.name)
      }
      else{
          setPokemonTypes(response.types[0].type.name)
      }
      var i, ab
      if (response.abilities.length > 1){
          for(i = 0;i <response.abilities.length;i++){
              if(i === (response.abilities.length-1)){
                  ab += response.abilities[i].ability.name
              }
              else{
                  ab = response.abilities[i].ability.name + ", "
              }
          }
      }
      else
          ab = response.abilities[0].ability.name
          setPokemonAB(ab)
        setPokemonData(response)   
        console.log("Single Pokemon Fetched: ",response)
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
            placeholder="Pokemon name or ID"
          />
        </label>
      </form>
      <div style={{display: pokemonData.name ? 'block' : 'none' }}>
        <Row justify="center">
          <Col>
            <Popover
              content={
                <div>
                  <h4>Pokemon ID: {pokemonData.id}</h4>
                  <h4>Pokemon Type(s): {pokemontypes.replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase())))}</h4>
                  <h4>Pokemon Abilities: {pokemonAB.replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase())))}</h4>
                  <h4>Pokemon Height : {pokemonData.height * 10} cm // {(10 * pokemonData.height / 30.48).toFixed(2)} ft.</h4>
                  <h4>Pokemon Weight : {pokemonData.weight / 10} kg // {(pokemonData.weight*2.2046 / 10).toFixed(2)}lbs</h4>
              </div>
              } 
              trigger="click" 
              placement="bottom" 
              title={<h1>{pokemonData.name ? pokemonData.name[0].toUpperCase()+ pokemonData.name.slice(1) : null}</h1>} 
            >
              <Card
                style={{width:"250px", textAlign:"center", opacity:0.95, backgroundColor:colors[pokemontype1]}}
                cover={<img src={imageURL + pokemonData.id +".png"} alt="failed to fetch" style={{padding:"10px"}}></img> }
                key={pokemonData.id}
              >
                <Card.Meta title={<h3>{pokemonData.name ? pokemonData.name[0].toUpperCase()+ pokemonData.name.slice(1) : null}</h3>}></Card.Meta>
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
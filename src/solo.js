import React, { useState } from "react";
import {Popover,Card} from "antd"
import './App.css'

function Solo() {
    const [pokemon, setPokemon] = useState("pikachu");
    const [pokemonData, setPokemonData] = useState([]);
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
    var hidden = true, type1

    const getPokemon = async () => {
        try {
            const url = `https://pokeapi.co/api/v2/pokemon/${pokemon}`
            await fetch(url)
            .then(response => response.json())
            .then(response =>{
            type1 = response.types[0].type.name
            setPokemonData(response)   
            console.log("searched: ",response)
        })
        } 
        catch (e) {
            console.log(e)
        }
    }

    const handleChange = (e) => {
        setPokemon(e.target.value.toLowerCase())
    }
    
    const handleSubmit = (e) => {
        hidden = false
        e.preventDefault()
        getPokemon()
    }

    return (
        <div className="App">
        <form onSubmit={handleSubmit}>
        <label>
          <input
            type="text"
            onChange={handleChange}
            placeholder="pokemon name or ID"
          />
        </label>
      </form>
      <div style={hidden ? { display:"block" } : {display:"none"}}>
        <Row justify="center">
          <Col>
          <Popover
            trigger="click" 
            placement="bottom" 
            title={<h1>{pokemonData.name}</h1>} 
            content={
            <div>
              <h4>Pokemon ID: {pokemonData.id}</h4>
                <h4>Pokemon Type(s): {}</h4>
                <h4>Pokemon Abilities: {pokemonData.abilities}</h4>
                <h4>Pokemon Height : {pokemonData.height * 10} cm // {(10 * pokemonData.height / 30.48).toFixed(2)} ft.</h4>
                <h4>Pokemon Weight : {pokemonData.weight / 10} kg // {(pokemonData.weight*2.2046 / 10).toFixed(2)}lbs</h4>
            </div>
            }
            
        >
            <Card
            bordered
            hoverable
            style={{width:"250px", textAlign:"center", opacity:0.95, backgroundColor:colors[type1]}}
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
    </div>
    )
}

export default Solo
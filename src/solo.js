import React, { useState } from "react";
import './App.css'

function Solo(props) {
    const [pokemon, setPokemon] = useState("pikachu");
    const [pokemonData, setPokemonData] = useState([]);
    //const [pokemonType, setPokemonType] = useState("");

    function handleChange(e){
        setPokemon(e.target.value.toLowerCase())
    }

    function handleSubmit(e) {
        e.preventDefault()
        getPokemon()
    }

    const getPokemon = () => {
        var url = `https://pokeapi.co/api/v2/pokemon/${pokemon}`
        try {
            if(props > 0)
                url = `https://pokeapi.co/api/v2/pokemon/${props}`
            fetch(url)
            .then(response => response.json())
            .then(data =>{
                console.log(data)
                setPokemonData(data)
                console.log("filled",pokemonData)
            })
        } catch (e) {
            console.log(e)
        }
    }

    const renderPokemon = () =>{
        return(
            <div className="container">
                <img src={pokemonData.sprites["other"]["official-artwork"]} alt="failed images" />
                <div className="divTable">
                    <div className="divTableBody">
                        <div className="divTableRow">
                            <div className="divTableCell">Pokemon</div>
                            <div className="divTableCell">{pokemonData.name}</div>
                        </div>
                        <div className="divTableRow">
                            <div className="divTableCell">Type</div>
                            <div className="divTableCell">{pokemonData.types}</div>
                        </div>
                        <div className="divTableRow">
                            <div className="divTableCell">Height (cm)</div>
                            <div className="divTableCell">{Math.round(pokemonData.height * 10)}"</div>
                        </div>
                        <div className="divTableRow">
                            <div className="divTableCell">Weight (kg)</div>
                            <div className="divTableCell">{Math.round(pokemonData.weight / 10)} lbs</div>
                        </div>
                        <div className="divTableRow">
                            <div className="divTableCell">Abilities</div>
                            <div className="divTableCell">{pokemonData.abilities.ability}</div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="App">
        <form onSubmit={handleSubmit}>
            <label>
            <input
                type="text"
                onChange={handleChange}
                placeholder="Pokemon Name or ID"
            />
            </label>
        </form>
        {renderPokemon}
        </div>
    )
}

export default Solo
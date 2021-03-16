import React from 'react'
import {Card, Popover} from "antd"
import 'antd/dist/antd.css';

export default class List extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            name:"",
            id:this.props.id,
            colour:"",
            type:"",
            abilities:"",
            height:0,
            weight:0, 
            loading: true
        }
    }

    async componentDidMount(){
        const {id} = this.state
        const url = `https://pokeapi.co/api/v2/pokemon/${id}`
        await fetch(url)
        .then(response => response.json())
        .then(response =>{
            if(response.types.length > 1){
                this.setState({
                    type : response.types[0].type.name +", "+ response.types[1].type.name
                })              
            }
            else{
                this.setState({
                    type : response.types[0].type.name
                }) 
            }
            var i, ab
            for(i = 0;i <response.abilities.length;i++){
                if(i === (response.abilities.length-1)){
                    ab += response.abilities[i].ability.name
                }
                else{
                    ab = response.abilities[i].ability.name + ", "
                }
            }
            this.setState({
                name:response.name,
                colour:response.types[0].type.name,
                abilities:ab,
                height:response.height,
                weight:response.weight,
                loading: false
            }) 
        })

    }

    render(){
        const imageURL = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/"
        const myString = this.props.name
        const res = myString.replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase())))
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

        const content = (
            <div>
                <h4>Pokemon ID: {this.state.id}</h4>
                <h4>Pokemon Type(s): {this.state.type}</h4>
                <h4>Pokemon Abilities: {this.state.abilities}</h4>
                <h4>Pokemon Height : {this.state.height * 10} cm // {(10 * this.state.height / 30.48).toFixed(2)} ft.</h4>
                <h4>Pokemon Weight : {this.state.weight / 10} kg // {(this.state.weight*2.2046 / 10).toFixed(2)}lbs</h4>
            </div>
        )

        function capitalize(str){
            return str.replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase())))
        }

    return (
        <Popover
            content={content} trigger="click" placement="bottom" title={<h1>{capitalize(this.state.name)}</h1>} 
        >
            <Card
            hoverable
            style={{width:317, opacity:0.95, backgroundColor:colors[this.state.colour]}}
            cover={<img src={imageURL + this.state.id +".png"} alt="failed" style={{padding:"10px"}}></img> }
            key={this.state.id}
            loading={this.state.loading}
            >
                <Card.Meta title={<h3>{res} #{this.state.id}</h3>}></Card.Meta>
            </Card>
        </Popover>
    )
    }
}


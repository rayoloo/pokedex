import React, { useState } from 'react'
import { Row, Col, Modal, Card, Drawer, Button } from 'antd'
import 'antd/dist/antd.css'
import './App.css'
import List from './List'
import { imageURL, colors } from './Data'
import logo from './logo.webp'
const pokeData = require('./pokeData.json')

export default function App() {
	const [pokemon, setPokemon] = useState('pikachu')
	const [pokemonData, setPokemonData] = useState([])
	const [pokeStat, setPokeStat] = useState([])
	const [pokemontype1, setPokemonType] = useState('')
	const [pokemontypes, setPokemonTypes] = useState('')
	const [pokemonAB, setPokemonAB] = useState('')
	const [Pokedex] = useState(pokeData.results)
	const [visible, setVisible] = useState(false)
	const [isModalVisible, setIsModalVisible] = useState(false)
	var i = 1

	const showDrawer = () => {
		setVisible(true)
	}
	const onClose = () => {
		setVisible(false)
	}

	const showModal = () => {
		setIsModalVisible(true)
	}
	const handleCancel = () => {
		setIsModalVisible(false)
	}

	const getPokemon = async () => {
		try {
			const url = `https://pokeapi.co/api/v2/pokemon/${pokemon}`
			await fetch(url)
				.then(response => response.json())
				.then(response => {
					setPokemonType(response.types[0].type.name)
					if (response.types.length > 1) {
						setPokemonTypes(
							response.types[0].type.name + ', ' + response.types[1].type.name,
						)
					} else {
						setPokemonTypes(response.types[0].type.name)
					}
					var i, ab
					if (response.abilities.length > 1) {
						for (i = 0; i < response.abilities.length; i++) {
							if (i === response.abilities.length - 1) {
								ab += response.abilities[i].ability.name
							} else {
								ab = response.abilities[i].ability.name + ', '
							}
						}
					} else ab = response.abilities[0].ability.name
					setPokemonAB(ab)
					setPokemonData(response)
					console.log('Single Pokemon Fetched: ', response)
					setPokeStat([
						response.stats[0].base_stat,
						response.stats[1].base_stat,
						response.stats[2].base_stat,
						response.stats[3].base_stat,
						response.stats[4].base_stat,
						response.stats[5].base_stat,
					])
				})
		} catch (e) {
			console.log(e)
		}
	}

	const dexComponent = Pokedex.map(aPokemon => {
		var pid = i
		i++
		return (
			<div>
				<Col span={6}>
					<List name={aPokemon.name} id={pid} />
				</Col>
			</div>
		)
	})

	const handleChange = e => {
		setPokemon(e.target.value.toLowerCase())
	}

	const handleSubmit = e => {
		e.preventDefault()
		getPokemon()
	}

	return (
		<div>
			<h1 className='PokedexTitle'>
				<img src={logo}></img>
			</h1>
			<Drawer
				title='More Information'
				placement='right'
				closable={false}
				onClose={onClose}
				visible={visible}>
				<p>Created by Raymond Lam</p>
				<p>Data From PokeAPI.co </p>
			</Drawer>
			<div style={{ margin: '0 auto', width: '50%', textAlign: 'center' }}>
				<Button type='primary' onClick={showDrawer}>
					Details
				</Button>
				<br />
				<br />
				<form onSubmit={handleSubmit}>
					<label>
						<input
							style={{
								boxSizing: 'border-box',
								fontSize: '2rem',
								margin: 'auto',
								textAlign: 'center',
							}}
							type='text'
							onChange={handleChange}
							placeholder='Pokemon name or ID'
						/>
					</label>
				</form>
			</div>
			<div style={{ display: pokemonData.name ? 'block' : 'none' }}>
				<Row justify='center'>
					<Col>
						<Card
							style={{
								width: '250px',
								textAlign: 'center',
								opacity: 0.95,
								backgroundColor: colors[pokemontype1],
							}}
							cover={
								<img
									src={imageURL + pokemonData.id + '.png'}
									alt='failed to fetch'
									style={{ padding: '10px' }}
								/>
							}
							key={pokemonData.id}
							onClick={showModal}>
							<Card.Meta
								title={
									<h3>
										{pokemonData.name
											? pokemonData.name[0].toUpperCase() +
											  pokemonData.name.slice(1)
											: null}
									</h3>
								}></Card.Meta>
						</Card>
					</Col>
				</Row>
				<Modal
					title={
						pokemonData.name
							? pokemonData.name[0].toUpperCase() + pokemonData.name.slice(1)
							: null
					}
					visible={isModalVisible}
					closable='false'
					maskClosable='true'
					onCancel={handleCancel}
					footer={[
						<Button key='back' onClick={handleCancel}>
							Close
						</Button>,
					]}>
					<div>
						<img
							src={imageURL + pokemonData.id + '.png'}
							alt='failed to fetch'
							style={{ padding: '10px' }}
						/>
						<h4>Pokemon ID: {pokemonData.id}</h4>
						<h4>
							Pokemon Type(s):{' '}
							{pokemontypes.replace(/\w\S*/g, w =>
								w.replace(/^\w/, c => c.toUpperCase()),
							)}
						</h4>
						<h4>
							Pokemon Abilities:{' '}
							{pokemonAB.replace(/\w\S*/g, w =>
								w.replace(/^\w/, c => c.toUpperCase()),
							)}
						</h4>
						<h4>
							Pokemon Height : {pokemonData.height * 10} cm //{' '}
							{((10 * pokemonData.height) / 30.48).toFixed(2)} ft.
						</h4>
						<h4>
							Pokemon Weight : {pokemonData.weight / 10} kg //{' '}
							{((pokemonData.weight * 2.2046) / 10).toFixed(2)}lbs
						</h4>
						<div style={{ backgroundColor: '#989898' }}>
							<div
								role='progressbar'
								style={{
									width: 100 * (pokeStat[0] / 255) + '%',
									backgroundColor: colors[pokemontype1],
								}}>
								HP:{pokeStat[0]}
							</div>
						</div>
						<br />
						<div style={{ backgroundColor: '#989898' }}>
							<div
								role='progressbar'
								style={{
									width: 100 * (pokeStat[1] / 255) + '%',
									backgroundColor: colors[pokemontype1],
								}}>
								ATK: {pokeStat[1]}
							</div>
						</div>
						<br />
						<div style={{ backgroundColor: '#989898' }}>
							<div
								role='progressbar'
								style={{
									width: 100 * (pokeStat[2] / 255) + '%',
									backgroundColor: colors[pokemontype1],
								}}>
								DEF: {pokeStat[2]}
							</div>
						</div>
						<br />
						<div style={{ backgroundColor: '#989898' }}>
							<div
								role='progressbar'
								style={{
									width: 100 * (pokeStat[3] / 255) + '%',
									backgroundColor: colors[pokemontype1],
								}}>
								SpAtk: {pokeStat[3]}
							</div>
						</div>
						<br />
						<div style={{ backgroundColor: '#989898' }}>
							<div
								role='progressbar'
								style={{
									width: 100 * (pokeStat[4] / 255) + '%',
									backgroundColor: colors[pokemontype1],
								}}>
								SpDef: {pokeStat[4]}
							</div>
						</div>
						<br />
						<div style={{ backgroundColor: '#989898' }}>
							<div
								role='progressbar'
								style={{
									width: 100 * (pokeStat[5] / 255) + '%',
									backgroundColor: colors[pokemontype1],
								}}>
								Spd: {pokeStat[5]}
							</div>
						</div>
					</div>
				</Modal>
			</div>
			<hr />
			<div style={{ margin: 'auto', width: '90%' }}>
				<Row gutter={[16, 16]} justify='center'>
					{dexComponent}
				</Row>
			</div>
		</div>
	)
}

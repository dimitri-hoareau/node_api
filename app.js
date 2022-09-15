const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const favicon = require('serve-favicon')
const {success, getUniqueId} = require('./helper.js')
let pokemons = require('./mock-pokemons')

const app = express()
const port  = 3000

app
    .use(favicon(__dirname + '/favicon.ico'))
    .use(morgan('dev'))
    .use(bodyParser.urlencoded({ extended: true }));


app.get('/', (req, res) => res.send('Hello, express'))

app.get('/api/pokemons/:id', (req, res) => {
    const id = parseInt(req.params.id, 10)
    const pokemon = pokemons.find(pokemon => pokemon.id === id)
    const message = 'Un polémon a bien été trouvé'
    res.json(success(message, pokemon))
})

app.get('/api/pokemons', (req, res) => {
    const message = `il y a ${pokemons.length} pokemons !`
    res.json(success(message, pokemons))
})

app.post('/api/pokemons', (req, res) => {
    const id = getUniqueId(pokemons) 
    const pokemonCreated = { ...req.body, ...{id : id, created: new Date()}}
    pokemons.push(pokemonCreated)
    const message = `Le pokemon ${pokemonCreated.name} a été crée !`
    res.json(success(message, pokemonCreated))
})

app.put('/api/pokemons/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const pokemonUpdated = { ...req.body, id : id}
    pokemons = pokemons.map(pokemon => {
        return pokemon.id === id ? pokemonUpdated : pokemon
    })
    const message = `Le pokemon ${pokemonUpdated.name} a été modifié!`
    res.json(success(message, pokemonUpdated))
})

app.delete('/api/pokemons/:id', (req, res) => {

    const id = parseInt(req.params.id)
    const pokemonDeleted = pokemons.find(pokemon => pokemon.id === id)
    pokemons.filter(pokemon => pokemon.id !== id)
    const message = `Le pokemon ${pokemonDeleted.name} a été supprimé!`
    res.json(success(message, pokemonDeleted))
})

app.listen(port, () => console.log(`application démarrée sur le port : ${port}`))
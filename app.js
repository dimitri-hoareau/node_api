const express = require('express')
const morgan = require('morgan')
const favicon = require('serve-favicon')
const {success} = require('./helper.js')
let pokemons = require('./mock-pokemons')

const app = express()
const port  = 3000

app
    .use(favicon(__dirname + '/favicon.ico'))
    .use(morgan('dev'))

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

app.listen(port, () => console.log(`application démarrée sur le port : ${port}`))
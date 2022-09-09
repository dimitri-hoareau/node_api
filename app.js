const express = require('express')
let pokemons = require('./mock-pokemons')

const app = express()
const port  = 3000
app.get('/', (req, res) => res.send('Hello, express'))

app.get('/api/pokemons/:id', (req, res) => {
    const id = parseInt(req.params.id, 10)
    const pokemon = pokemons.find(pokemon => pokemon.id === id)
    res.send(`Hello, pokemon ${pokemon.name} !`)

})

app.listen(port, () => console.log(`application démarrée sur le port : ${port}`))
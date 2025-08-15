require('dotenv').config()
const express = require('express')
const app = express()
const morgan = require('morgan')
const Person = require('./models/person')

app.use(express.json())
app.use(express.static('dist'))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :object'))

morgan.token('object', function(req, res) {
    return JSON.stringify(req.body)
})

app.get('/api/persons', (req, res) => {
    Person.find({}).then(people => {
        res.json(people)
    })
})

app.post('/api/persons', (req, res) => {
    if (!req.body.name || !req.body.number) {
        return res.status(400).json({error:'name or number missing'})
    }
    const person = new Person({
        name: req.body.name,
        number: req.body.number
    })
    
    person.save().then(savedPerson => {
        res.status(201).json(savedPerson)
    })
})

    /*if(persons.find(object => object.name === person.name)) {
        return res.status(400).json({
            error: 'name must be unique'
        })
    }
    person.id = String(Math.floor(Math.random()*10000))
    persons = persons.concat(person)
    res.json(person)
  })*/

app.get('/api/persons/:id', (req, res) => {
    const id = req.params.id
    const person = persons.find(person => person.id === id)
    if (person) {
        res.json(person)
    } else {
        res.status(404).end()
    }
})

app.get('/info', (req, res) => {
    res.send(`<p>Phonebook has info for ${persons.length} people <br/> ${Date()}</p>`)
})

app.delete('/api/persons/:id', (req, res) => {
    const id = req.params.id
    persons = persons.filter(person => person.id !== id)
    res.status(204).end()
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`)
})


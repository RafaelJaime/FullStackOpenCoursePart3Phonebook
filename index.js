const express = require('express')
const app = express()
app.use(express.static('dist'))
var morgan = require('morgan')
const cors = require('cors')
app.use(express.json())
app.use(morgan('tiny'))
morgan.token('body', req => {
  return JSON.stringify(req.body)
})
app.use(
  morgan(':method :url :status :res[content-length] - :response-time ms :body')
)

app.use(cors())

let persons = [
  {
    id: 1,
    name: 'Arto Hellas',
    number: '040-123456',
  },
  {
    id: 2,
    name: 'Ada Lovelace',
    number: '39-44-5323523',
  },
  {
    id: 3,
    name: 'Dan Abramov',
    number: '12-43-234345',
  },
  {
    id: 4,
    name: 'Mary Poppendieck',
    number: '39-23-6423122',
  },
]

app.get('/api/persons', (request, response) => {
  response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const person = persons.find(person => person.id === id)
  if (person) {
    response.json(person)
  } else {
    response.status(404).end()
  }
})

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter(note => note.id !== id)

  response.status(204).end()
})

app.post('/api/persons', (request, response) => {
  const body = request.body
  console.log(request.body)
  if (!body || !body.name || !body.number) {
    return response.status(400).json({
      error: 'Missing properties name or number',
    })
  }

  const nameExists = persons.find(person => person.name === body.name)
  if (nameExists) {
    return response.status(400).json({
      error: 'name must be unique',
    })
  }

  const generateId = () => {
    return Math.floor(Math.random() * 10000)
  }
  const newPerson = {
    id: generateId(),
    name: body.name,
    number: body.number,
  }
  persons = persons.concat(newPerson)

  response.json(newPerson)
})

app.get('/info', (request, response) => {
  response.send(
    `<p>Phonebook has info for ${persons.length} people</p><p>${new Date()}</p>`
  )
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

import axios from 'axios'
const baseURL = 'http://localhost:3001/persons'

const getAll = () => {
    const request = axios.get(baseURL)
    return request.then(response => response.data)
}

const create = (person) => {
    const request = axios.post(baseURL, person)
    return request.then(response => response.data)
}

const del = (id) => {
    const request = axios.delete(`${baseURL}/${id}`)
    return request.then(response => response.data)
}

const findPerson = (id) => {
    const request = axios.get(`${baseURL}/${id}`)
    return request.then(response => response.data)
}


const replaceNumber = (changedPerson) => {
    const request = axios.put(`${baseURL}/${changedPerson.id}`, changedPerson)
    return request.then(response => response.data)
}


export default { getAll, create, del, findPerson, replaceNumber }

/*
const getAll = () => (axios.get(baseURL))

const create = (person) => (axios.post(baseURL, person))

const del = (id) => (axios.delete(`${baseURL}/${id}`))

const findPerson = (id) => (axios.get(`${baseURL}/${id}`))

const replaceNumber = (changedPerson) => (axios.put(`${baseURL}/${changedPerson.id}`, changedPerson))*/
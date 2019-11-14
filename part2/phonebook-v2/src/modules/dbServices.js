import React from 'react';
import axios from 'axios';

const baseUrl = '/api/persons';

const readAll = () => {
    const request = axios.get(baseUrl);
    return request.then(response => response.data)
}

const addContact = newObject => {
    const request = axios.post(baseUrl, newObject);
    return request.then(response => response.data)
}

const deleteContact = (id) => {    
    const request = axios.delete(baseUrl + `/${id}`)
    return request.then(response => response.data)
}

const updateContact = (newObj) => {
    const request = axios.put(baseUrl + `/${newObj.id}`, newObj)
    return request.then(response => response.data)
}
export default {readAll, addContact, deleteContact, updateContact}
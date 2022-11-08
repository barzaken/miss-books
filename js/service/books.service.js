'use strict'

import gBooks from '../../books.json' assert {type: 'json'};
import { storageService } from './async-storage.service.js';


const BOOKS_KEY = 'booksDb'

const books = _createBooks()

function _createBooks(){
    let books = localStorage.getItem(BOOKS_KEY)
    if(!books){
        books = gBooks
        localStorage.setItem(BOOKS_KEY, JSON.stringify(books))
    } 
    return books
}

export const bookService = {
    query,
    get,
    addReview,
    removeReview,
    getBooksFromApi,
    addBook,
    
}

function getBooksFromApi(input){
    return fetch(`https://www.googleapis.com/books/v1/volumes?printType=books&q=${input}`)
                    .then((data) => fetch(data.url))
                    .then((res) => res.json())
}


function query(){
    return storageService.query(BOOKS_KEY)
}

function addBook(book){
    return storageService.post(BOOKS_KEY,book,false)
}


function addReview(book,review){
    review.id = storageService._makeId()
    return storageService.get(BOOKS_KEY,book.id).then(book =>{
        if(!book.reviews) book.reviews = [] 
        book.reviews.push(review)
        storageService.put(BOOKS_KEY,book)
        return Promise.resolve(book)
    })
}

function removeReview(book,reviewId){
    return storageService.get(BOOKS_KEY,book.id).then(book =>{
        const idx = book.reviews.findIndex(review => review.id === reviewId)
        book.reviews.splice(idx,1)
        storageService.put(BOOKS_KEY,book)
        return Promise.resolve(book)
    })
}

function get(id){
    return storageService.get(BOOKS_KEY,id)
}
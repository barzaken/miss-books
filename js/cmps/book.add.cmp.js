import { bookService } from "../service/books.service.js"
import optionPreview from "./option.preview.cmp.js"
import { eventBus } from "../service/event-bus.service.js"

export default {
    template: `
    <div className="book-add">
        <h3>Search book</h3>
        <input @input="getBooks" type="search" v-model="userInput">
        <ul className="book-option">
            <option-preview  v-for="(book,idx) in books" @add="addBook" :key="book.id" :book="book" :idx="idx"/>
        </ul>
    </div>`
    ,
    data() {
        return {
            userInput:'',
            books:[]
        }
    },
    methods:{
        getBooks(){
            bookService.getBooksFromApi(this.userInput).then(books => this.books = books.items)
        },
        addBook(idx){
            let book = this.books[idx+1]
            console.log(book)
            let newBook = {
                thumbnail: book.volumeInfo.imageLinks.thumbnail,
                title: book.volumeInfo.title,
                pageCount:200,
                subtitle: book.volumeInfo.subtitle,
                authors: book.volumeInfo.authors || '',
                publishedDate: book.volumeInfo.publishedDate,
                description: '',
                categories: book.volumeInfo.categories,
                language: book.volumeInfo.language,
                listPrice:{amount:0 , currencyCode:"EUR"}
            }
            bookService.addBook(newBook).then(eventBus.emit('book-added'))
        }

    },
    components:{
        optionPreview
    }

}

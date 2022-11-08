
import { bookService } from "../service/books.service.js"

import bookFilter from "../cmps/book.filter.cmp.js"
import bookList from "../cmps/book.list.cmp.js"
import bookAdd from "../cmps/book.add.cmp.js"
import { eventBus } from "../service/event-bus.service.js"

export default {
    template:`
    <div className="main-app">

        <book-filter @filtered="setFilter"/>
        <book-add />
        <book-list v-if="books" :books="booksToShow" @selected="selectBook"/>
        <router-view></router-view>
    </div>`,
    data(){
        return{
            books: [],
            filterBy: { txt: '', fromPrice: 0, toPrice: Infinity },
        }
    },
    methods:{
        setFilter(filter){
            this.filterBy = filter
        },
        selectBook(bookId){
            this.$router.push(`/book/${bookId}`)
        },
        getBooks(){
            console.log("here")
            bookService.query().then(books => this.books = books)
            console.log(this.books);
        }

    },
    computed:{
        booksToShow(){
            const regex = new RegExp(this.filterBy.txt,'i')
            return this.books.filter(book => regex.test(book.title) && book.listPrice.amount >= this.filterBy.fromPrice && book.listPrice.amount <= this.filterBy.toPrice )
        }

    },
    created(){
        bookService.query().then(books => this.books = books)
        eventBus.on('book-added', this.getBooks)
    },
    components:{
        bookFilter,
        bookList,
        bookAdd
    }
}
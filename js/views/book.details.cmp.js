import { bookService } from "../service/books.service.js"
import bookReview from "../cmps/book.review.cmp.js"

export default {
    template: `
    <section v-if="book" className="book-details">
        <div className="book-show">
            <img :src="book.thumbnail">
            <h1>{{book.title}}</h1>
            <h2>{{book.subtitle}}</h2>
            <h3>{{book.publishedDate}} {{bookStatusByDate}}</h3>
            <h3>{{book.description}}</h3>
            <h3>{{book.language}}</h3>
            <h3 :class="getClassByPrice">{{formatPrice}}</h3>
            <h3 v-if="book.listPrice.isOnSale">SALE!</h3>
            <button className="exit-btn" @click="$router.push('/book')">X</button>
        </div>
        <book-review />
    </section>`,
    created() {
        const bookId = this.$route.params.id
        bookService.get(bookId).then(book => this.book = book)
    },
    data() {
        return {
            book: null,
        }
    },
    computed: {
        readingLevel() {
            if (this.book.pageCount < 100) return 'light Reading'
            if (this.book.pageCount > 500) return 'Long Reading'
            if (this.book.pageCount > 200) return 'Decent Reading'
        },
        bookStatusByDate() {
            let currTime = new Date()
            if ((currTime.getFullYear() - this.book.publishedDate) > 10) return 'Veteran Book'
            if ((currTime.getFullYear() - this.book.publishedDate) <= 1) return 'New!'

        },
        formatPrice() {
            return Intl.NumberFormat('en-IN', { style: 'currency', currency: `${this.book.listPrice.currencyCode}` }).format(this.book.listPrice.amount);
        },
        getClassByPrice() {
            if (this.book.listPrice.amount < 20) return 'cheap'
            if (this.book.listPrice.amount > 150) return 'expensive'
        },
    },
    components:{
        bookReview
    }
}
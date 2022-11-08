import reviewAdd from "./review.add.cmp.js"
import { bookService } from "../service/books.service.js"
import { eventBus } from "../service/event-bus.service.js"

export default {
    propres: ['book'],
    template: `
            <div className="book-review">
            <review-add @reviewed="addReview" />
            <div v-if="bookReviews" className="reviews-cards">
                <h1>REVIEWS</h1>
                <div v-for="rev in bookReviews " className="review-card">
                    <h2>Name: {{rev.name}}</h2>
                    <h3>Rating: {{rev.rating}}</h3>
                    <h3>Read at: {{rev.date}}</h3>
                    <h2>Review: {{rev.text}}</h2>
                    <button @click="removeReview(rev.id)">Delete</button>
                </div>
            </div>
        </div>`,
    data() {
        return {
            bookReviews: [],
        }
    },
    created() {
        const bookId = this.$route.params.id
        bookService.get(bookId).then(book => {
            this.bookReviews = book.reviews
            this.book = book
        }
        )

    },
    methods: {
        addReview(review) {
            if (!review.name || !review.rating || !review.date || !review.text) {
                let msg = {txt:"You must fill all the fields" , type:"failed"}
                eventBus.emit('user-msg',msg)
                return
            }
            bookService.addReview(this.book, review).then(book => {
                let msg = { txt: `Review Added`, type: "success" }
                eventBus.emit('user-msg', msg)
                this.bookReviews = book.reviews
            })
        },
        removeReview(id){
            bookService.removeReview(this.book,id).then(book => this.bookReviews = book.reviews)
            let msg = {txt:`Review #${id} was removed!` , type:"success"}
            eventBus.emit('user-msg',msg)
        }

        },
        components: {
            reviewAdd,
        }
    }
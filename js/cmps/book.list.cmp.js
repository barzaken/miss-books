
import bookPreview from "./book.preview.cmp.js"

export default{
    props:['books'],
    template:`
            <div className="books-list">
                <ul>
                    <li v-for="book in books" 
                    @click="selectBook(book.id)"> 
                    <book-preview :book="book" :key="book.id"/> </li>
                </ul>
            </div>`,
    methods:{
        selectBook(bookId){
            this.$emit('selected',bookId)
        }
    },
    components:{
        bookPreview
    }
}
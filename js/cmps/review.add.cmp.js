export default{
    template:`
                <form>
                <h1>Add Your Review</h1>
                <label>
                    Full Name
                    <input v-model="review.name" type="text">
                </label>
                <label>
                    Rate This Book
                    <select v-model="review.rating">
                        <option value="5">My favourite</option>
                        <option value="4">Excellent</option>
                        <option value="3">Great</option>
                        <option value="2">Not that good</option>
                        <option value="1">Not Recomended</option>
                    </select>
                </label>
                <label>
                    Read At
                    <input v-model="review.date" type="date">
                </label>
                <label>
                    <textarea v-model="review.text" placeholder="This is the _ Book..." rows="10" cols="50"></textarea>
                </label>
                <button @click.prevent="addReview">Add Review</button>
            </form>`,
    datat(){
        return{
            review:null
        }
    },
    created(){
        this.review = {name:null,rating:null,date:new Date().toISOString().slice(0,10),text:null}
    },
    methods:{
        addReview(){
            this.$emit('reviewed',{...this.review})
        }
    }
}
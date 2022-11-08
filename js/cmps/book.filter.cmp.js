export default {
    template: `
    <section className="book-filter">
        <input class="search-input" v-model="filterBy.txt" @input="filter" type="text" placeholder="e.g Harry Potter">
        <label for="minPrice">Min Price</label>
        <input v-model="filterBy.fromPrice" @input="filter" type="range" id="minPrice" :title="filterBy.fromPrice">
        <label for="maxPrice">Max Price</label>
        <input v-model="filterBy.toPrice" @input="filter" :min="filterBy.fromPrice" max="400" type="range" id="maxPrice" :title="filterBy.toPrice">
      
    </section>`
    ,
    data() {
        return {
            filterBy: { txt: '', fromPrice: 0, toPrice: Infinity }
        }
    },
    methods: {
        filter() {
            this.$emit('filtered' , this.filterBy)
        }
    }
}
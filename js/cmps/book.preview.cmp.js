
export default{
    props:['book'],
    template:`
            <div className="book-card">
                <img :src="book.thumbnail">
                <h4>{{book.title}}</h4>
                <h5> {{formatPrice}} </h5>
            </div>`,
    computed:{
        formatPrice(){
            return Intl.NumberFormat('en-IN', { style: 'currency', currency: `${this.book.listPrice.currencyCode}` }).format(this.book.listPrice.amount);
        }
    }

}
export default {
    props:['book',"idx"],
    template:`
    <li className="option-preview">
        <small>{{book.volumeInfo.title}}</small>
        <button @click="this.$emit('add',idx)">+</button>
    </li>`
}
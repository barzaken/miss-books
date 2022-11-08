import appHeader from "./cmps/header.cmp.js"
import appFooter from "./cmps/footer.cmp.js"
import bookApp from "./views/book.app.cmp.js"
import bookDetails from "./views/book.details.cmp.js"
import homePage from "./views/home-page.cmp.js"
import aboutPage from "./views/about-page.cmp.js"
import userMsg from "./cmps/user-msg.cmp.js"

const {createApp} = Vue
const {createRouter, createWebHashHistory } = VueRouter

const options = {
    template:`
    <app-header></app-header>
    <user-msg/>
    <router-view />
<app-footer></app-footer>
    `,
    components:{
        bookApp,
        homePage,
        aboutPage,
        appHeader,
        appFooter,
        userMsg
    }
}

const routerOptions = {
    history: createWebHashHistory(),
    routes: [
        {
            path: '/',
            component: homePage
        },
        {
            path: '/book',
            component: bookApp,
            children:[
                {
                    path: '/book/:id',
                    component: bookDetails,
                    props:true
                },
            ]
        },
       
        {
            path: '/about',
            component: aboutPage
        },
    ]
}

const router = createRouter(routerOptions)
const app = createApp(options)

app.use(router)
app.mount('#app')
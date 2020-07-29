import Map from './components/Map.vue';
import Login from './components/Login.vue' // routes test udemy!
import Register from './components/Register.vue'
// import Navbar from './components/Navbar.vue'

export const routes = [
    {
        path: '',
        name: 'login',
        component: Login
    },
    {
        path: '/map',
        name: 'map',
        component: Map,
        meta: {
            requiresAuth: true
          }
    },
    {
        path: '/register',
        name: 'register',
        component: Register,
        meta: {
            requiresAuth: true
          }
    }
];



// export default router
import { createRouter, createWebHistory } from "vue-router";
import store from "@/store"
import Home from "@/views/Home.vue";
import Events from "@/views/Events.vue";
import Details from "@/views/Details";
import Tag from "@/views/Tag.vue";
import Create from "@/views/Create";
import Admin from '@/views/admin/Admin';
import ManageUsers from '@/views/admin/ManageUsers';
import ManageSchools from '@/views/admin/ManageSchools';

function checkAdmin(to, from, next) 
{
    if (store.state.user.loggedIn && store.state.user.data.admin) next();
    else next("/");
}

function checkStaff(to, from, next) 
{
  if (store.state.user.loggedIn && (store.state.user.data.staff || store.state.user.data.admin)) next();
  else next("/");
}

function checkAuth(to, from, next) 
{
  if (store.state.user.loggedIn) next();
  else next("/");
}

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/events",
    name: "Events",
    component: Events,
    beforeEnter: checkAuth
  },
  {
    path: "/events/:id",
    name: "Details",
    component: Details,
    props: true,
    beforeEnter: checkAuth
  },
  {
    path: "/tags/:tag",
    name: "Tag",
    component: Tag,
    beforeEnter: checkAuth
  },
  {
    path: "/create",
    name: "Create",
    component: Create,
    beforeEnter: checkStaff
  },
  {
    path: '/admin',
    name: 'Admin',
    component: Admin,
    beforeEnter: checkStaff
  },
  {
    path: '/admin/manage-users',
    name: 'ManageUsers',
    component: ManageUsers,
    beforeEnter: checkAdmin
  },
  {
    path: '/admin/manage-schools',
    name: 'ManageSchools',
    component: ManageSchools,
    beforeEnter: checkAdmin
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;

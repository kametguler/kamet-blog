import Vue from "vue";
import VueRouter from "vue-router";
import Posts from "@/components/Posts";
import Register from "@/components/user/Register";
import Login from "@/components/user/Login";
import Logout from "@/components/user/Logout";
import SinglePost from "@/components/SinglePost";

Vue.use(VueRouter);

const routes = [
    {path: "/", component: Posts, name: "home"},
    {path: "/kayit-ol", component: Register, name: "register", meta: {requiresVisitor: true}},
    {path: "/giris-yap", component: Login, name: "login", meta: {requiresVisitor: true}},
    {path: "/cikis-yap", component: Logout, name: "logout"},
    {path: "/post/:slug", component: SinglePost, name: "single-post"},
    {path: "*", redirect: {name: "home"}},
];

export const router = new VueRouter({
    mode: "history",
    routes,
});

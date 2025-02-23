import {  Outlet } from "react-router-dom"
import Footer from './NonOutlets/Footer'
import MyNav from './NonOutlets/MyNav'
import Search from "./NonOutlets/Search"

function Layout() {
    return (
        <>
            <MyNav />
            <Search/>
            <Outlet />
            <Footer />

        </>
    )
}

export default Layout
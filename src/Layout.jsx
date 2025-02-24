import { Outlet } from "react-router-dom"
import Footer from './NonOutlets/Footer'
import MyNav from './NonOutlets/MyNav'
import Search from "./NonOutlets/Search"
import { useSelector } from "react-redux";

function Layout() {
    const searchContainer = useSelector((state) => state.cartSlice.search);
    return (
        <>
            <Search />
            <div style={(searchContainer) ? ({ filter: "blur(5px)", pointerEvents: "none" }) : ({ filter: "blur(0px)" })}>
                <MyNav />
                <Outlet />
                <Footer />
            </div>

        </>
    )
}

export default Layout
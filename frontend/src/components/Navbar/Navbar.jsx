import { useState, useEffect } from 'react'
import './Navbar.css'
import { assets } from '../../assets/assets'
import { Link, useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { StoreContext } from '../../context/StoreContext'

const Navbar = ({ setShowLogin }) => {
   const [menu, setMenu] = useState("home")
   const { getTotalCartAmount, token, setToken, getLogedInUserInfo } = useContext(StoreContext)
   const navigate = useNavigate();
   const isAdminUser = getLogedInUserInfo()?.isAdmin;

   const logout = () => {
      localStorage.removeItem("token")
      setToken("")
      navigate('/')
   }


   return (
      <div className='navbar'>
         <Link to='/'>
            <img src={assets.logo} alt="" className='logo' />
         </Link>
         <ul className="navbar-menu">
            <Link to='/' onClick={() => setMenu("home")} className={menu === "home" ? "active" : ""}>Home</Link>
            <a
               onClick={(e) => {
                  e.preventDefault();
                  setMenu("menu");
                  if (window.location.pathname !== "/") {
                     navigate("/", { replace: false });
                     setTimeout(() => {
                        const section = document.getElementById("explore-menu");
                        section?.scrollIntoView({ behavior: "smooth" });
                     }, 100);
                  } else {
                     const section = document.getElementById("explore-menu");
                     section?.scrollIntoView({ behavior: "smooth" });
                  }
               }}
               className={menu === "menu" ? "active" : ""}
            >
               Menu
            </a>

            <a
               onClick={(e) => {
                  e.preventDefault();
                  setMenu("mobile-app");
                  if (window.location.pathname !== "/") {
                     navigate("/", { replace: false });
                     setTimeout(() => {
                        const section = document.getElementById("app-download");
                        section?.scrollIntoView({ behavior: "smooth" });
                     }, 100);
                  } else {
                     const section = document.getElementById("app-download");
                     section?.scrollIntoView({ behavior: "smooth" });
                  }
               }}
               className={menu === "mobile-app" ? "active" : ""}
            >
               Mobile-App
            </a>

            <a
               onClick={(e) => {
                  e.preventDefault();
                  setMenu("contact-us");
                  if (window.location.pathname !== "/") {
                     navigate("/", { replace: false });
                     setTimeout(() => {
                        const section = document.getElementById("footer");
                        section?.scrollIntoView({ behavior: "smooth" });
                     }, 100);
                  } else {
                     const section = document.getElementById("footer");
                     section?.scrollIntoView({ behavior: "smooth" });
                  }
               }}
               className={menu === "contact-us" ? "active" : ""}
            >
               Contact Us
            </a>

         </ul>
         <div className="navbar-right">
            <img src={assets.search_icon} alt="" />
            <div className="navbar-search-icon">
               <Link to='/cart'>
                  <img src={assets.basket_icon} alt="" />
               </Link>
               <div className={getTotalCartAmount() === 0 ? "" : "dot"}></div>
            </div>
            {isAdminUser && (
               <div className="navbar-inventory-icon">
                  <Link to='https://foodkart-inventory.onrender.com' target="_blank" rel="noopener noreferrer">
                     <img src={assets.inventory_icon} alt="" />
                  </Link>
               </div>
            )}
            {!token ? <button onClick={() => setShowLogin(true)}>Sign in</button>
               : <div className='navbar-profile'>
                  <img src={assets.profile_icon} alt="" />
                  <ul className="nav-profile-dropdown">
                     <li onClick={() => navigate('/myorders')}><img src={assets.bag_icon} alt="" /><p>Orders</p></li>
                     <hr />
                     <li onClick={logout}><img src={assets.logout_icon} alt="" /><p>Logout</p></li>
                  </ul>
               </div>}
         </div>
      </div>
   )
}

export default Navbar

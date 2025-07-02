import { assets } from '../../assets/assets'
import './Footer.css'

const Footer = () => {
   return (
      <div className='footer' id='footer'>
         <div className="footer-content">
            <div className='footer-content-left'>
               <img className='footer-logo' src={assets.logo} alt="" />
               <p>FoodKart is your go-to platform for delicious meals delivered right to your door. We partner with trusted kitchens to bring you fresh, affordable, and satisfying food — every single time.</p>
               <div className="footer-social-icons">
                  <img src={assets.facebook_icon} alt="" />
                  <img src={assets.twitter_icon} alt="" />
                  <img src={assets.linkedin_icon} alt="" />
               </div>
            </div>
            <div className='footer-content-center'>
               <h2>Company</h2>
               <ul>
                  <li>Home</li>
                  <li>About Us</li>
                  <li>Delivery</li>
                  <li>Privacy Policy</li>
               </ul>
            </div>
            <div className='footer-content-right'>
               <h2>Get in Touch</h2>
               <ul>
                  <li>+91 88X60-XX099</li>
                  <li>info.shakeb@gmail.com</li>
               </ul>
            </div>
         </div>
         <hr />
         <p className="footer-copyright"> Copyright 2025 &copy; foodKart.com - All Rights Reserved</p>
      </div >
   )
}

export default Footer

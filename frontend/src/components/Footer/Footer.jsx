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
                  <a href="http://fb.com" target='_blank'>
                     <img src={assets.facebook_icon} alt="facebook_icon" />
                  </a>
                  <a href="http://x.com" target='_blank'>
                     <img src={assets.twitter_icon} alt="twitter_icon" />
                  </a>
                  <a href="http://linkedin.com" target='_blank'>
                     <img src={assets.linkedin_icon} alt="linkedin_icon" />
                  </a>
               </div>
            </div>
            <div className='footer-content-center'>
               <h2>Company</h2>
               <ul>
                  <li className="footer-item">Home</li>
                  <li className="footer-item">About Us</li>
                  <li className="footer-item">Delivery</li>
                  <li className="footer-item">Privacy Policy</li>
               </ul>
            </div>
            <div className='footer-content-right'>
               <h2>Get in Touch</h2>
               <ul>
                  <li className="footer-item">+91 9876543210</li>
                  <li className="footer-item">info.shakeb@gmail.com</li>
               </ul>
            </div>
         </div>
         <hr />
         <p className="footer-copyright"> Copyright 2025 &copy; foodKart.com - All Rights Reserved</p>
      </div >
   )
}

export default Footer

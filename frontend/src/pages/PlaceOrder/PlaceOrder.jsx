import { useContext } from 'react'
import './PlaceOrder.css'
import { StoreContext } from '../../context/StoreContext'

const PlaceOrder = () => {
   const { getTotalCartAmount } = useContext(StoreContext)
   return (
      <form className='place-order'>
         <div className="place-order-left">
            <p className='title'>Delivery Information</p>
            <div className="multi-fields">
               <input type="text" placeholder='First Name' required />
               <input type="text" placeholder='Last Name' required />
            </div>
            <div className="multi-fields">
               <input type="email" placeholder='Email' required />
               <input type="text" placeholder='Phone' required />
            </div>
            <div className="multi-fields">
               <input type="text" placeholder='Street' required />
               <input type="text" placeholder='City' required />
            </div>
            <div className="multi-fields">
               <input type="text" placeholder='ZipCode' required />
               <input type="text" placeholder='Landmark' required />
            </div>
            <div className="multi-fields">
               <input type="text" placeholder='State' required />
               <input type="text" placeholder='Country' required />
            </div>
         </div>
         <div className="place-order-right">
            <div className="cart-total">
               <h2>Cart Totals</h2>
               <div>
                  <div className="cart-total-details">
                     <p>Sub Total</p>
                     <p>₹{getTotalCartAmount()}</p>
                  </div>
                  <hr />
                  <div className="cart-total-details">
                     <p>Delivery Fee</p>
                     <p>₹{getTotalCartAmount() === 0 ? 0 : 49}</p>
                  </div>
                  <hr />
                  <div className="cart-total-details">
                     <b>Total</b>
                     <b>₹{getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 49}</b>
                  </div>
                  <button>PROCEED TO PAYMENT</button>
               </div>
            </div>
         </div>
      </form>
   )
}

export default PlaceOrder

import { useContext } from 'react';
import './Cart.css';
import { StoreContext } from '../../context/StoreContext';
import { useNavigate } from 'react-router-dom';
import { assets } from '../../assets/assets';

const Cart = () => {
   const { cartItems, food_list, removeFromCart, getTotalCartAmount } = useContext(StoreContext);
   const navigate = useNavigate();

   const hasItemsInCart = Object.values(cartItems).some(quantity => quantity > 0);

   return (
      <div className='cart'>
         {hasItemsInCart ? (
            <>
               <div className="cart-items">
                  <div className="cart-items-title">
                     <p>Items</p>
                     <p>Title</p>
                     <p>Price</p>
                     <p>Quantity</p>
                     <p>Total</p>
                     <p>Remove</p>
                  </div>
                  <br />
                  <hr />
                  {food_list.map((item) => {
                     if (cartItems[item._id] > 0) {
                        return (
                           <div key={item._id}>
                              <div className='cart-items-title cart-items-item'>
                                 <img src={item.image} alt="" />
                                 <p>{item.name}</p>
                                 <p>₹{item.price}</p>
                                 <p>{cartItems[item._id]}</p>
                                 <p>₹{item.price * cartItems[item._id]}</p>
                                 <img onClick={() => removeFromCart(item._id)} className='bin-img cursor' src={assets.bin_img} alt="" />
                              </div>
                              <hr />
                           </div>
                        );
                     }
                     return null;
                  })}
               </div>

               <div className="cart-bottom">
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
                     </div>
                     <button onClick={() => navigate('/order')}>CHECKOUT</button>
                  </div>

                  <div className="cart-promocode">
                     <div>
                        <p>Have promocode? Enter here</p>
                        <div className="cart-promocode-input">
                           <input type="text" placeholder='promocode' />
                           <button>Submit</button>
                        </div>
                     </div>
                  </div>
               </div>
            </>
         ) : (
            <div className='empty-cart'>
                  <img src={assets.empty_cart} alt="" />
                  <p>Please add item(s) to cart first</p>
            </div>
         )}
      </div>
   );
};

export default Cart;

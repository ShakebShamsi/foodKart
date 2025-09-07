import { useContext, useState } from 'react';
import './Cart.css';
import { StoreContext } from '../../context/StoreContext';
import { useNavigate } from 'react-router-dom';
import { assets } from '../../assets/assets';

const Cart = () => {
   const { cartItems, food_list, addToCart, removeFromCart, getTotalCartAmount } = useContext(StoreContext);
   const navigate = useNavigate();

   const hasItemsInCart = Object.values(cartItems).some(quantity => quantity > 0);

   const [flashMap, setFlashMap] = useState({});

   const flash = (id, type) => {
      setFlashMap(prev => ({ ...prev, [id]: type }));
      setTimeout(() => {
         setFlashMap(prev => ({ ...prev, [id]: null }));
      }, 400);
   };

   const handleAdd = (id) => {
      addToCart(id);
      flash(id, 'add');
   };

   const handleRemoveOne = (id) => {
      if (!cartItems[id]) return;
      removeFromCart(id);
      flash(id, 'remove');
   };

   // const removeAllOfItem = (id) => {
   //    const qty = cartItems[id] || 0;
   //    if (qty <= 0) return;
   //    for (let i = 0; i < qty; i++) removeFromCart(id);
   //    flash(id, 'remove');
   // };

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
                     {/* <p>Remove</p> */}
                  </div>
                  <br />
                  <hr />

                  {food_list.map((item) => {
                     const qty = cartItems[item._id] || 0;
                     if (qty <= 0) return null;

                     const pulseClass =
                        flashMap[item._id] === 'add'
                           ? 'pulse-add'
                           : flashMap[item._id] === 'remove'
                              ? 'pulse-remove'
                              : '';

                     return (
                        <div key={item._id}>
                           <div className='cart-items-title cart-items-item'>
                              <img src={item.image} alt={item.name} />
                              <p>{item.name}</p>
                              <p>₹{item.price}</p>
                              <div className={`qty-control ${pulseClass}`}>
                                 <button
                                    className="qty-btn"
                                    aria-label="Decrease quantity"
                                    onClick={() => handleRemoveOne(item._id)}
                                    disabled={qty <= 0}
                                    title="Remove one"
                                 >
                                    <img src={assets.remove_icon_red} alt="-" />
                                 </button>

                                 <span className="qty-badge">{qty}</span>

                                 <button
                                    className="qty-btn"
                                    aria-label="Increase quantity"
                                    onClick={() => handleAdd(item._id)}
                                    title="Add one"
                                 >
                                    <img src={assets.add_icon_green} alt="+" />
                                 </button>
                              </div>

                              <p>₹{item.price * qty}</p>
                           </div>
                           <hr />
                        </div>
                     );
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
               <img src={assets.empty_cart} alt="Empty cart" />
               <p>Please add item(s) to cart first</p>
            </div>
         )}
      </div>
   );
};

export default Cart;

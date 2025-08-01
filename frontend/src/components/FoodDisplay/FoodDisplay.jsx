import React, { useContext } from 'react';
import './FoodDisplay.css';
import { StoreContext } from '../../context/StoreContext';
import FoodItem from '../FoodItem/FoodItem';

const FoodDisplay = ({ category }) => {
   const { food_list } = useContext(StoreContext);

   if (!Array.isArray(food_list) || food_list.length === 0) {
      return <p>Loading food items...</p>;
   }

   const filteredList = food_list.filter((item) => {
      return category === "All" || item.category === category;
   });

   return (
      <div className='food-display' id='food-display'>
         <h2>Top dishes near you</h2>
         <div className="food-display-list">
            {filteredList.map((item) => (
               <FoodItem
                  key={item._id}
                  id={item._id}
                  name={item.name}
                  description={item.description}
                  price={item.price}
                  image={item.image}
               />
            ))}
         </div>
      </div>
   );
};

export default FoodDisplay;

import { useEffect, useState } from 'react'
import './List.css';
import axios from 'axios';
import { toast } from 'react-toastify';
import { assets } from '../../assets/assets'


const List = ({ url }) => {

   const [list, setList] = useState([])

   const fetchList = async () => {
      try {
         const response = await axios.get(`${url}/api/food/list`);
         if (response.data.success) {
            setList(response.data.foods);
         } else {
            toast.error("Failed to load food items.");
         }
      } catch (error) {
         console.error("API Error:", error);
         toast.error("Error fetching food list");
      }
   }

   const removeFood = async (foodId) => {
      try {
         const response = await axios.delete(`${url}/api/food/remove/${foodId}`);
         if (response.data.success) {
            toast.success("Food item removed successfully.");
            fetchList(); // Refresh the list
         } else {
            toast.error("Failed to remove food item.");
         }
      } catch (error) {
         console.error("API Error:", error);
         toast.error("Error removing food item");
      }
   }

   useEffect(() => {
      fetchList();
   }, [])

   return (
      <div className='list add flex-col'>
         <p>All Foods List</p>
         <div className="list-table">
            <div className="list-table-format title">
               <b>Image</b>
               <b>Name</b>
               <b>Category</b>
               <b>Price</b>
               <b>Action</b>
            </div>
            {Array.isArray(list) &&
               list.map((item, index) => {
                  return (
                     <div key={index} className="list-table-format">
                        <img className='item-img' src={item.image} alt={item.name} />
                        <p>{item.name}</p>
                        <p>{item.category}</p>
                        <p>₹{item.price}</p>
                        <img className="bin-img cursor" onClick={() => removeFood(item._id)} src={assets.bin_img} alt="" />
                     </div>
                  )
               })}

         </div>
      </div>
   )
}

export default List

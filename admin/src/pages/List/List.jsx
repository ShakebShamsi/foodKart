import { useEffect, useState } from 'react'
import './List.css';
import axios from 'axios';
import { toast } from 'react-toastify';

const List = () => {
   const url = 'http://localhost:4000'
   const [list, setList] = useState([])
   
   const fetchList = async () => {
      try {
         const response = await axios.get(`${url}/api/food/list`);
         console.log("API response:", response.data);
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
                     <img src={item.image} alt={item.name} /*style={{ width: "100px" }}*/ />
                     <p>{item.name}</p>
                     <p>{item.category}</p>
                     <p>₹{item.price}</p>
                     <p>X</p>
                  </div>
               )
            })}

         </div>
    </div>
  )
}

export default List

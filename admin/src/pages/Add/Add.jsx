import { useRef, useState, useEffect } from 'react'
import './Add.css';
import { assets } from '../../assets/assets';
import axios from 'axios';              
import { toast } from 'react-toastify';

const MAX_IMAGE_MB = 5; 

const Add = ({ url }) => {
   const [image, setImage] = useState(null);          
   const [imagePreview, setImagePreview] = useState(''); 
   const fileInputRef = useRef(null);

   const [data, setData] = useState({
      name: '',
      description: '',
      category: 'Salad',
      price: ''
   });

   useEffect(() => {
      if (!image) {
         if (imagePreview) {
            URL.revokeObjectURL(imagePreview);
            setImagePreview('');
         }
         return;
      }
      const url = URL.createObjectURL(image);
      setImagePreview(url);
      return () => {
         URL.revokeObjectURL(url);
      };
   }, [image]);

   const onChangeHandler = (event) => {
      const { name, value } = event.target;
      setData((prev) => ({ ...prev, [name]: value }));
   };

   const onFileChange = (e) => {
      const file = e.target.files?.[0];
      if (!file) return;

      // Optional validations
      const isImage = file.type.startsWith('image/');
      if (!isImage) {
         toast.error('Please upload a valid image file.');
         clearImage();
         return;
      }
      const sizeMb = file.size / (1024 * 1024);
      if (sizeMb > MAX_IMAGE_MB) {
         toast.error(`Image too large. Max ${MAX_IMAGE_MB}MB.`);
         clearImage();
         return;
      }

      setImage(file);
   };

   const clearImage = () => {
      setImage(null);
      if (fileInputRef.current) {
         fileInputRef.current.value = ''; 
      }
   };

   const onSubmitHandler = async (event) => {
      event.preventDefault();
      if (!image) {
         toast.error('Please upload a product image.');
         return;
      }

      try {
         const formData = new FormData();
         formData.append('image', image);
         formData.append('name', data.name);
         formData.append('description', data.description);
         formData.append('category', data.category);
         formData.append('price', Number(data.price || 0));

         const response = await axios.post(`${url}/api/food/add`, formData);
         if (response.data.success) {
            setData({ name: '', description: '', category: 'Salad', price: '' });
            clearImage();
            toast.success(response.data.message || 'Product added!');
         } else {
            toast.error(response.data.message || 'Failed to add product.');
         }
      } catch (err) {
         console.error(err);
         toast.error('Something went wrong while adding the product.');
      }
   };

   return (
      <div className='add'>
         <form className="flex-col" onSubmit={onSubmitHandler}>
            <div className="add-img-upload flex-col">
               <p>Upload Image</p>

               <div className="add-img-wrapper">
                  <label htmlFor="image" className="add-img-label" aria-label="Upload product image">
                     <img
                        className="add-product-img"
                        src={imagePreview || assets.upload_default}
                        alt="Upload product"
                     />
                  </label>

                  {image && (
                     <button
                        type="button"
                        className="add-img-remove"
                        onClick={clearImage}
                        aria-label="Remove selected image"
                        title="Remove image"
                     >
                        ×
                     </button>
                  )}
               </div>

               <input
                  ref={fileInputRef}
                  onChange={onFileChange}
                  type="file"
                  id="image"
                  accept="image/*"
                  hidden
               />

               {image && (
                  <button
                     type="button"
                     className="add-img-reupload-btn"
                     onClick={() => fileInputRef.current?.click()}
                  >
                     Change Image
                  </button>
               )}
            </div>

            <div className="add-product-name flex-col">
               <p>Product Name</p>
               <input
                  onChange={onChangeHandler}
                  value={data.name}
                  type="text"
                  name="name"
                  placeholder="Type here"
                  required
               />
            </div>

            <div className="add-product-description flex-col">
               <p>Product Description</p>
               <textarea
                  onChange={onChangeHandler}
                  value={data.description}
                  name="description"
                  rows="6"
                  placeholder="Write description here"
                  required
               />
            </div>

            <div className="add-category-price">
               <div className="add-product-category flex-col">
                  <p>Product Category</p>
                  <select onChange={onChangeHandler} name="category" value={data.category}>
                     <option value="Salad">Salad</option>
                     <option value="Rolls">Rolls</option>
                     <option value="Deserts">Deserts</option>
                     <option value="Sandwich">Sandwich</option>
                     <option value="Cake">Cake</option>
                     <option value="Pure Veg">Pure Veg</option>
                     <option value="Pasta">Pasta</option>
                     <option value="Noodles">Noodles</option>
                  </select>
               </div>

               <div className="add-price flex-col">
                  <p>Product Price</p>
                  <input
                     onChange={onChangeHandler}
                     value={data.price}
                     type="number"
                     min="0"
                     step="1"
                     name="price"
                     placeholder="₹99"
                     required
                  />
               </div>
            </div>

            <button className="add-btn" type="submit">ADD</button>
         </form>
      </div>
   );
};

export default Add;

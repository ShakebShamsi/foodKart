// src/components/SearchModal/SearchModal.jsx
import { useEffect, useMemo, useRef, useState, useContext } from "react";
import "./SearchModal.css";
import { StoreContext } from "../../context/StoreContext";

export default function SearchModal({ isOpen, onClose, assets }) {
   const { food_list, addToCart } = useContext(StoreContext) || {};
   const [query, setQuery] = useState("");
   const inputRef = useRef(null);

   const [addedItems, setAddedItems] = useState({});


   useEffect(() => {
      if (isOpen) {
         setTimeout(() => inputRef.current?.focus(), 0);
      } else {
         setQuery("");
      }
   }, [isOpen]);

   useEffect(() => {
      if (!isOpen) return;
      const onKey = (e) => e.key === "Escape" && onClose?.();
      window.addEventListener("keydown", onKey);
      return () => window.removeEventListener("keydown", onKey);
   }, [isOpen, onClose]);

   const results = useMemo(() => {
      if (!Array.isArray(food_list) || !query.trim()) return [];
      const q = query.toLowerCase();
      return food_list.filter((item) => {
         const name = (item.name || "").toLowerCase();
         const desc = (item.description || "").toLowerCase();
         return name.includes(q) || desc.includes(q);
      });
   }, [food_list, query]);

   const shortenDescription = (text, max = 90) => {
      if (!text) return "";
      return text.length > max ? text.slice(0, max - 1) + "…" : text;
   };

   const handleAdd = (item) => {
      const id = item._id ?? item.id ?? item.foodId ?? item.slug;

      if (typeof addToCart === "function" && id != null) {
         addToCart(id);

         // Set UI "added" state
         setAddedItems((prev) => ({ ...prev, [id]: true }));

         // Reset back after 1 second
         setTimeout(() => {
            setAddedItems((prev) => ({ ...prev, [id]: false }));
         }, 1000);
      }
   };


   if (!isOpen) return null;

   return (
      <div className="search-modal-overlay" onClick={onClose}>
         <div
            className="search-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="search-heading"
            onClick={(e) => e.stopPropagation()}
         >
            <div className="search-modal-header">
               <h3 id="search-heading">Search food</h3>
               <button className="close-btn" onClick={onClose} aria-label="Close">×</button>
            </div>

            <div className="search-input-wrap">
               <input
                  ref={inputRef}
                  type="text"
                  placeholder="Type a dish or ingredient…"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={(e) => {
                     if (e.key === "Enter") {
                     }
                  }}
               />
            </div>

            <div className="search-results">
               {!query.trim() ? (
                  <p className="muted">Start typing to find items…</p>
               ) : results.length === 0 ? (
                  <p className="muted">No matches for “{query}”.</p>
               ) : (
                  results.map((item) => (
                     <div key={item._id ?? item.id ?? item.name} className="search-result-card">
                        {item.image && (
                           <img className="result-thumb" src={item.image} alt={item.name} />
                        )}

                        <div className="food-item-info">
                           <div className="food-item-name-rating">
                              <p>{item.name}</p>
                              <img src={assets?.rating_starts} alt="rating" />
                           </div>

                           <p className="food-item-desc">
                              {shortenDescription(item.description)}
                           </p>

                           <div className="price-and-action">
                              <p className="food-item-price">₹{item.price}</p>
                              <button
                                 className={`add-btn ${addedItems[item._id] ? "added" : ""}`}
                                 onClick={() => handleAdd(item)}
                                 disabled={addedItems[item._id]}  // optional disable
                              >
                                 {addedItems[item._id] ? "Added!" : "Add to cart"}
                              </button>

                           </div>
                        </div>
                     </div>
                  ))
               )}
            </div>
         </div>
      </div>
   );
}

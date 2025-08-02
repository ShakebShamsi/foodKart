import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const placeOrder = async (req, res) => {
   const frontend_url = "http://localhost:5173";

   try {
      const { userId, items, amount, address } = req.body;

      // Save order in DB
      const newOrder = new orderModel({
         userId,
         items,
         amount,
         address
      });

      await newOrder.save();

      // Clear user's cart
      await userModel.findByIdAndUpdate(userId, { cartData: {} });

      // Prepare line_items for Stripe (all in INR)
      const line_items = items.map(item => ({
         price_data: {
            currency: "inr",
            product_data: {
               name: item.name,
               description: `Quantity: ${item.quantity}`
            },
            unit_amount: Math.round(item.price * 100) // ₹960 → 96000 paise
         },
         quantity: item.quantity
      }));

      // Add delivery charge (₹49)
      line_items.push({
         price_data: {
            currency: "inr",
            product_data: {
               name: "Delivery Charges"
            },
            unit_amount: 49 * 100  // ₹49 → 4900 paise
         },
         quantity: 1
      });

      // Create Stripe Checkout session
      const session = await stripe.checkout.sessions.create({
         line_items,
         mode: 'payment',
         customer_email: address.email,  // optional
         success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
         cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
         metadata: {
            orderId: newOrder._id.toString(),
            userId: userId
         }
      });

      // Respond with session URL
      res.json({ success: true, session_url: session.url });

   } catch (error) {
      console.error("Stripe Checkout Error:", error);
      res.status(500).json({ success: false, message: "Checkout failed" });
   }
};

export { placeOrder };

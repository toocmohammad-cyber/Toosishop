// api/checkout.js - Vercel serverless function (Node.js)
// Supports: Stripe Checkout (if STRIPE_SECRET set) or Zarinpal (if ZARINPAL_MERCHANT set) or fallback TEST.
const stripeKey = process.env.STRIPE_SECRET;
const zarinpalMerchant = process.env.ZARINPAL_MERCHANT;
const domain = process.env.DOMAIN || 'https://toosishop.vercel.app';

module.exports = async (req, res) => {
  if (req.method !== 'POST') return res.status(405).json({error:'method not allowed'});
  try {
    const body = req.body;
    const items = body.cart || [];
    const amount = items.reduce((s,i)=>s + (i.price * i.qty), 0);

    if (stripeKey) {
      const Stripe = require('stripe')(stripeKey);
      const line_items = items.map(i=>({price_data:{currency:'usd',product_data:{name:i.title},unit_amount:Math.round(i.price/42),},quantity:i.qty}));
      const session = await Stripe.checkout.sessions.create({
        payment_method_types:['card'],
        line_items,
        mode:'payment',
        success_url: domain + '/?success=1',
        cancel_url: domain + '/?canceled=1'
      });
      return res.json({url:session.url});
    } else if (zarinpalMerchant) {
      return res.json({url: `https://sandbox.zarinpal.com/pg/StartPay/${zarinpalMerchant}`});
    } else {
      return res.json({success:true, message:'TEST_MODE: سفارش ثبت شد (حالت تستی)'});
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({error: 'internal_error'});
  }
};

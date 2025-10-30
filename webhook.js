// api/webhook.js - stub for payment gateway webhooks (Stripe / Zarinpal)
// Implement verification and order fulfillment here.
module.exports = async (req, res) => {
  console.log('webhook received', req.headers);
  res.json({received:true});
};

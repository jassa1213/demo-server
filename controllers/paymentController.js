const Razorpay = require("razorpay");
const crypto = require("crypto")
const razorpay = new Razorpay({
  key_id: "rzp_test_VNH7xstzhpP7Cf",
  key_secret: "uHKQIurkfCae91DW6muOBoDE",
});

const createOrder = async (req, res) => {
  try {
    const amount = req.body.amount * 100;

    const options = {
      amount,
      currency: "INR",
    };
    const order = await razorpay.orders.create(options);
    res.status(200).json({ order });
  } catch (error) {
    res.status(500).json({ error });
    console.log(error);
  }
};
const verifyPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =

      req.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", "uHKQIurkfCae91DW6muOBoDE")
      .update(body.toString())
      .digest("hex");



    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({
        success: false,
        message: "Invalid Signature",
      });
    }
else{

  
  return res.status(200).json({
    success: true,
      message: "Payment verification successful",
    });
  }
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ status: "error", message: "An error occurred" });
  }
};


module.exports = { createOrder, verifyPayment };

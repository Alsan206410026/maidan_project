const esewaConfig = {
  merchantId: process.env.ESEWA_MERCHANT_ID,
  secretKey: process.env.ESEWA_SECRET_KEY,

  paymentUrl: process.env.ESEWA_PAYMENT_URL,
  statusUrl: process.env.ESEWA_STATUS_URL,

  successUrl: process.env.ESEWA_SUCCESS_URL,
  failureUrl: process.env.ESEWA_FAILURE_URL,
};

module.exports = esewaConfig;
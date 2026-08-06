const axios = require("axios");
const esewaConfig = require("../config/esewa");

const verifyPayment = async (
  productCode,
  totalAmount,
  transactionUuid
) => {
  const response = await axios.get(esewaConfig.statusUrl, {
    params: {
      product_code: productCode,
      total_amount: totalAmount,
      transaction_uuid: transactionUuid,
    },
  });

  return response.data;
};

module.exports = verifyPayment;
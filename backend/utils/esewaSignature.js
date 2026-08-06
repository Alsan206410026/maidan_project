const crypto = require("crypto");
const esewaConfig = require("../config/esewa");

const generateSignature = ({
  total_amount,
  transaction_uuid,
  product_code,
}) => {
  const message =
    `total_amount=${total_amount},` +
    `transaction_uuid=${transaction_uuid},` +
    `product_code=${product_code}`;

  return crypto
    .createHmac("sha256", esewaConfig.secretKey)
    .update(message)
    .digest("base64");
};

module.exports = generateSignature;
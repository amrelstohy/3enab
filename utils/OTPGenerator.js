const OTPGenerator = (length) => {
  return String(
    Math.floor(1 * 10 ** (length - 1) + Math.random() * 9 * 10 ** (length - 1))
  );
};

module.exports = OTPGenerator;

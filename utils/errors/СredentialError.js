class СredentialError extends Error {
  constructor(message) {
    super(message);
    this.name = 'СredentialsErros';
    this.statusCode = 403;
  }
}

module.exports = СredentialError;

class DataMatchError extends Error {
  constructor(message) {
    super(message);
    this.name = 'DataMatchError';
    this.statusCode = 409;
  }
}

module.exports = DataMatchError;

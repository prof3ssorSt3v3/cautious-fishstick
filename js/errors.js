class NetworkError extends Error {
  constructor(_req, _resp) {
    super();
    this.name = 'NetworkError';
    this.request = _req;
    this.response = _resp;
  }
}

export { NetworkError };

export function APP_BINDINGS() {
  const host = process.env.APP_HOST || '0.0.0.0';
  const port = parseInt(process.env.APP_PORT || '3000');
  const url = `http://${host}:${port}`;

  return { host, port, url };
}

export const MONGO_CONFIG = (): string => {
  const username = process.env.MONGO_USER ?? null;
  const password = process.env.MONGO_PASS ?? null;
  const database = process.env.MONGO_DB ?? 'develop';

  const host =
    process.env.MONGO_HOST ?? 'localhost:27017,localhost:27018,localhost:27019';

  const query =
    process.env.MONGO_QUERY ??
    (host.split(',').length > 1
      ? 'authSource=admin&readPreference=primary&ssl=false&replicaSet=rs0'
      : 'authSource=admin');

  let uri = null;

  if (username && password) {
    uri = `mongodb://${username}:${password}@${host}/${database}?${query}`;
  } else {
    uri = `mongodb://${host}/${database}?${query}`;
  }

  return uri;
};

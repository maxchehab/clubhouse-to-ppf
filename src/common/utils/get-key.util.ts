import { NoApiKeyProvidedException } from '../exceptions';

const getKey = (): string => {
  const envKey = process.env.CLUBHOUSE_API_KEY;

  if (envKey) {
    return envKey;
  }

  throw new NoApiKeyProvidedException();
};

export { getKey };

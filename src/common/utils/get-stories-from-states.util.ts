import Client, { Story } from 'clubhouse-lib';

import { getStories } from './get-stories.util';
import { uniqueArray } from './unique-array.util';

const getStoriesFromStates = async (
  query: string,
  states: string[],
  client: Client,
): Promise<Story[]> => {
  let allStories: Story[] = [];
  for (const name of states) {
    const newQuery = query.concat(` state:"${name}"`);
    const stories = await getStories(newQuery, client);

    allStories = stories.concat(stories);
  }

  return uniqueArray(allStories);
};

export { getStoriesFromStates };

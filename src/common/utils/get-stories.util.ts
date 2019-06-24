import Client, { Story } from 'clubhouse-lib';

const getStories = async (query: string, client: Client): Promise<Story[]> => {
  let result = await client.searchStories(query);
  let storyIDs = result.data.map(s => s.id);

  while (result.next) {
    result = await result.fetchNext();
    storyIDs = storyIDs.concat(result.data.map(s => s.id));
  }

  const stories: Story[] = [];

  for (const id of storyIDs) {
    const story = await client.getStory(id);
    stories.push(story);
  }

  return stories;
};

export { getStories };

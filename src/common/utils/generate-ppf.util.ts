import { Story, Member } from 'clubhouse-lib';

const generatePPF = (
  completedStories: Story[],
  inProgressStories: Story[],
  futureStories: Story[],
  member: Member,
) => {
  const header = generateHeader(member.profile.name.split(' ')[0]);
  const completedList = generateStoryList(completedStories, 'Completed');
  const inProgressList = generateStoryList(inProgressStories, 'In Progress');
  const futureList = generateStoryList(futureStories, 'Planned');

  return (
    `${header}\n` +
    `${completedList}\n` +
    `${inProgressList}\n` +
    `${futureList}\n`
  );
};

const getPullRequest = (story: any) => {
  if (story.branches && story.branches[0] && story.branches[0].pull_requests) {
    const pr = story.branches[0].pull_requests[0];
    return (pr && pr.url) || null;
  }
};

const generateHeader = (member: string) => {
  const today = new Date();
  const todayString = `${today.getMonth() + 1}/${today.getDate()}`;

  const lastWeek = new Date(new Date().setDate(today.getDate() - 7));
  const lastWeekString = `${lastWeek.getMonth()}/${lastWeek.getDate()}`;

  return `# ${member}'s PPF (${lastWeekString}-${todayString})\n`;
};

const generateStoryList = (stories: Story[], title: string) => {
  let storyList: string = `## ${title}:\n`;

  for (const story of stories) {
    let point = `${story.name}`;
    const pullRequest = getPullRequest(story);

    if (pullRequest) {
      point = `[${story.name}](${pullRequest})`;
    }

    storyList = storyList.concat(`- ${point}\n`);
  }

  return storyList;
};

export { generatePPF };

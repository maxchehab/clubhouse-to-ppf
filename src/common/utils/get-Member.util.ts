import { Member } from 'clubhouse-lib';
import * as inquirer from 'inquirer';

const getMember = async (members: Member[]): Promise<Member> => {
  const { member } = await inquirer.prompt([
    {
      type: 'list',
      name: 'member',
      message: 'Who are you?',
      choices: members.map(m => m.profile.name),
    },
  ]);

  return members.filter((m: Member) => m.profile.name === member)[0];
};

export { getMember };

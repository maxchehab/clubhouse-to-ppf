import { Command, flags } from '@oclif/command';
import Client, { create, Story } from 'clubhouse-lib';
import * as clipboardy from 'clipboardy';

import {
  getKey,
  getStates,
  getStoriesFromStates,
  generatePPF,
  getMember,
} from '../common/utils';

// tslint:disable-next-line:no-default-export
export default class Generate extends Command {
  static description = 'generates a fake event without publishing';

  static examples = [``];

  static flags = {
    help: flags.help({ char: 'h' }),
    format: flags.boolean({ char: 'f' }),
  };

  async run() {
    try {
      const key = getKey();
      const client: Client = create(key);

      const members = await client.listMembers();
      const member = await getMember(members);

      const states = (await client.listWorkflows())[0].states;

      const completedStates = await getStates(
        states,
        'Which states represents completed work?',
      );

      const inProgressStates = await getStates(
        states,
        'Which states represents in progress work?',
      );

      const futureStates = await getStates(
        states,
        'Which states represents future work?',
      );

      const today = new Date();
      const todayString = today.toISOString().split('T')[0];

      const lastWeek = new Date(new Date().setDate(today.getDate() - 7));
      const lastWeekString = lastWeek.toISOString().split('T')[0];

      const completedStories: Story[] = await getStoriesFromStates(
        `owner:${member.profile.mention_name} updated:${lastWeekString}..${todayString}`,
        completedStates,
        client,
      );

      const inProgressStories: Story[] = await getStoriesFromStates(
        `owner:${member.profile.mention_name}`,
        inProgressStates,
        client,
      );

      const futureStories: Story[] = await getStoriesFromStates(
        `owner:${member.profile.mention_name}`,
        futureStates,
        client,
      );

      const ppf = generatePPF(
        completedStories,
        inProgressStories,
        futureStories,
        member,
      );

      await clipboardy.write(ppf);

      this.log(`Coppied PPF to clipboard 🎉'🎉🎉`);
    } catch (error) {
      this.error(error.message, { exit: 1 });
    }
  }
}

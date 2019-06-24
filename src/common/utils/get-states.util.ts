import { WorkflowState } from 'clubhouse-lib';
import * as inquirer from 'inquirer';

const getStates = async (
  states: WorkflowState[],
  message: string,
): Promise<string[]> => {
  const statesSelection = states.map((state: WorkflowState) => state.name);

  const result: any = await inquirer.prompt([
    {
      type: 'checkbox',
      name: 'selectedStates',
      message,
      choices: statesSelection,
    },
  ]);

  const selectedStates: string[] = result.selectedStates;

  return states
    .filter((state: WorkflowState) => selectedStates.includes(state.name))
    .map((state: WorkflowState) => state.name);
};

export { getStates };

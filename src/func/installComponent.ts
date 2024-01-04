import * as vscode from 'vscode';
import { COMPONENTS } from '../constants/components';
import { camelToNormal } from '../lib/utils';

export async function installComponentFunc() {
  const selectedComponent = (
    await vscode.window.showQuickPick(
      Object.keys(COMPONENTS).map((key) => ({
        label: camelToNormal(key),
      })),
      {
        placeHolder: 'Select a component to install',
      }
    )
  )?.label;

  if (selectedComponent) {
    await vscode.window.withProgress(
      {
        location: vscode.ProgressLocation.Notification,
        title: `Installing ${camelToNormal(selectedComponent)}`,
      },
      async () => {
        vscode.commands.executeCommand(
          'workbench.action.terminal.sendSequence',
          {
            text: `npx shadcn-ui add ${selectedComponent}\n`,
            addNewLine: true,
          },
          {
            text: '\n',
          }
        );
      }
    );
  }
}

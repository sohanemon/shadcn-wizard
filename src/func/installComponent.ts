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
        title: 'Installing Tailwind CSS',
      },
      async () => {
        vscode.window.showInformationMessage('Hello World from Shadcn Wizard!');
      }
    );
  }
}

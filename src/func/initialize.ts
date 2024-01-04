import * as vscode from 'vscode';
import { enter, execute, sleep } from '../lib/utils';

export async function initializeFunc() {
  await vscode.window.withProgress(
    {
      location: vscode.ProgressLocation.Notification,
      title: `Initializing Shadcn`,
    },
    async () => {
      execute('npx shadcn-ui init');
      for (let i = 0; i < 5; i++) {
        await sleep();
        enter();
      }
    }
  );
}

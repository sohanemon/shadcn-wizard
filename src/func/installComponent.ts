import * as cp from 'child_process';
import * as vscode from 'vscode';
import { COMPONENTS } from '../constants/components';
import { camelToKebab, camelToNormal, toast } from '../lib/utils';

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
        cancellable: false,
      },
      async (progress) => {
        let completed = false;

        if (vscode.workspace.workspaceFolders !== undefined) {
          const workspacePath = vscode.workspace.workspaceFolders[0].uri.fsPath;
          const process = cp.spawn(
            'npx',
            ['shadcn-ui', 'add', camelToKebab(selectedComponent)],
            {
              cwd: workspacePath,
            }
          );

          process.stdout?.on('data', async (data) => {
            toast.info(data);
            process.stdin.write('\n');
          });

          process.on('error', (error) => {
            toast.error(error.message);
            progress.report({ increment: 0 });
            completed = true;
          });

          process.on('close', (code) => {
            if (code === 0) {
              progress.report({
                message: `${camelToNormal(
                  selectedComponent
                )} successfully added!`,
              });
            } else {
              progress.report({ message: 'Failed to add component' });
            }
            completed = true;
          });

          // Create a Promise that resolves when the process completes
          await new Promise<void>((resolve) => {
            const checkCompletion = setInterval(() => {
              if (completed) {
                clearInterval(checkCompletion);
                resolve();
              }
            }, 100);
          });
        }
      }
    );
  }
}

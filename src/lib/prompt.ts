import * as cp from 'child_process';
import * as vscode from 'vscode';

export function prompt(
  process: cp.ChildProcessWithoutNullStreams,
  searchValue: string,
  placeholder: string
): void {
  process.stdout?.on('data', async (data: Buffer) => {
    console.log(`stdout: ${data}`);
    if (data.includes(searchValue)) {
      const options: vscode.QuickPickItem[] = [
        { label: 'Yes' },
        { label: 'No' },
      ];
      const option = await vscode.window.showQuickPick(options, {
        placeHolder: placeholder,
        title: 'Shadcn Wizard',
      });
      if (option?.label === 'Yes') {
        process.stdin.write('yes\n');
      } else if (option?.label === 'No') {
        process.stdin.write('no\n');
      }
    }
  });
}

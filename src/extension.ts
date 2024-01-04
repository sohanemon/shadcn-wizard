import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
  console.log('Congratulations, your extension "shadcn-wizard" is now active!');
  let disposable = vscode.commands.registerCommand(
    'shadcn-wizard.helloWorld',
    () => {
      vscode.window.showInformationMessage('Hello World from Shadcn Wizard!');
    }
  );

  context.subscriptions.push(disposable);
}

export function deactivate() {}

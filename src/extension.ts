import * as vscode from 'vscode';
import { installComponentFunc } from './func/installComponent';

export function activate(context: vscode.ExtensionContext) {
  console.log('Shadcn Wizard is now active!');

  let installComponent = vscode.commands.registerCommand(
    'shadcn-wizard.installComponent',
    installComponentFunc
  );

  context.subscriptions.push(installComponent);
}

export function deactivate() {}

import * as vscode from 'vscode';
import { initializeFunc } from './func/initialize';
import { installComponentFunc } from './func/installComponent';

export function activate(context: vscode.ExtensionContext) {
  console.log('Shadcn Wizard is now active!');

  let installComponent = vscode.commands.registerCommand(
    'shadcn-wizard.installComponent',
    installComponentFunc
  );
  let initialize = vscode.commands.registerCommand(
    'shadcn-wizard.initialize',
    initializeFunc
  );

  context.subscriptions.push(installComponent, initialize);
}

export function deactivate() {}

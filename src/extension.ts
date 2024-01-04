import * as vscode from 'vscode';
import { docsFunc } from './func/docs';
import { initializeFunc } from './func/initialize';
import { installComponentFunc } from './func/installComponent';

export function activate(context: vscode.ExtensionContext) {
  console.log('Shadcn Wizard is now active!');

  let docs = vscode.commands.registerCommand('shadcn-wizard.docs', docsFunc);
  let installComponent = vscode.commands.registerCommand(
    'shadcn-wizard.installComponent',
    installComponentFunc
  );
  let initialize = vscode.commands.registerCommand(
    'shadcn-wizard.initialize',
    () => initializeFunc(context)
  );

  context.subscriptions.push(docs, installComponent, initialize);
}

export function deactivate() {}

import * as vscode from 'vscode';

export function camelToKebab(camelCase: string): string {
  const kebabCase = camelCase
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .toLowerCase();
  return kebabCase;
}

export function camelToNormal(camelCase: string): string {
  const normalCase = camelCase.replace(/([a-z])([A-Z])/g, '$1 $2');
  const capitalized = normalCase.charAt(0).toUpperCase() + normalCase.slice(1);
  return capitalized;
}

export function sleep(ms: number = 100) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function enter() {
  vscode.commands.executeCommand('workbench.action.terminal.sendSequence', {
    text: `\n`,
  });
}

export function execute(command: string) {
  vscode.commands.executeCommand('workbench.action.terminal.sendSequence', {
    text: `${command}\n`,
  });
}

export const toast = {
  info: (message: string) => {
    vscode.window.showInformationMessage(message);
  },
  warn: (message: string) => {
    vscode.window.showWarningMessage(message);
  },
  error: (message: string) => {
    vscode.window.showErrorMessage(message);
  },
};

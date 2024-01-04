import * as fs from 'fs';
import * as path from 'path';
import * as vscode from 'vscode';
import { toast } from '../lib/utils';

export async function initializeFunc(context: vscode.ExtensionContext) {
  await vscode.window.withProgress(
    {
      location: vscode.ProgressLocation.Notification,
      title: `Initializing Shadcn`,
    },
    async () => {
      if (vscode.workspace.workspaceFolders !== undefined) {
        const workspacePath = vscode.workspace.workspaceFolders[0].uri.fsPath;
        const filePath = path.join(workspacePath, 'components.json');

        fs.writeFile(
          filePath,
          `{
  "style": "default",
  "tailwind": {
    "config": "tailwind.config.js",
    "css": "src/app/globals.css",
    "baseColor": "zinc",
    "cssVariables": true
  },
  "rsc": true,
  "tsx": true,
  "aliases": {
    "utils": "~/lib/utils",
    "components": "~/components"
  }
}
`,
          (err) => {
            if (err) {
              toast.error('Failed to create components.json: ' + err.message);
            } else {
              toast.info('Created components.json');
            }
          }
        );
      }
    }
  );
}

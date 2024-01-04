import * as vscode from 'vscode';
import { COMPONENTS } from '../constants/components';
import { camelToKebab, camelToNormal } from '../lib/utils';

export async function docsFunc() {
  const selectedComponent = (
    await vscode.window.showQuickPick(
      Object.keys(COMPONENTS).map((key) => ({
        label: camelToNormal(key),
      })),
      {
        placeHolder: 'Select a component for docs',
      }
    )
  )?.label;

  if (selectedComponent) {
    await vscode.env.openExternal(
      vscode.Uri.parse(
        `https://ui.shadcn.com/docs/components/${camelToKebab(
          selectedComponent
        )}`
      )
    );
  }
}

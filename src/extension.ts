import * as vscode from 'vscode';
import { PxtoRemProvider } from './provider';

export function activate(context: vscode.ExtensionContext) {
  const LANS: Array<string> = ['javascript', 'javascriptreact', 'typescriptreact'];
  const options = vscode.workspace.getConfiguration('cssinjsPx2rem');
  LANS.forEach(lan => {
    const pxtoRemProvider = new PxtoRemProvider(options);
    context.subscriptions.push(vscode.languages.registerCompletionItemProvider(lan, pxtoRemProvider));
  });
}

// this method is called when your extension is deactivated
export function deactivate() {}


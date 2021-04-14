import * as vscode from 'vscode';
import { PxtoRemProvider } from './provider';
import { getConfig } from './config';

export function activate(context: vscode.ExtensionContext) {
  const LANS: Array<string> = ['javascript', 'javascriptreact', 'typescriptreact'];
  getConfig();
  LANS.forEach(lan => {
    const pxtoRemProvider = new PxtoRemProvider();
    context.subscriptions.push(vscode.languages.registerCompletionItemProvider(lan, pxtoRemProvider));
  });

  vscode.workspace.onDidChangeConfiguration(() => {
    getConfig();
  });
}

// this method is called when your extension is deactivated
export function deactivate() {}


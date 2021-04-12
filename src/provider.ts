import { Range, TextDocument, Position, CompletionItemKind, CompletionItem, CompletionItemProvider, ProviderResult } from 'vscode';


export class PxtoRemProvider implements CompletionItemProvider {
    private prefixExp: RegExp = /^[+-]?([0-9]*[.])?[0-9]+(p|px|$)$/;
    private regexExp: RegExp = /[+-]?[\w\d.]+$/;
    private numExp: RegExp = /[+-]?\d*[.]?\d*/;

    constructor(private options: any) {
      this.options = options;
    }

    provideCompletionItems(
      document: TextDocument,
      position: Position,
    ): ProviderResult<CompletionItem[]>{
      return new Promise(resolve => {
        const res = this.getPrefix(document, position);
        if (res) {
          const item = new CompletionItem(`${res.pxStr}px -> ${res.remStr}rem  /*${res.designSize}px*/`, CompletionItemKind.Snippet);
          item.insertText = `'${res.remStr}rem'`;
          return resolve([item]);
        } else {
          return resolve([]);
        }
      });
    }
  
    private getPrefix(document: TextDocument, position: Position) {
      const line = document.getText(new Range(new Position(position.line, 0), position));
  
      const match = line.match(this.regexExp);
      if (match && this.prefixExp.test(match[0])) {
        const options = this.options;
        const designSize = options.designSize;
        const keepFloat = options.keepFloat;
        const splitNumber = options.splitNumber;
        const pxStr = match[0].match(this.numExp);
        const pxNum = Number(pxStr);
        const remStr = (pxNum * splitNumber / options.designSize).toFixed(keepFloat);
        return {
          pxStr,
          remStr,
          designSize,
        };
      } else {
        return false;
      }

    }
  }
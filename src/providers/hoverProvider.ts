'use strict';

import {
    HoverProvider as vsHoverProvider,
    TextDocument,
    Position,
    ProviderResult,
    Hover,
    Uri,
    MarkdownString
} from "vscode";
import * as util from '../util';

export default class HoverProvider implements vsHoverProvider {
  provideHover(doc: TextDocument, position: Position): ProviderResult<Hover> {
    const fileName = doc.fileName;
		if (fileName.endsWith('composer.lock')) {
      const line = doc.lineAt(position.line);
      const lineText = line.text;
      const lineTextPosition = doc.getText(doc.getWordRangeAtPosition(position));
      const resMatch = lineText.match('"content-hash": "(.*?)"');
      if (resMatch !== null) {
        for (let item of resMatch) {
          if (!item.includes(lineTextPosition)) {
            continue;
          }
          const filePath = fileName.replace(/composer\.lock$/, 'composer.json');
          const composerObj = util.getComposerObj(filePath);
          if (!composerObj) {
            return new Hover(new MarkdownString('composer.json not found !'));
          }
          const contentHash = util.getContentHash(composerObj);
          const markdownText = 'correct content-hash:`' + contentHash + '`';
          return new Hover(new MarkdownString(markdownText));
        }
      }
    }
  }
}
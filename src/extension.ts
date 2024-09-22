// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import { languages, ExtensionContext, commands, window, TextEditor, TextEditorEdit } from 'vscode';
import HoverProvider from './providers/hoverProvider';
import { getComposerObj, getContentHash } from './util';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: ExtensionContext) {
	const hover = languages.registerHoverProvider({ scheme: 'file', language: 'json' }, new HoverProvider());
	context.subscriptions.push(hover);
	
	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	const disposable = commands.registerTextEditorCommand('extension.composerLockFix', (textEditor: TextEditor, edit: TextEditorEdit) => {
		const doc = textEditor.document;
		const fileName = doc.fileName;
		if (fileName.endsWith('composer.lock')) {
			const filePath = fileName.replace(/composer\.lock$/, 'composer.json');
			const composerObj = getComposerObj(filePath);
			if (!composerObj) {
				window.showErrorMessage('composer.json not found !');
				return;
			}
			const contentHash = getContentHash(composerObj);
			// const contentHash = filePath;
			
			const selectedText = textEditor.document.getText(textEditor.selection);
			if (selectedText !== contentHash) {
				edit.replace(textEditor.selection, contentHash);
			}
			window.showInformationMessage('composer.lock fixed content-hash success !');
		}
	});

	context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}

import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
  // let disposable = vscode.commands.registerCommand('yep--.doThing', (text: string) => {
  let disposable = vscode.commands.registerCommand('yep--.doThing', () => {
    const editor = vscode.window.activeTextEditor;
    if (editor && vscode.workspace.workspaceFolders) {
      const folderpath = vscode.workspace.workspaceFolders[0].uri.path;
      let text = "nee";
      const newPath = folderpath+"/"+ text +".py";
      vscode.window.showInformationMessage(newPath)
      vscode.workspace.fs.rename(editor.document.uri, vscode.Uri.file(newPath), {
        overwrite: false
      });
    }
  });
  context.subscriptions.push(disposable);
  vscode.workspace.onDidChangeTextDocument(event => {
    // Register your current document as your current active editor
    const activeEditor = vscode.window.activeTextEditor;
    const text = event.document.getText();
    if (activeEditor && event.document === activeEditor.document) {
        vscode.commands.executeCommand('yep--.doThing', text);
    }
  });
}

export function deactivate() { }

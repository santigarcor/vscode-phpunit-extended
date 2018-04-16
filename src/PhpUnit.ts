import { workspace, window } from 'vscode';
import cp = require('child_process');
const fs = require('fs');

export class PhpUnit {
    private args;
    private putFsPathIntoArgs;
    private outputChannel;
    public static lastCommand;
    public static currentTest;

    constructor(outputChannel, args: string[], putFsPathIntoArgs: boolean = true) {
        this.outputChannel = outputChannel;
        this.args = args;
        this.putFsPathIntoArgs = putFsPathIntoArgs;
    }

    public run() {
        let config = workspace.getConfiguration("phpunit");
        let phpunitPath = config.get<string>("execPath", "phpunit");

        if (phpunitPath == "") {
            this.execThroughComposer(phpunitPath);
        } else {
            this.execPhpUnit(phpunitPath);
        }
    }

    private execThroughComposer(phpunitPath: string, currentPath = '') {
        let phpUnitComposerBinFile = this.findNearestFileFullPath('vendor/bin/phpunit');

        if (phpUnitComposerBinFile != null) {
            this.execPhpUnit(phpUnitComposerBinFile);
        } else {
            window.showErrorMessage('Couldn\'t find a vendor/bin/phpunit file.');
        }
    }

    public execPhpUnit(phpunitPath: string, workingDirectory = null) {
        this.outputChannel.clear();

        workingDirectory = workingDirectory == null ? this.findWorkingDirectory() : workingDirectory;

        if (workingDirectory == null) {
            return;
        }

        if (this.putFsPathIntoArgs) {
            this.args.push(window.activeTextEditor.document.uri.fsPath);
        }

        PhpUnit.lastCommand = {
            phpunitPath,
            workingDirectory,
            args: this.args.slice(),
            putFsPathIntoArgs: false
        };

        let command = '';

        if (/^win/.test(process.platform)) {
            command = 'cmd';
            this.args.unshift(phpunitPath);
            this.args.unshift('/c');
        } else {
            command = phpunitPath;
        }

        let phpunitProcess = cp.spawn(
            command,
            this.args,
            { cwd: workingDirectory.replace(/([\\\/][^\\\/]*\.[^\\\/]+)$/, ''), env: workspace.getConfiguration('phpunit').envVars }
        );

        PhpUnit.currentTest = phpunitProcess;

        this.outputChannel.appendLine(phpunitPath + ' ' + this.args.join(' '));

        phpunitProcess.stderr.on("data", (buffer: Buffer) => {
            this.outputChannel.append(buffer.toString());
        });
        phpunitProcess.stdout.on("data", (buffer: Buffer) => {
            this.outputChannel.append(buffer.toString());
        });
        phpunitProcess.on("close", (code) => {
            let status = code == 0 ? 'ok' : 'error';
            workspace.getConfiguration('phpunit').scriptsAfterTests[status]
                .forEach(script => {
                    if (typeof script === 'string') {
                        cp.spawn(script);
                    } else {
                        cp.spawn(script.command, script.args);
                    }
                });
        });

        phpunitProcess.on("exit", (code, signal) => {
            if (signal != null) {
                this.outputChannel.append('Cancelled');
            }
        });

        this.outputChannel.show();
    }

    private findNearestFileFullPath(fileRelativeName, currentPath = '') {
        let rootPath = workspace.rootPath;

        if (currentPath == '') {
            let filePath = window.activeTextEditor.document.uri.fsPath;
            currentPath = filePath.replace(/([\\\/][^\\\/]*\.[^\\\/]+)$/, '');
        } else {
            currentPath = currentPath.replace(/[\\\/][^\\\/]*$/, '');
        }

        let fileFullPath = `${currentPath}/${fileRelativeName}`;

        if (fs.existsSync(fileFullPath)) {
            return fileFullPath;
        } else if (currentPath != rootPath) {
            return this.findNearestFileFullPath(fileRelativeName, currentPath);
        } else {
            return null;
        }
    }

    private findWorkingDirectory() {
        let workingDirectory = this.findNearestFileFullPath('phpunit.xml')
            || this.findNearestFileFullPath('phpunit.xml.dist');

        if (workingDirectory == null) {
            window.showErrorMessage('Couldn\'t find a working directory.');
        }

        return workingDirectory;
    }

    static cancelCurrentTest() {
        if (PhpUnit.currentTest) {
            PhpUnit.currentTest.kill();
            PhpUnit.currentTest = null;
        } else {
            window.showInformationMessage("There are no tests running.");
        }
    }
}

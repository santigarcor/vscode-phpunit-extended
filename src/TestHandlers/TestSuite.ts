import {PhpUnit} from '../PhpUnit';
import { workspace } from 'vscode';

export class TestSuite {

    private editor;
    private args;
    private outputChannel;
    private withExclutions;

    constructor(editor, args, outputChannel, withExclutions = false) {
        this.editor = editor;
        this.args = args;
        this.outputChannel = outputChannel;
        this.withExclutions = withExclutions;
    }

    public run() {
        let config = workspace.getConfiguration("phpunit");

        if (this.withExclutions) {
            this.args.push('--exclude-group');
            this.args.push(config.get<Array<string>>("excludedGroups", []).join(','));
        }

        (new PhpUnit(this.outputChannel, this.args, false)).run();
    }
}

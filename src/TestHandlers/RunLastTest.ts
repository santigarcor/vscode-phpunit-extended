import {PhpUnit} from '../PhpUnit';

export class RunLastTest {

    private editor;
    private args;
    private outputChannel;

    constructor(editor, args, outputChannel) {
        this.editor = editor;
        this.args = args;
        this.outputChannel = outputChannel;
    }

    public run() {
        if (PhpUnit.lastCommand == null) {
            this.outputChannel.appendLine("No test was run yet.");
            this.outputChannel.show();
        } else {
            let phpunit = new PhpUnit(
                this.outputChannel,
                PhpUnit.lastCommand.args,
                PhpUnit.lastCommand.putFsPathIntoArgs
            );

            phpunit.execPhpUnit(
                PhpUnit.lastCommand.phpunitPath,
                PhpUnit.lastCommand.workingDirectory
            );
        }
    }
}

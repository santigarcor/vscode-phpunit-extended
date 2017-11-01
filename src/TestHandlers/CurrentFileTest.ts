import {PhpUnit} from '../PhpUnit';

export class CurrentFileTest {

    private editor;
    private args;
    private outputChannel;

    constructor(editor, args, outputChannel) {
        this.editor = editor;
        this.args = args;
        this.outputChannel = outputChannel;
    }

    public run() {
        (new PhpUnit(this.outputChannel, this.args)).run();
    }
}

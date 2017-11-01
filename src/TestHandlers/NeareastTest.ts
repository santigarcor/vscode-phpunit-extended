import {Helper} from '../Helper';
import {PhpUnit} from '../PhpUnit';

export class NeareastTest {

    private editor;
    private args;
    private outputChannel;

    constructor(editor, args, outputChannel) {
        this.editor = editor;
        this.args = args;
        this.outputChannel = outputChannel;
    }

    public run() {
        if (this.editor.document.fileName == null) {
            return;
        }

        let currentTest = (new Helper).getClassNameOrMethod(this.editor, 'method');

        if (currentTest) {
            this.args.push("--filter");
            this.args.push(currentTest);

            (new PhpUnit(this.outputChannel, this.args)).run();
        }
    }
}

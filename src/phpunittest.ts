'use strict';

import * as vscode from 'vscode';
import { SelectWindowTest } from './TestHandlers/SelectWindowTest';
import { CurrentFileTest } from './TestHandlers/CurrentFileTest';
import { TestSuite } from './TestHandlers/TestSuite';
import { NeareastTest } from './TestHandlers/NeareastTest';
import { RunLastTest } from './TestHandlers/RunLastTest';

import cp = require('child_process');
const fs = require('fs');

export class TestRunner {
    private outputChannel: vscode.OutputChannel;

    constructor(channel) {
        this.outputChannel = channel;
    }

    public runTest() {
        this.executeTest('select-window');
    }

    public runCurrentFileTest() {
        this.executeTest('current-file');
    }

    public runTestSuite() {
        this.executeTest('suite');
    }

    public runNearestTest() {
        this.executeTest('nearest');
    }

    public runLastTest()
    {
        this.executeTest('last');
    }

    public runTestDirectory() {
        // const editor = vscode.window.activeTextEditor;
        // if (editor) {
        //     let currentDir = editor.document.uri.fsPath.replace(/(\/|\\)\w*\.php$/i, '');
        //     // this.execTest(`${currentDir}`);
        // } else {
        //     console.error("Couldn't determine directory. Make sure you have a file open in the directory you want to test.");
        // }
    }

    private executeTest(type: string) {
        let config = vscode.workspace.getConfiguration("phpunit");
        let args = [].concat(config.get<Array<string>>("args", []));
        const editor = vscode.window.activeTextEditor;
        let testHandler;

        switch (type) {
            case 'select-window':
                testHandler = new SelectWindowTest(editor, args, this.outputChannel);
                break;
            case 'current-file':
                testHandler = new CurrentFileTest(editor, args, this.outputChannel);
                break;
            case 'suite':
                testHandler = new TestSuite(editor, args, this.outputChannel);
                break;
            case 'nearest':
                testHandler = new NeareastTest(editor, args, this.outputChannel);
                break;
            case 'last':
                testHandler = new RunLastTest(editor, args, this.outputChannel);
                break;
        }

        testHandler.run();
    }

  /*   private execTest(directory: string, nearest = false)
    {
        if (directory != null && directory != "")
        {
            args.push(directory);

            // Run directory test.
            this.resolvePhpUnit(args, false);
            return;
        } else if (!editor)
        {
            // Run test according to --configuration flag.
            this.resolvePhpUnit(args, false);
            return;
        }

    } */
}

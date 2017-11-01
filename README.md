# Phpunit for VSCode
## Setup
* Install [phpunit](https://phpunit.de/).
* Set the config values:
```JSON
{
    "phpunit.execPath": "path/to/phpunit", // If this value is set to '' it will try to use the composer phpunit installation.
    "phpunit.args": [
        "--configuration", "./phpunit.xml.dist"
    ]
}
```

## How to use
Run with (`Cmd+Shift+P` on OSX or `Ctrl+Shift+P` on Windows and Linux) and execute:
* `PHPUnit Test Nearest`: This command will search the nearest function from the cursor position until the file's beginning.

![vscode-phpunit-test-function](images/test-nearest.gif)

* `PHPUnit Test Current File`: This command will test the current active file.

![vscode-phpunit-test-function](images/test-file.gif)

* `PHPUnit Test All Suite`: This command will run all the test suite.

![vscode-phpunit-test-function](images/test-suite.gif)

* `PHPUnit Cancel Current Test`: This command will cancel the current running test.

![vscode-phpunit-test-function](images/test-cancel.gif)

* `PHPUnit Run Last Test`: This command will run the last test ran.

![vscode-phpunit-test-function](images/test-last.gif)

## Notes / Tips / Advanced
* **args** is recommended to set in your 'workspace settings'. You can add any phpunit args, check phpunit --help.
* To hook into the debugger ([github.com/felixfbecker/vscode-php-debug](https://github.com/felixfbecker/vscode-php-debug)). Add Key:`XDEBUG_CONFIG`, Value:`idekey=VSCODE` to your environment variables.

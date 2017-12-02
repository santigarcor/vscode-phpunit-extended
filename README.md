# Phpunit for VSCode
## Setup
* Install [phpunit](https://phpunit.de/) or have phpunit installed through composer.
* Set the config values:
```JSON
{
    "phpunit.execPath": "path/to/phpunit", // If this value is set to '' it will try to use the composer phpunit installation.
    "phpunit.args": [
        "--configuration", "./phpunit.xml.dist"
    ],
    "phpunit.envVars": {
        // Here you can define the environment variables to be set before executing phpunit
    }
}
```

## How to use
Run with (`Cmd+Shift+P` on OSX or `Ctrl+Shift+P` on Windows and Linux) and execute:
* `PHPUnit Test Nearest`: This command will search the nearest function from the cursor position until the file's beginning.

![test-nearest](images/test-nearest.gif)

* `PHPUnit Test Current File`: This command will test the current active file.

![test-file](images/test-file.gif)

* `PHPUnit Test All Suite`: This command will run all the test suite.

![test-suite](images/test-suite.gif)

* `PHPUnit Test`: This command will show a window to pick the test to run.

![test-pick](images/test-pick.gif)

* `PHPUnit Run Last Test`: This command will run the last test ran.

![test-last](images/test-last.gif)

* `PHPUnit Cancel Current Test`: This command will cancel the current running test.

![test-cancel](images/test-cancel.gif)

## Notes / Tips / Advanced
* **args** is recommended to set in your 'workspace settings'. You can add any phpunit args, check phpunit --help.
* To hook into the debugger ([github.com/felixfbecker/vscode-php-debug](https://github.com/felixfbecker/vscode-php-debug)). Add Key:`XDEBUG_CONFIG`, Value:`idekey=VSCODE` to your `phpunit.envVars` object.

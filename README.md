# Development
## Extension Recommendations
[vscode-bitburner-connector](https://github.com/bitburner-official/bitburner-vscode) ([vscode extension marketplace](https://marketplace.visualstudio.com/items?itemName=bitburner.bitburner-vscode-integration)) to upload your files into the game

[vscode-eslint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) to use live linting in editor

There is a workspace file in `.vscode` which contains the recommended settings for all of these

## Dependencies
[Node.js](https://nodejs.org/en/download/) required for compiling typescript and installing dependencies

## Installation
```
git clone https://github.com/bitburner-official/vscode-template
npm install
npm run defs
```

## Automatic Upload to Bitburner
Write all your typescript source code in the `/src` directory

To autocompile as you save, run `npm run watch` in a terminal

To update your Netscript Definitions, run `npm run defs` in a terminal

Press F1 and Select `Bitburner: Enable File Watcher` to enable auto uploading to the game

If you run `watcher.js` in game, the game will automatically detect file changes and restart the associated scripts

## Imports
To ensure both the game and typescript have no issues with import paths, your import statements should follow a few formatting rules:

 * Paths must be absolute from the root of `src/`, which will be equivalent to the root directory of your home drive
 * Paths must contain no leading slash
 * Paths must end with no file extension

 ### Examples:

To import `helperFunction` from the file `helpers.ts` located in the directory `src/lib/`: 

```js
import { helperFunction } from 'lib/helpers'
```

To import all functions from the file `helpers.ts` located in the `src/lib/` directory as the namespace `helpers`:

```js
import * as helpers from 'lib/helpers'
```

To import `someFunction` from the file `main.ts` located in the `src/` directory:

```js
import { someFunction } from 'main'
```

# Running scripts

Scripts can mostly be run on their own, but are primarily designed to be orchestrated by `daemon.js`. If you `run daemon.js` from the terminal, it will start several other scripts.

## Customizing
Near the top of the main method, there are a list of scripts that are spanwed initially, and periodically. Some may be commented out (for example host-manager, I like to manually manage when servers are bought lately - but you may wish to re-enable this.) Once you've downloaded this file, you should customize it with the default options you like, and comment out the external scripts you don't want to run.

## Alias

You may find it useful to set up an alias with the default options you like rather than editing the file itself. I personally use:

`alias start="run daemon.js -v --tail --stock-manipulation"`

This way I can just enter `start` in the terminal after each reset, and the rest is handled automatically.


# Contributing

This is my own repository of scripts for playing Bitburner.
I often go to some lengths to make them generic and customizable, but am by no means providing these scripts as a "service" to the bitburner community.
It's meant as an easy way for me to share code with friends, and track changes and bugs in my scripts.

- If you wish to use my scripts or copy from them, feel free!
- If you think you found a bug in them and want to let me know, awesome!
- Please don't be insulted if you make a feature request, bug report, or pull request that I decline to act on.
While I do like my work to be helpful to others and re-used, I am only willing to put so much effort into customizing it to others' specific needs or whims.
You should fork the code, and start tweaking it the way you want it to behave. That's more in the spirit of the game!

# Credits

Bitburner Discord: https://discord.gg/MVczdU9fu6

| Repo| Description |
| --- | --- |
| [alainbryden/bitburner-scripts](https://github.com/alainbryden/bitburner-scripts) | Original Fork and starting place for most scripts |
| [vscode-tempalte](https://github.com/bitburner-official/vscode-template) | Bitburner VSCode template repo and typscript setup |
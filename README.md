# UI Package
This package wraps a JS User Interface, with its library requirements.

## To Install
install yarn packages at root repo level
`yarn install`

## To Run
Follow run instructions in example-ui/README.md
TL;DR - `cd example-ui; yarn start`;

## Updating JS-Libs
Generally, the js-libs module is intended to be used/treated as a git submodule.

Accordingly, when updating the js-libs module, you will need to re-build that module
in order for your changes to be accessible in the main UI.

`cd js-libs; yarn build`

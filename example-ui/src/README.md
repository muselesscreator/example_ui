# JS User Interface Architecture

## Overview
The architecture for React/Redux user interfaces using this library is focused around scalability,
and compartmentalization.

Some important separations/distinctions:
 * Display code (React Components) is separated from model/logic code (Redux stores).
 * Code intended to be re-used across User Interfaces is separated into its own repo (js-libs).

## UI Table of Contents
 * `assets/`
   * image assets that should be shipped with the user interface.
   * NOTE: you will want to implement a non-git way of managing the image assets.
 * `comms/`
   * Contains all network-api-specific logic (data format, websocket comms, etc).
 * `components/`
   * Contains a link to the re-usable components library
   * Contains all general-use components for this User Interface
   * Sub-components (components only ever used within a single parent) may be grouped under their parent components
 * `scss/`
   * App-level scss files
   * Color theme/variable naming.
 * `store/`
   * App-level redux store module, connects all included submodules into one global store.
   * Global-level thunk actions (for interactions across modules)
   * Global-level selectors (for data selection across modules)
 * `utils/`
   * Contains selector/transform logic that is not directly associated with a redux store
   * i.e. unit conversions, etc.
 * `variables/`
   * Contains a collection of variables files for tracking re-used keys/values.
 * `views/`
   * Contains all top-level application view components.
   * view-specific components should be grouped under their parent.

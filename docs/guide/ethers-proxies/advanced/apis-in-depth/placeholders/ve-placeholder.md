# `VEPlaceholder`

The `VEPlaceholder` class is never used directly in Tulipe but is the parent of every other Ethers placeholder classes.

Here is the detailed Application Programming Interface of a `VEPlaceholder` instance :


## Properties

- `.status`:
 - type: `null`
 - indication: must be overriden with a `VEStatus` instance by child classes
- `.safeStatus`:
 - type: `null`
 - indication: must be overriden with a status name `String` by child classes
- `.isSafe` :
  - type: computed property
  - returns :`true` if `.status` is equal to `.safeStatus`, else `false`


## Methods
- `.onSafe(<callback>)` : execute `callback` when `.isSafe` is `true`

## Components
- `.OnSafe` : render given `slot` when `.isSafe` is `true`

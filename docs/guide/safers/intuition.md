---
title: Safers ~ Intuition
layout: doc
---

# Intuition
When your DApp loads, many asynchronous initialization stuff are performed by Tulipe in order to setup a safe and complete environment.

In addition, after the first initialization, the DApp context may constantly changes (eg. user wallet is now connected), and other things will have to be initialized and managed on-the-fly.

The number of different states your DApp can take is so really huge.

## Problem
It can be difficult in such a context to write safe code while many elements of your DApp can be impresivably safe or unsafe depending on this complex context.

For example, accessing or mutating the `dapp` object before the DApp initialization is considered unsafe as it can lead to errors and/or unexpected behaviors.

Another example, using the user's wallet before this one is connected to the DApp is also considered unsafe for the same reasons.

## Tulipe' approach
To help developers to always write safe code, Tulipe comes with safety tools called **safers**.

With safers, no matter if your are coding in scripts or in templates, you can easily wrap your code in a safer method/component in order to make this one safe.

When your code is wrapped it is safe, Tulipe manages everything for you.

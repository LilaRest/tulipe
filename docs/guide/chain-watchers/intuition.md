---
title: Chain watchers ~ Intuition
layout: doc
---

# Intuition

When developing reactive web DApps we need to regularly fetch datas from the chain to always display the most up-to-date ones to the user.

A raw way to achieve that is to create a while loop for each data we want to track to request every X seconds the chain for that data.

However this method has a major problem, even for tiny projects we quickly end with tens of infinite loops running in background which can affects a lot the performances of our app.
In addition, this raw way implies that developers write 50+ times this while loop and all code required to make it safe in the project, which leads to more complex and so less maintainable code.

Assuming that mutation of datas on chain requires a new block, a smarter way to achieve that is to create **a single** infinite loop that checks every X seconds if the block number has changed, and if it has, only then it fetches all the datas required by the DApp.

**This drastically reduces the number of requests** and so improves a lot performances.

A way to improves even more this system is to associate a contract or wallet address to each data, and to update it only if its associated address appears in the new block's transactions. This again drastically reduces the number of requests.

Also if multiple places of our DApp are tracking the same data we can group them and perform only one chain request to update them all.

## Problem
[Drizzle](https://trufflesuite.com/drizzle/) was a JS tool that was providing such a system, however it is not updated since Sep, 2020 (at writing time) and its VueJS version is based on the deprecated Vuex store.

Also, in my own opinion, this tool is much more complex than it should be.

## Tulipe' approach
To solve that problem Tulipe' introduces **chain watchers**
They provides a way to easily watch any on-chain data and **it feels like watching any ref in Vue !**

So thanks to Tulipe you can now watch any on-chain data in an intuitive and simple way : only one method call is required.

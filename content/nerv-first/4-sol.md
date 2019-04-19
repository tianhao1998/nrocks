---
id: 4-sol
title: 合约编程语言 Solidity
permalink: nerv-first/4-sol.html
prev: 3-dev.html
next: 5-rpc.html
---

编写智能合约绕不过去的一个坑就是要学新的编程语言，其中最知名的一个就是 Solidity 。这篇小文是 Solidity 的一个开发入门。首先介绍 Solidity 的诞生和自我定位，接下来聊聊 Solidity 的一些具体特点，最后介绍一下网上 Peter 觉得最优秀的学习 Solidity 的网站资源。

## Solidity 定位

先来讲讲 Solidity 的诞生和定位。

故事还是要从以太坊说起，为了开发强大的智能合约，以太坊开发了 EVM ，也就是以太坊虚拟机，Solidity 编译后可以在 EVM 之上运行。之后的 2016 和 2017 年，智能合约爆发，Solidity 也被其他的区块链项目搬到了自己的平台上，所以在其它平台，例如 Nervos 上， 开发智能合约也都会用 Solidity 语言。

按照官网的说法，Solidity 是一个面向合约开发（ contract-oriented ）的高级语言，借鉴了其他一些高级语言，例如 Javascript 和 Python，的特性。它是一门静态类型语言，支持继承，支持各种库和用户自定义的类型。非常适合用来开发类似于投票，众筹，拍卖，多重签名钱包等各种功能。

简单一句话，Solidity 就是为智能合约和区块链而生。

## 核心语言特性

这时候我们心中最大的疑问是，为啥不直接用目前已经非常流行的语言，例如 Javascript ，来开发智能合约呢？来看看 Solidity 提供了哪些特有的语言特性。

首先，其他语言都有很多功能是在智能合约开发的时候用不到的。所以如果在区块链上直接支持传统语言必然会显得有些臃肿，影响运行效率。同时，需要用的一些语言特性又没有。而 Solidity 是专门设计来做智能合约开发的，所以自然可以做到小巧而专用。

Solidity 是面向合约的编程语言。传统编程语言对于编写合约是没有特殊支持的，Solidity 就专门对此作了优化，甚至专门添加了一个关键字，就叫 contract 。 另外还有类似 address 这样的数据类型，也是为了方便在区块链条件下来进行开发的。

所以说，Solidity 之所以能流行起来就是因为它的小巧而专用，和专门的对智能合约开发所做的优化。

## 参考资料

最后给大家介绍一下几个学习 Solidity 的最优秀的网站和工具。

第一个是 Remix ，remix.ethereum.org 。这是以太坊官方推出的一个 Solidity 的在线集成开发环境。提供了文件浏览器，带高亮支持的代码编辑器，调试工具，甚至有编译功能。Remix 是每个 Solidity 开发者都在用的项目。

第二个是 Solidity 官网，是有中文版的哦， https://solidity-cn.readthedocs.io/zh/develop/ 。官网上介绍了，合约编译输出之后的元数据的作用，什么是 ABI ，也就是应用二进制接口，以及合约的结构，各种语言类型的详细说明等等重要信息，是上手智能合约编程之前的必备基础。

最后一个不得不提的资源是，https://cryptozombies.io/ 。这是一个第三方的在线智能合约学习环境，目标是教会大家实现 DApp 游戏。这个网站的特点是制作非常精良，各种辅助学习材料丰富，并且是对 Solidity 小白友好的。

好，我想推荐的资源就是这三个了。

## 总结

来总结一下本文要点。Solidity 是一门诞生在以太坊之上的新语言，因为非常适合做合约开发，目前已经被很多其他区块链项目移植到自己的平台之上。Solidity 足够小巧足够安全，让它非常适合运行在区块链上成为智能合约语言，同时 Solidity 还为智能合约做了语言层面的优化，增加了一些方便的功能。

参考：

- https://en.wikipedia.org/wiki/Solidity
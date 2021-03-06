---
id: 13-neuron
title: Neuron 钱包作为 DApp 的运行环境
permalink: nerv-first/13-neuron.html
prev: 12-react.html
---

私钥写死到代码里面显然不是一个 DApp 应该有的状态，本节就来把账户信息从源码中移除。这样 DApp 运行在浏览器中就不能签名交易了，也就不能发送留言了。解决方式就是让 DApp 运行在 AppChain 官方的 Neuron 钱包中。

## Neuron 基本原理

所以我们先介绍一下 Neuron 的基本工作原理。

首先 Neuron 是一个加密货币钱包，所以传统上一个加密货币钱包应该有的基本功能 Neuron 也是有的。具体来讲就是为用户管理私钥，用户可以把自己的各种加密货币导入钱包中，通过钱包进行转账操作。嗯，没错，钱包的基本作用就是用来进行转账，而转账的实质就是用私钥去签署交易，这样交易就会得到有效的授权，转账也就成功了。

但是 Neuron 不是一个传统钱包，而是一个 DApp 钱包。Neuron 可以理解成一个浏览器，我们用 Web 技术开发的 DApp 是直接可以运行在 Neuron 里面的，注意，不需要浏览器，只要在 Neuron 打开 DApp 就可以。当然 Neuron 要比浏览器的功能多，其中最重要的依然是 Neuron 中可以完成签名交易的功能。跟 DApp 互动的时候，签名交易的目的都是为了操作 DApp 的智能合约，而不是普通意义上的用户 A 给用户 B 进行转账了。

更多关于 Neuron 的介绍可以参考官方文档：https://docs.nervos.org/neuron-android/#/ 。下面我们操作的的大思路是这样：把 DApp 中的用户私钥信息从代码中移除，当 DApp 需要跟智能合约交互的时候，让 Neuron 去负责签名。

## 代码调整

更多的细节我们跟着代码一起来聊。

```
cp dapp1 dapp2
```

把上一节中的 dapp1 文件夹拷贝一份，命名为 dapp2 ，代码调整我们都在 dapp2 中去完成，也就是说 dapp2 中最终会变成一个可以跟 Neuron 互动的 DApp 。

首先到 transaction.js 中

```js
-const nervos = require('./nervos')
const transaction = {
- from: nervos.appchain.accounts.wallet[0].address,
- privateKey: nervos.appchain.accounts.wallet[0].privateKey,
```

其他内容不动，删除三行。首先删除对 nervos 的导入。然后删除 `from` 和 `privateKey` 两项，也就是账户信息删除掉，因为这些信息应该由 Neuron 来提供了。

nerovs.js

```js
const { default: Nervos } = require('@nervos/chain')

const config = require('./config')
if (typeof window.nervos !== 'undefined') {
  window.nervos = Nervos(window.nervos.currentProvider)
  window.nervos.currentProvider.setHost('https://node.cryptape.com')
} else {
  console.log('No Nervos web3? You should consider trying Neuron!')
  // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
  window.nervos = Nervos(config.chain)
}
var nervos = window.nervos

module.exports = nervos
```

再到 nervos.js 文件中，首先导入 Nervos ，然后导入配置。因为 Neuron 是 Nervos AppChain 专用的钱包，所以只要在 Neuron 中打开项目， `window.nervos` 这个全局变量默认就是存在的。所以 if 条件肯定是满足的。再看 if 成立的代码块中这两条语句，由于 Neuron 是支持多链的，所以这里要明确指明一下，当前 DApp 要去交互的是哪条链。这里 node.cryptape.com 对应的就是测试链，或者准确的说是测试链上的一个节点。因为区块链一定是一个网络，网络上的节点数量一般都不是一个。这里要注意的是保证设置的链就是我们部署合约的链。`else` 代码块中的语句是为了应对 DApp 不运行在 Neuron 中的情况，我们可以忽略这部分。另外补充一点，到底要使用哪条链，也可以在 manifest.json 文件中去配置，具体细节可以参考官方案例：https://github.com/cryptape/nervos-appchain-docs/blob/develop/zh-CN/quick-start/build-dapp.md#%E9%85%8D%E7%BD%AE-manifestjson ，我们这里也忽略。

config.js

```js
- chain: 'http://121.196.200.225:1337 ',
- privateKey:
-  '0x5d3c73fa94c85bbcb516cb256a4e82c414255a270b5d065179a94aa0d5dc3efe',
```

config.js 中要删除两项内容。一项是 chain ，参考官方文档，https://docs.nervos.org/nervos-appchain-docs/#/quick-start/deploy-appchain ，可以看到这里这个链接跟上面我们在 nervos.js 中设置的 node.cryptape.com ，都是同一测试链节点。所以这里就不用重复指定了。要删除的第二项是 `privateKey` ，因为签署交易用的是 Neuron 钱包中的账户。最终 config.js 保留的就是一个合约地址了。

App.js

```js
   const tx = {
      ...simpleStore.transaction,
+     from: window.neuron.getAccount(),
      validUntilBlock: +current + 88
    }

  componentDidMount = async () => {
-  const from =
-     nervos.appchain.accounts.wallet[0] &&
-     nervos.appchain.accounts.wallet[0].address
+   const from = window.neuron.getAccount()
```

App.js 中也要稍作调整。交易的发起方，不再是从本地代码中去获取了，而是通过 `window.neuron.getAccount()` 去从钱包中获取。

至此，代码调整咱们就完成了，内容比较多，大家手动跟着我改比较容易改错，可以直接下载 Github 上我存放的代码： https://github.com/happypeter/NervFirst/tree/master/dapp2 。

## 到钱包中测试

下面来实际的测试一下。

```
yarn start
```

首先把 react 项目启动起来，比如启动到了 localhost:3000 。

```
ifconfig|grep 192
```

查看一下我们开发机的本地局域网 IP ，比如我这里是 192.168.1.108 。

下面来找一部 Andriod 手机，安装 Neuron 。然后按照界面上的步骤，去创建测试链账户，并且也去申请一些测试链代币。过程都是比较直白的，咱们这里就不演示了。接下来就输入 192.168.1.108:3000 ，在 Neuron 中打开 DApp 。

可以随意输入一些文字，然后点提交。接下来会弹出的几个界面，但是总体要做的其实就是一件事，就是用钱包私钥签署一下交易。因为交易过程中虽然转账金额为0，但是还是要有手续费的，是要花 Gas 的。

![](https://img.haoqicat.com/2018091801.jpg)

交易成功后，到 https://microscope.cryptape.com/ ，输入我们的合约地址搜一下，可以看到界面上显示出合约账户下又多了一个交易，可见刚才的提交操作成功了。为了保持课程的简单，我们这里没有做出一套完整的 UI 体验。在 Github 仓库的 complete 文件夹下，我托管了官方的一个流程完整的代码镜像：https://github.com/happypeter/NervFirst/tree/master/complete/first_forever 。


## 总结

本节的内容就是这些了，我们把一个运行在浏览器中的 DApp ，改成了一个运行在 Neuron 钱包中的 DApp 。首先聊了 Neuron 作为一个 DApp 钱包的核心作用，那就是可以跟 DApp 配合，完成交易签名。接下来调整了代码，把代码中关于用户账户的信息全部删除掉，最后在 Neuron 中验证了，果然可以用 Neuron 中的私钥去成功签署交易。至此，我们的课程的核心内容也就介绍完毕了。

let router = require("koa-router")()

let webController = require("../controllers/web")
let walletController = require("../controllers/wallet")
let accountController = require("../controllers/account")
let transactionController = require("../controllers/transaction")
let netresourceController = require("../controllers/netResource")
let voteController = require("../controllers/vote")
let mneController = require("../controllers/mne")

// 钱包
router.post("/wallet/create", walletController.walletCreate)
router.post("/wallet/open", walletController.walletOpen)
router.get("/wallet/list", walletController.walletList)
router.post("/wallet/unlock", walletController.walletUnlock)
router.post("/wallet/lock", walletController.walletLock)
router.post("/wallet/importkey", walletController.walletImportPrivatekey)
router.post("/wallet/keys", walletController.walletGetKeys)
router.post("/wallet/createkey", walletController.walletCreateKey)
router.post("/wallet/privatekey", walletController.walletPubkeyGetPrivatekey)

// 账号
router.post("/account/listforwallet", accountController.accountListForWallet)
router.post("/account/create", accountController.accountCreate)
router.post("/account/balance", accountController.accountBalance)
router.post("/account/info", accountController.accountInfo)

// 转账交易
router.post("/transaction/send", transactionController.transactionSend)

// 网络资源
router.post("/net_resource/ram/info", netresourceController.netResourceGetRAMInfo)
router.post("/net_resource/ram/transaction", netresourceController.netResourceTransactionRAM)

// 页面
router.get("/wallet.html", webController.getWalletHtml)
router.get("/keyList.html", webController.getKeyListHtml)
router.get("/accountList.html", webController.getAccountListHtml)
router.get("/accountInfo.html", webController.getAccountInfoHtml)
router.get("/accountNew.html", webController.getAccountCreateHtml)
router.get("/transaction.html", webController.getTransactionHtml)
router.get("/ram.html", webController.getRamHtml)
router.get("/cpu.html", webController.getCpuHtml)
router.get("/net.html", webController.getNetHtml)
router.get("/vote.html", webController.getVoteHtml)
router.get("/mnemonic.html", webController.getMnemonicHtml)
router.get("/", webController.getWelcomeHtml)
router.get("/welcome.html", webController.getWelcomeHtml)
router.get("/about.html", webController.getAboutHtml)

// 网络资源
router.post("/net_resource/bandwidth/price", netresourceController.netResourceGetBandwidthPrice)
router.post("/net_resource/bandwidth/transaction", netresourceController.netResourceTransactionBandwidth)

// 超级节点列表
router.post("/vote/getProducers", voteController.listForProducers)
router.post("/vote/voteProducers", voteController.voteProducers)

// 助记词
router.get("/mne/create", mneController.createMne)
router.post("/mne/keys", mneController.mneKeys)

module.exports = router
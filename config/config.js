let binaryen = require('binaryen')

module.exports = {
    eosconfig:{
        // httpEndpoint:"http://127.0.0.1:8888",
        // chainId: "cf057bbfb72640471fd910bcb67639c22df9f92470936cddc1ade0e2f2e7dc4f", // 本地链 32 byte (64 char) hex string
        // httpEndpoint: "http://jungle2.eosdac.io:8882",
        // httpEndpoint: "http://api-mainnet.starteos.io",
        // chainId: "aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906", // 主链
        httpEndpoint: "http://jungle.eoscafeblock.com:8888",
        chainId: "e70aaab8997e1dfce58fbfac80cbbb8fecec7b99cf982a9444273cbc64c41473", // 测试链2
      //  keyProvider: ["5JT6kVaZY3p588HFBf3jNEixEeN8JED1h1j6GR5Y8MnBLF5Dfyt"], // WIF string or array of keys..
        binaryen: binaryen,
        expireInSeconds: 60,
        broadcast: true,
        verbose: false, // API activity
        sign: true
    },
    walletAddress:"http://127.0.0.1:8889",

    walletCreate:"/v1/wallet/create",
    walletOpen:"/v1/wallet/open",
    walletList:"/v1/wallet/list_wallets",
    walletUnlock:"/v1/wallet/unlock",
    walletLock: "/v1/wallet/lock",
    walletImportPrivatekey:"/v1/wallet/import_key",
    walletGetKeys:"/v1/wallet/list_keys",
    walletCreateKey:"/v1/wallet/create_key",

    accountListForKey:"/v1/history/get_key_accounts",
    accountBalance: "/v1/chain/get_currency_balance",
    accountInfo:"/v1/chain/get_account",
    producersInfo: "/v1/chain/get_producers",
  
}

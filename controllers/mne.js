
let httpRequest = require("../utils/httpRequest")
let config = require("../config/config")
var exec = require('child_process').exec; // key require for cmd operation.
let {success, fail} = require("../utils/myUtils")

var bip39 = require('bip39')
var eosEcc = require('eosjs-ecc')


module.exports = {
 
    // 生成助记词
    createMne: async (ctx) => {
      
       
            
        let promise = new Promise((resolve, reject) => {
       
            let words = bip39.generateMnemonic(128);
            console.log(words);
            resolve(words)

        })

        let result;
        // 第一个参数是成功的回调
        // 第二个参数是失败的回调
        await promise.then(function (data) {
            if (data.error) {
                result = fail(data.error)
                console.log(result)
            } else {
                result = success(data)
                console.log(result)
            }
        }, function(error) {
            result = fail(error)
            console.log(result)
        })

        ctx.body = result
        console.log(JSON.stringify(result)); 
     
    },

     // 通过助记词获取密钥
     mneKeys: async (ctx) => {
      
        console.log(ctx.request.body)
        let {words} = ctx.request.body
       
            
        let promise = new Promise((resolve, reject) => {
       
            if (!bip39.validateMnemonic(words)) {
                reject("error")
            }

            

            var eosPrivate = eosEcc.seedPrivate(words);
            console.log("EOS私钥：",eosPrivate)
            const eosPubkey = eosEcc.privateToPublic(eosPrivate);
            console.log("EOS公钥：",eosPubkey)

            keylists = []

            keylists.push(eosPubkey)
            keylists.push(eosPrivate)

            console.log(keylists);
            resolve(keylists)
            
            // words = words.toString()
            // console.log('words: ' + words); 
            // let seed = bip39.mnemonicToSeedSync(words)
           
            // console.log('seed: ' + seed); 
            // let seedHex = seed.toString('hex')
            // console.log('seedHex: ' + seedHex); 


            // bip39.

            // let root = bitcoin.HDNode.fromSeedHex(seedHex)
            // console.log('xprv: ' + root.toBase58())
            // console.log('xpub: ' + root.neutered().toBase58())

            // keylists = []

            // for (var i = 0; i < 10; i++) {
            //     key = []
            //     // 生成派生key:
            //     let child0 = root.derivePath("m/44'/194'/0'/0/" + toString(i));
            //     pri = child0.keyPair.toWIF()
            //     pub = child0.getAddress()
            //     console.log("prv m/194'/0'/0'/0/"+ toString(i) + pri)
            //     console.log("pub m/194'/0'/0'/0/"+ toString(i) + pub)
            //     key.push(pri)
            //     key.push(pub)
            //     keylists.push(key)
            // }
            // console.log(keylists);
            // resolve(keylists)

        })

        let result;
        // 第一个参数是成功的回调
        // 第二个参数是失败的回调
        await promise.then(function (data) {
            if (data.error) {
                result = fail(data.error)
                console.log(result)
            } else {
                result = success(data)
                console.log(result)
            }
        }, function(error) {
            result = fail(error)
            console.log(result)
        })

        ctx.body = result
        console.log(JSON.stringify(result)); 
     
    },

    
}
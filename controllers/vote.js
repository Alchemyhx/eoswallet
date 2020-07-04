
let httpRequest = require("../utils/httpRequest")
let config = require("../config/config")
var exec = require('child_process').exec; // key require for cmd operation.
let {success, fail} = require("../utils/myUtils")

module.exports = {
    // 获取超级节点列表
    listForProducers: async (ctx) => {
      
        let resData = await httpRequest.postRequest(config.producersInfo, { "json": true })
        if (resData.code == 0)
            console.log(resData)

       
        ctx.body = resData
    },

    // 给超级节点投票
    voteProducers: async (ctx) => {
      
        console.log(ctx.request.body)
        let {account, producers} = ctx.request.body
        var cmdStr = "cleos -u "+ config.eosconfig.httpEndpoint + " --wallet-url http://127.0.0.1:8889/ system voteproducer prods " + account + " " + producers + " -p " + account; 
        console.log(cmdStr)
       
        let promise = new Promise((resolve, reject) => {
            exec (cmdStr, function (err,stdout,stderr) { 
                if (err) { 
                    reject(err)
                    console.log(err) 
                } 
                else { 
                    // var data = JSON.parse(stdout); 
                    resolve(stdout)
                    console.log(stdout)
                } 
            });
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
        console.log('error:' + JSON.stringify(result)); 
        // data = fail(""+stderr)
        // ctx.body = data
        // console.log(stdout); 
        //             data = success(""+stdout)
        //             ctx.body = data
        // console.log(data)
        
    }

    
}
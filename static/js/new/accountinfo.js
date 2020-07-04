
// 账号代币
function updateAccountInfo(currentAccount) {

    $("#currentacc").text("当前账号："+localStorage.getItem("currentAccount"))
    let accountSelectList = $("#account-create-creator-select")
    accountSelectList.val(localStorage.getItem("currentAccount"))

    let params = {"code":"eosio.token","account":currentAccount}
    $.post("/account/balance", params, function (res, status) {
        console.log(status + JSON.stringify(res))
        //后端返回的数据结构如下
        //[{"symbol":"EOS", "amout":100}, {"symbol":"SYS", "amount":200}]
        if (res.code == 0) {
            var div2 = document.getElementById('coin-list')
            div2.innerHTML = ""
            res.data.forEach(balanceData => {
                let balanceTr = `<tr>
                    <td>${balanceData.symbol}</td>
                    <td>${balanceData.amount}</td>
                </tr>`
                div2.innerHTML += balanceTr 
            });
        }
    })

    $.post("/account/info", { "account": currentAccount }, function (res, status) {
        console.log(status + JSON.stringify(res))
        if (res.code == 0) {
            let data = res.data

            
            var div2 = document.getElementById('permission-list')
            div2.innerHTML = ""

            for (const index in res.data.permissions) {
                let permission = res.data.permissions[index]
                let publicKey = permission.required_auth.keys[0].key
                let rowTr = `<tr>
                    <td>${permission.perm_name}</td>
                    <td>${permission.required_auth.threshold}</td>
                    <td>${publicKey}</td>
                   
                    <td>${permission.required_auth.keys[0].weight}</td>
                </tr>`
                div2.innerHTML += rowTr

                for(let i = 1; i < permission.required_auth.keys.length; i++) {
                    let keyData = permission.required_auth.keys[i]
                    let rowTr = `<tr>
                        <td></td>
                        <td></td>
                        <td>${keyData.key}</td>
                       
                        <td>${keyData.weight}</td>
                    </tr>`
                    div2.innerHTML += rowTr
                };
            };



            let availableBalance = 0.0
            if (data.core_liquid_balance) {
                availableBalance = parseFloat(data.core_liquid_balance.slice(0,-4))
            }
            let redeemBalance = 0
            if (data.refund_request) {
                refundNetBalance = data.refund_request.net_amount.split(" ")[0]
                refundCpuBalance = data.refund_request.cpu_amount.split(" ")[0]
                redeemBalance = parseFloat(refundNetBalance) + parseFloat(refundCpuBalance)
            }
            let netBalance = data.net_weight / 10000
            let cpuBalance = data.cpu_weight / 10000
            // 总资产
            let totalBalance = availableBalance + redeemBalance + netBalance + cpuBalance
            $("#my-total-balance").text("总资产 " + totalBalance + " EOS")

            // 余额
            resourcelists = `
            <tr>
                              
            <td>${availableBalance} EOS</td>
            <td>${redeemBalance} EOS</td>
            <td>${netBalance} EOS</td>
            <td>${cpuBalance} EOS</td>
                            </tr>
            `
            var div1 = document.getElementById('Resource-list')
            div1.innerHTML = resourcelists
           

            // RAM
            let ramAvailable = (data.ram_quota - data.ram_usage) / 1024
            let ramTotal = data.ram_quota / 1024
           
            ramlists = `
            <tr>
            <td>${ramAvailable.toFixed(2)} KB</td>
            <td>${ramTotal.toFixed(2)} KB</td>
                            </tr>
            `
            div1 = document.getElementById('ram-list')
            div1.innerHTML = ramlists
         

            // NET
            let netAvailable = (data.net_limit.max - data.net_limit.used)/1024           
            let netTotla = data.net_limit.max/1024     
            
            netlists = `
            <tr>
            <td>${netBalance} EOS</td>
            <td>${netAvailable.toFixed(2)} KB</td>
            <td>${netTotla.toFixed(2)} KB</td>
                            </tr>
            `
            div1 = document.getElementById('net-list')
            div1.innerHTML = netlists
                       
            // CPU
            let cpuAvailable = (data.cpu_limit.max - data.cpu_limit.used) / 1000     
            let cpuTotla = data.cpu_limit.max / 1000      

            cpulists = `
            <tr>
            <td>${cpuBalance} EOS</td>
                    <td>${cpuAvailable} ms</td>
                    <td>${cpuTotla} ms</td>
                            </tr>
            `
            div1 = document.getElementById('cpu-list')
            div1.innerHTML = cpulists
            
        }
    })
}

$(document).ready(function () {
    let currentwallet = localStorage.getItem("currentwallet")
    
    if (!currentwallet) {
        return
    }
      

    // 选择账号列表
    let accountList = sessionStorage.getItem(`wallet-${currentwallet}-accounts`)
    accountList = JSON.parse(accountList)
    console.log("accountList",accountList)
    let accountSelectList = $("#account-create-creator-select")
    let accountSelectList1 = $("#account-create-creator-list")
    for(let i = 0; accountList && i < accountList.length; i++) {
        let account = accountList[i]
        let accountOption = `<option value="${account}">${account}</option>`
        let accountOption1 = `<option>${account}</option>`
        accountSelectList.append(accountOption)
        accountSelectList1.append(accountOption1)
    }
    
    console.log(localStorage.getItem("currentAccount"))
  
    updateAccountInfo(localStorage.getItem("currentAccount"))


    // 选择不同的账号
    accountSelectList.change(function() {
        console.log(this.value)
        localStorage.setItem("currentAccount", this.value)
        updateAccountInfo(this.value)
    })

    
})
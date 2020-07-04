
// 账号代币
function updateAccountInfo(currentAccount) {

 
    let accountSelectList = $("#account-create-creator-select")
    accountSelectList.val(localStorage.getItem("currentAccount"))

    $.post("/account/info", { "account": currentAccount }, function (res, status) {
        console.log(status + JSON.stringify(res))
        if (res.code == 0) {
            let data = res.data
        
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

        }
    })

    // NET价格
    $.post("/net_resource/bandwidth/price", { "account": currentAccount }, function (res, status) {
        console.log(status + JSON.stringify(res))
        if (res.code == 0) {
            $("#net-price").text(res.data.netPrice)
           
        }
    })

    
}

$(document).ready(function () {
    let currentwallet = localStorage.getItem("currentwallet")
    let walletPassword = localStorage.getItem(currentwallet)

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

    
    $("input[name=wallet][hidden=hidden]").val(currentwallet)
    $("input[name=password][hidden=hidden]").val(walletPassword)

    updateAccountInfo(localStorage.getItem("currentAccount"))

    // 选择不同的账号
    accountSelectList.change(function() {
        console.log(this.value)
        localStorage.setItem("currentAccount", this.value)
        $("input[name=account][hidden=hidden]").val(this.value)
        updateAccountInfo(this.value)
        
    })

   

   
  
    // 交易NET
    $("#bandwidth-transaction").validate({
        rules: {
            net_amount: {required: true,},
            cpu_amount: {required: true,},
        },
        messages: {
            net_amount: {required: "请输入购买NET所抵押的EOS数量",},
            cpu_amount: {required: "请输入购买CPU所抵押的EOS数量",},
        },
        submitHandler: function (form) {
            $(form).ajaxSubmit({
                url: "/net_resource/bandwidth/transaction",
                type: "post",
                dataType: "json",
                success: function (res, status) {
                    console.log(status + JSON.stringify(res))
                    if (res.code == 0) {
                        alert("交易成功")
                        location.reload() 
                    }　else {
                        alert("交易失败")
                    }
                },
                error: function (res, status) {
                    console.log(status + JSON.stringify(res))
                    alert("交易失败")
                }
            });
        }
    })


    
})

$(document).ready(function () {
    let currentwallet = localStorage.getItem("currentwallet")
    
    if (!currentwallet) {
        return
    }
    let walletPassword = localStorage.getItem(currentwallet)
    

    // 获取账号列表
    let params = {"wallet":currentwallet, "password":walletPassword}
    $.post("/account/listforwallet", params, function (res, status) {
        console.log(status + JSON.stringify(res))
        if (res.code == 0) {
            for (var i = 0; i < res.data.length; i++) {
                accountlists = `
                <tr>
                                  <th scope="row">${i+1}</th>
                                  <td>${res.data[i]}</td>
                                  <td><li class="breadcrumb-item"><a href="/accountinfo.html" onclick="storeAccount('${res.data[i]}')">查看详情</a></li></td>
                                  <td><li class="breadcrumb-item"><a href="/transaction.html" onclick="storeAccount('${res.data[i]}')">转账</a></li></td>
                                </tr>
                `
                var div1 = document.getElementById('account-list')
                div1.innerHTML += accountlists
            }


            sessionStorage.setItem(`wallet-${currentwallet}-accounts`, JSON.stringify(res.data))
        }
    })

})
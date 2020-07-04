// 导入私钥
function importPrivatekey() {
    let wallet = localStorage.getItem("currentwallet")
    var privatekey = prompt("请输入您需要导入的私钥");
    if(privatekey) {
        let params = {"wallet":wallet, "privatekey":privatekey}
        console.log(params)
        $.post("/wallet/importkey", params, function (res, status) {
            console.log(status, JSON.stringify(res))
            if (res.code == 0) {
                alert("私钥导入成功")
                window.location.reload(); 
            }
            else {
                alert("私钥导入失败")
                window.location.reload(); 
            }
        })
    }
}

// 存账号名
function storeAccount(name) {
    localStorage.setItem("currentAccount", name)
    
}

$(document).ready(function () {
    let currentwallet = localStorage.getItem("currentwallet")
    $("#current-wallet").text(currentwallet)
})
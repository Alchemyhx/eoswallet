function getAccountList(name) {
    localStorage.setItem("currentwallet", name)
    window.location.href = "/keyList.html"
}

// 解锁钱包
function unlockWallet(name) {
    var password = prompt(`请输入"${name}"钱包的密码`);
    if (password) {
        let params = {"wallet":name, "password":password}
        console.log(params)
        $.post("/wallet/unlock", params, function (res, status) {
            console.log(status, JSON.stringify(res))
            
            if (res.code == 0) {
                localStorage.setItem(name, password)
                alert("钱包已解锁")
                window.location.reload()
            }

            else {
                alert("钱包未能解锁")
            }
        })
    }
}

// 锁定钱包
function lockWallet(name) {
    let params = {"wallet":name}
    $.post("/wallet/lock", params, function (res, status) {
        console.log(status, JSON.stringify(res))
        
        if (res.code == 0) {
            alert("钱包已锁定")
            window.location.reload(); 
        }

        else {
            alert("钱包未能锁定")
        }
    })
}

// 初始载入
$(document).ready(function () {

    //localStorage.clear()
    sessionStorage.clear()
    // 获取钱包列表
    $.get("/wallet/list", function (res, status) {
        console.log(status, JSON.stringify(res))

        if (res.code == 0) {
            
            res.data.forEach(wallet => {
                let walletName = wallet
                let isUnlock = false
                if(wallet.charAt(wallet.length-1)=="*"){
                    isUnlock = true
                    walletName = wallet.slice(0,-2)
                }
              
                let walletTr
                if (isUnlock) {
                    walletTr = `<div class="masonry__item">
                    <figure>
                        <figcaption class="content">
                        <h2>${walletName}</h2>
                        <p class="date" style="color:green">UNLOCKED</p>
                        <ul class="tags">
                            <li><a onclick="lockWallet('${walletName}')">锁定钱包</a></li>
                            <li><a onclick="getAccountList('${walletName}')">帐号模块</a></li>            
                            
                        </ul>
                        </figcaption>
                    </figure>
                    </div>`           
                }  

                else {
                    walletTr = `<div class="masonry__item">
                    <figure>
                        <figcaption class="content">
                        <h2>${walletName}</h2>
                        <p class="date" style="color:red">LOCKED</p>
                        <ul class="tags">
                            <li><a onclick="unlockWallet('${walletName}')">解锁钱包</a></li>
                                       
                            
                        </ul>
                        </figcaption>
                    </figure>
                    </div>`     
                }
               
                var div1 = document.getElementById('wallet-list-table')
                div1.innerHTML += walletTr
                
            });
            changewalletlist()
        }
    })

    

    // 创建钱包
    $("#wallet-create-form").validate({
        rules: {
            wallet: {
                required: true,
            },
        },
        messages: {
            wallet: {
                required: "请输入新建的钱包名称",
            },
        },
        submitHandler: function (form) {
            $(form).ajaxSubmit({
                url: "/wallet/create",
                type: "post",
                dataType: "json",
                success: function (res, status) {
                    console.log(status + JSON.stringify(res))
                    
                    if (res.code == 0) {
                        
                        alert("钱包密码为：" + res.data.password)
                        window.location.reload()
                        localStorage.setItem(res.data.wallet, res.data.password)
                    }

                    else {
                        alert("新建失败，钱包已存在")
                    }
                },
                error: function (res, status) {
                    console.log(status + JSON.stringify(res))
                }
            });
        }
    })

    // 打开钱包
    $("#wallet-open-form").validate({
        rules: {
            wallet: {
                required: true,
            },
        },
        messages: {
            wallet: {
                required: "请输入要打开的钱包名称",
            },
        },
        submitHandler: function (form) {
            $(form).ajaxSubmit({
                url: "/wallet/open",
                type: "post",
                dataType: "json",
                success: function (res, status) {
                    console.log(status + JSON.stringify(res))
                    if (res.code == 0) {
                        alert("打开成功")
                        window.location.reload()
                    } else {
                        alert("打开失败，请确认钱包是否存在")
                    }
                },
                error: function (res, status) {
                    console.log(status + JSON.stringify(res))
                }
            });
        }
    })

  
})
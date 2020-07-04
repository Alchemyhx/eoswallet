
// 账号代币
function updateAccountInfo(currentAccount) {

    $("#currentacc").text("当前账号："+localStorage.getItem("currentAccount"))
    let accountSelectList = $("#account-create-creator-select")
    accountSelectList.val(localStorage.getItem("currentAccount"))

    
}

function getProducers() {
    // 获取超级节点列表

    $.post("/vote/getProducers", function (res, status) {
        console.log(status + JSON.stringify(res))
        console.log(res.data.rows)
        if (res.code == 0) {
            for (var i = 0; i < res.data.rows.length; i++) {
                producerslists = `
                <tr>
                                  <th scope="row">${i+1}</th>
                                  <td>${res.data.rows[i].owner}</td>
                                  <td>${res.data.rows[i].total_votes}</td>
                                  <td>${res.data.rows[i].url}</td>
                                  <td>${res.data.rows[i].last_claim_time}</td>
                                  <td>${res.data.rows[i].unpaid_blocks}</td>
                                </tr>
                `
                var div1 = document.getElementById('producers-list')
                div1.innerHTML += producerslists
            }


            
        }
    })
}

$(document).ready(function () {
    let currentwallet = localStorage.getItem("currentwallet")
    
    if (!currentwallet) {
        return
    }
   
    getProducers()

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

    // 投票
    $("#vote-form").validate({
        rules: {
            account: {required: true,},
            producers: {required: true,},
     
        },
        messages: {
            account: {required: "请选择账号",},
            producers: {required: "请输入超级节点",},
        },
        submitHandler: function (form) {
            $(form).ajaxSubmit({
                url: "/vote/voteProducers",
                type: "post",
                dataType: "json",
                success: function (res, status) {
                    console.log(status + JSON.stringify(res))
                    // console.log(status + res)
                    if (res.code == 0) {
                        alert("投票成功：\n" + res.data)
                        window.location.reload()
                    }
                    else {
                        alert("投票失败")
                    }
                    
                },
                error: function (res, status) {
                    console.log(status + JSON.stringify(res))
                    alert("投票失败")
                }
            });
        }
    })
})
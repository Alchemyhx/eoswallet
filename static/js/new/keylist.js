
// 获取钱包的公私钥列表
function getPublickeyList() {
    let name = localStorage.getItem("currentwallet")
    var password = prompt(`请输入`+name+`钱包的密码`);
    if (password) {
        let params = {"wallet":name, "password":password}
        console.log(params)
        $.post("/wallet/keys", params, function (res, status) {
            console.log(status, JSON.stringify(res))

            if (res.code == 0) {
                console.log(status, JSON.stringify(res))
                // console.log(res.data.length)
                // console.log(res.data[0][0])
                // console.log(res.data[1][0])
                showKeyList(res)


                
            }

            else {
                alert("密码错误")
                window.location.reload(); 
            }
        })
    }

   
}

function showKeyList(res) {
    for (var i = 0; i < res.data.length; i++) {
        keylists = `
        <tr>
                          <th scope="row">${i+1}</th>
                          <td>${res.data[i][0]}</td>
                          <td>${res.data[i][1]}</td>
                        </tr>
        `
        var div1 = document.getElementById('key-list')
        div1.innerHTML += keylists
    }
    
}
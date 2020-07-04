
// 创建助记词
function createMne() {

    $.get("/mne/create", function (res, status) {
        console.log(status, JSON.stringify(res))

        if (res.code == 0) {
            console.log(status, JSON.stringify(res))
            // console.log(res.data.length)
            // console.log(res.data[0][0])
            // console.log(res.data[1][0])
            
            alert("128 位助记词生成成功：\n" + res.data)  
        }
    })

}

// 通过助记词获取公私钥列表
function getMneList() {
    
    var words = prompt(`请输入助记词`);
    if (words) {
        let params = {"words":words}
        console.log(params)
        $.post("/mne/keys", params, function (res, status) {
            console.log(status, JSON.stringify(res))

            if (res.code == 0) {
                console.log(status, JSON.stringify(res))
                // console.log(res.data.length)
                // console.log(res.data[0][0])
                // console.log(res.data[1][0])
                showKeyList(res, words)


                
            }

            else {
                alert("助记词格式错误")
                
            }
        })
    }

   
}

function showKeyList(res, words) {

    $("#mnename").text("当前助记词为 "+words)
  
    keylists = `
    <tr>
                      
                      <td>${res.data[0]}</td>
                      <td>${res.data[1]}</td>
                      <td onclick="mneimportPrivatekey('${res.data[1]}')">点击导入钱包</td>
                    </tr>
    `
    var div1 = document.getElementById('key-list')
    div1.innerHTML += keylists
    
    
}

// 导入私钥
function mneimportPrivatekey(privatekey) {
    console.log(privatekey)
    let wallet = localStorage.getItem("currentwallet")
   
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
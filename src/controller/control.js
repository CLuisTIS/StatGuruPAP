function validaRegisto(){
    if(document.getElementById("email").value != "" && document.getElementById("email").value != null &&
       document.getElementById("password").value != "" && document.getElementById("password").value != null &&
       document.getElementById("passwordConfirmacao").value != "" && document.getElementById("passwordConfirmacao").value != null &&
       document.getElementById("password").value == document.getElementById("passwordConfirmacao").value)
       return true;
    else
        alert("introduza os dados de registo corretamente");
        return false;
}

async function register(){

    if(validaRegisto()){
        const options = {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'authorization': localStorage.getItem("token")
            },
            body: JSON.stringify({
                email: document.getElementById("email").value,
                password: document.getElementById("password").value,
                level:"admin"
            })
        }
    
        await fetch('http://localhost:3000/api/admin/admins', options)
        .then((res) => {
            if(res.status == 200){
                document.getElementById("listaAdmins").innerHTML = ""
                fillAdmins();
                document.getElementById("email").value = ""
                document.getElementById("password").value = ""
                document.getElementById("passwordConfirmacao").value = ""
                document.getElementById("msgErro").style.display = "none"}
            else{
                document.getElementById("email").value = ""
                document.getElementById("password").value = ""
                document.getElementById("passwordConfirmacao").value = ""
                document.getElementById("msgErro").style.display = "block" 
            }
          })
          .catch((error) => console.log(error));
          
    }      
}

function fillAdmins(){
    const options = {
        method: 'GET',
        headers: {
            'authorization': localStorage.getItem("token")
        }
    }
    fetch('http://localhost:3000/api/admin/admins',options)
    .then((res) =>{
        if(res.status =200) return res.json()
        return null
    })
    .then((data) => {
        if(data){
            for(let i = 0; i< data.length; i++){
                document.getElementById('listaAdmins').innerHTML += `<tr> <td>${data[i].iduser}</td><td> ${data[i].email}</td> </tr>`
                
            }
        }
        else location.replace("http://localhost:3000/");
        })
    .catch((err)=>{
        console.log(err)
        alert('Erro na recolha dos admins!')
    })
}

function fillUsers(){
    const options = {
        method: 'GET',
        headers: {
            'authorization': localStorage.getItem("token")
        }
    }
    fetch('http://localhost:3000/api/admin/users',options)
    .then((res) =>{
        if(res.status =200) return res.json()
        return null
    })
    .then((data) => {
        if(data){
            for(let i = 0; i< data.length; i++){
                document.getElementById('listaUsers').innerHTML += `<tr> <td>${data[i].iduser}</td><td> ${data[i].email}</td> </tr>`

            }
        }
        else location.replace("http://localhost:3000/");
        })
    .catch((err)=>{
        console.log(err)
        alert('Erro na recolha dos utilizadores!')
    })
}

function validaArtigo(){
        if(document.getElementById("title").value != "" && document.getElementById("title").value != null &&
           document.getElementById("imagem").value != "" && document.getElementById("imagem").value != null &&
           document.getElementById("text").value != "" && document.getElementById("text").value != null 
           ){
           return true;
        }
        else{
            alert("Introduza os dados do artigo corretamente");
            return false;
        }
    }

async function articles(){
    if(validaArtigo()){
        const options = {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'authorization': localStorage.getItem("token")
            },
            body: JSON.stringify({
                title: document.getElementById("title").value,
                imagem: document.getElementById("imagem").value,
                text: document.getElementById("text").value
            })
        }
        await fetch('http://localhost:3000/api/admin/articles', options)
        .then((res) =>{
            if(res.status == 200){
                document.getElementById("title").value = ""
                document.getElementById("imagem").value = ""
                document.getElementById("text").value = ""
            }

    })
    .catch((error) => console.log(error));
    }
}
function fillArticles(){
    const options = {
        method: 'GET',
        headers: {
            'authorization': localStorage.getItem("token")
        }
    }
    fetch('http://localhost:3000/api/admin/articles',options)
    .then((res) =>{
        if(res.status =200) return res.json()
        return null
    })
    .then((data) => {
        if(data){
            for(let i = data.length; i-- > 0;){
                document.getElementById('listaArticles').innerHTML += 
                `<div class=container>
                <tr>
                <td> 
                <p style="text-align: left; margin-left:15px"> Article ID ${data[i].idArticle}</p>
                <p class="h5" style="margin-top:25px"> ${data[i].title} </p>
                <div> <img src="${data[i].imagem}"></img></div>
                <div class="h6" style="margin-top:25px"> ${data[i].text} </div>
                </td>
                </tr>
                </div>`
            }
        }
        else location.replace("http://localhost:3000/");
        })
    .catch((err)=>{
        console.log(err)
        alert('Erro na recolha dos artigos!')
    })
}

function authCheck(){
    if(localStorage.getItem("token")){
        const options = {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
                'authorization': localStorage.getItem("token")
            },
            body: JSON.stringify()
        }

        fetch('http://localhost:3000/api/admin/getAuth', options)
        .then((res) => {
            if(res.status===200){
                return res.json()
            }
            else{
                localStorage.removeItem("token");
                return null
            }
        })
        .then((res)=>{
            if(res){
            console.log(res);
            switch (res.level) {
                case 'regular':
                   
                    break;
                case 'admin':
                    
                    break;
            }
        }else return;
        })
        .catch((error) => console.log(error));
    }else{
        alert("asd")
    }
}
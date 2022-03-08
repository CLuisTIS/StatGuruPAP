function validaRegisto(){
    if(document.getElementById("username").value != "" && document.getElementById("username").value != null &&
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
                username: document.getElementById("username").value,
                password: document.getElementById("password").value,
                level:"admin"
            })
        }
    
        await fetch('http://localhost:3000/api/admin/admins', options)
        .then((res) => {
            if(res.status == 200){
                document.getElementById("listaAdmins").innerHTML = ""
                fillAdmins();
                document.getElementById("username").value = ""
                document.getElementById("password").value = ""
                document.getElementById("passwordConfirmacao").value = ""
                document.getElementById("msgErro").style.display = "none"}
            else{
                document.getElementById("username").value = ""
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
                document.getElementById('listaAdmins').innerHTML += `<tr> <td>${data[i].iduser}</td><td> ${data[i].username}</td> </tr>`
                
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
                document.getElementById('listaUsers').innerHTML += `<tr> <td>${data[i].iduser}</td><td> ${data[i].username}</td> </tr>`

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
           document.getElementById("text").value != "" && document.getElementById("text").value)
           return true;
        else
            alert("Introduza os dados do artigo corretamente");
            return false;
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
                text: document.getElementById("text").value
            })
        }
        await fetch('http://localhost:3000/api/admin/articles', options)
        .then((res) =>{
            if(res.status == 200){
                document.getElementById("title").value = ""
                document.getElementById("text").value = ""
            }
            else{
                document.getElementById("title").value = ""
                document.getElementById("text").value = ""
            }
    })
    .catch((error) => console.log(error));
    }
}


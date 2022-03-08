async function login(){
    const options = {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({
            username: document.getElementById("username").value,
            password: document.getElementById("password").value,
        })
    }

    await fetch('http://localhost:3000/api/open/login', options)
    .then((res) => {
        if(res.status===406){
          alert(res.json().msg)
          return
        }       
        let token = res.headers.get("Authorization");
        localStorage.setItem("token", token);
      })
      .catch((error) => console.log(error));

      if(localStorage.getItem("token")) location.href = "http://localhost:3000";
}

function validaLogin(){
    if(document.getElementById("username").value != "" && document.getElementById("username").value != null &&
       document.getElementById("password").value != "" && document.getElementById("password").value != null)
       return true;
    else
        alert("introduza os dados de login corretamente");
        return false;
}

function validaRegisto(){
    if(document.getElementById("Rusername").value != "" && document.getElementById("Rusername").value != null &&
       document.getElementById("Rpassword").value != "" && document.getElementById("Rpassword").value != null &&
       document.getElementById("RpasswordConfirmacao").value != "" && document.getElementById("RpasswordConfirmacao").value != null &&
       document.getElementById("Rpassword").value == document.getElementById("RpasswordConfirmacao").value)
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
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                username: document.getElementById("Rusername").value,
                password: document.getElementById("Rpassword").value,
                level:"regular"
            })
        }
    
        await fetch('http://localhost:3000/api/open/register', options)
        .then((res) => {
            if(res.status == 200)
            location.reload();
            else{
               
                document.getElementById("Rusername").value = ""
                document.getElementById("Rpassword").value = ""
                document.getElementById("RpasswordConfirmacao").value = ""
                document.getElementById("msgErro").style.display = "block" 
            }
          })
          .catch((error) => console.log(error));
          
    }      
}


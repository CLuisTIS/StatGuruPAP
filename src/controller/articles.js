function renderNews(){
    if(localStorage.getItem("token")){
        const options = {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'authorization': localStorage.getItem("token")
            },
            body: JSON.stringify()
        }

        fetch('http://localhost:3000/api/open/getAuth', options)
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
                    fillArticles();
                    break;
                case 'admin':
                    fillArticles();
                    break;
            }
        }else return;
        })
        .catch((error) => console.log(error));
    }else{
        alert("shiet")
    }
}
function fillArticles(){
    const options = {
        method: 'GET',
        headers: {
            'authorization': localStorage.getItem("token")
        }
    }
    fetch('http://localhost:3000/api/open/articles',options)
    .then((res) =>{
        if(res.status =200) return res.json()
        return null
    })
    .then((data) => {
        if(data){
            for(let i = 0; i< data.length; i++){
                document.getElementById('listaArticles').innerHTML += 
                `<div class=container>
                <tr>
                <td> 
                <p style="text-align: left; margin-left:15px"> Article ID ${data[i].idArticle} </p>
                <div> <img src="${data[i].img}"></img> </div>
                <p> ${data[i].title} </p>
                <div> ${data[i].text} </div>
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

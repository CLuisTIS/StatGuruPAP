function renderNews() {
    if (localStorage.getItem("token")) {
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
                if (res.status === 200) {
                    return res.json()
                }
                else {
                    localStorage.removeItem("token");
                    return null
                }
            })
            .then((res) => {
                if (res) {
                    console.log(res);
                    switch (res.level) {
                        case 'regular':
                            fillArticles();
                            break;
                        case 'admin':
                            fillArticles();
                            break;
                    }
                } else return;
            })
            .catch((error) => console.log(error));
    } else {
        alert("Utilizador sem acesso!")
    }
}

function fillArticles() {
    const options = {
        method: 'GET',
        headers: {
            'authorization': localStorage.getItem("token")
        }
    }
    fetch('http://localhost:3000/api/open/articles', options)
        .then((res) => {
            if (res.status = 200) return res.json()
            return null
        })
        .then((data) => {
            if (data) {
                for (let i = data.length; i-- > 0;) {
                    document.getElementById('listaArticles').innerHTML +=
                        `<div class="container aligns-items-center justify-content-center" >
                        <tr>
                        <td>
                        <p class="h5 container aligns-items-center justify-content-center" style="margin-top:25px;text-align: center;"> ${data[i].title} </p>
                        <div class="aligns-items-center justify-content-center "> <img style="width:750px"src="${data[i].imagem}"></img></div>
                        <div class="h6 aligns-items-center justify-content-center " style="margin-top:25px; width:250px;"> ${data[i].text} </div>
                        </td>
                        </tr>
                        </div>`
                }
            }
            else location.replace("http://localhost:3000/");
        })
        .catch((err) => {
            console.log(err)
            alert('Erro na recolha dos artigos!')
        })
}

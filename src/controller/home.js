function renderStat() {
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
                    renderCode('stats', `<button style="color: #f55139;" class="nav-link col-6 fs-5" id="statistics" data-bs-toggle="tab"
                    data-bs-target="#stat" type="button" role="tab" aria-controls="stat"
                    aria-selected="false">ESTATISTICAS</button>`);
                }
                else {
                    localStorage.removeItem("token");
                    renderCode('stats', `<button onclick="location.href='http://localhost:3000/loginsignup'" style="color: #f55139; "class="nav-link" "type="button" > ESTATISTICAS </button>`);
                    return null
                }
            })
            .catch((error) => console.log(error));
            
    } else {
        renderCode('stats', `<button onclick="location.href='http://localhost:3000/loginsignup' " style="color: #f55139; width: auto" class="nav-link col-6 fs-5 "type="button" > ESTATÍSTICAS </button>`);
    }
}
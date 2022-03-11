function renderCode(id, code) {
    document.getElementById(id).innerHTML = code;
}

function renderNav() {
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
                    renderNavNaoAutenticado();
                    return null
                }
            })
            .then((res) => {
                if (res) {
                    console.log(res);
                    switch (res.level) {
                        case 'regular':
                            renderNavRegular();
                            break;
                        case 'admin':
                            renderNavAdmin();
                            break;
                    }
                } else return;
            })
            .catch((error) => console.log(error));
    } else {
        renderNavNaoAutenticado();
    }
}

function renderFooter() {
    renderCode("footer", `<footer class="footer  py-3 " >
    <span class="text bottom-0 start-0" >Made by: Carlos Luís </span>
  </footer>`)
}

function renderNavNaoAutenticado() {
    renderCode('navbar',
        `<div class="navbar navbar-expand-sm navbar-dark mb-5" style="background-color: grey; width:100%">
        <div class="container-fluid">
            <div class="ml-5" >
                <img class="d-inline-block" src="http://localhost:3000/files/assets/StatGuruLogo" alt="img-fluid" width="auto" style="cursor: pointer;">
            </div>

            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" style="justify-content: end !important;" id="navbarNav">
                <ul class="navbar-nav" style="cursor: pointer; ">
                    <li class="nav-item" style="margin-right:10px">
                    <a class="nav-link fs-4" href="http://localhost:3000/">Resultados em Direto e Estatísticas</a>
                    </li>
                    <li class="nav-item"  style="margin-right:10px">
                    <a class="nav-link fs-4" href="http://localhost:3000/aboutus">Sobre Nós</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link fs-4" href="http://localhost:3000/loginsignup">Login / Sign Up</a>
                    </li>
                </ul>
            </div>
        </div>
    </div>`)
}

function renderNavRegular() {
    renderCode('navbar',
        `<div class="navbar navbar-expand-sm navbar-dark mb-5" style="background-color: grey; width:100%">
        <div class="container-fluid">
            <div class="ml-5" >
                <img class="d-inline-block align-text-top" src="http://localhost:3000/files/assets/StatGuruLogo" alt="img-fluid" width="auto" style="cursor: pointer;">
            </div>

            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" style="justify-content: end !important;" id="navbarNav">
                <ul class="navbar-nav" style="cursor: pointer; ">
                    <li class="nav-item" style="margin-right:10px">
                    <a class="nav-link fs-4" href="http://localhost:3000/home">Resultados em Direto e Estatísticas</a>
                    </li>
                    <li class="nav-item"  style="margin-right:10px">
                    <a class="nav-link fs-4" href="http://localhost:3000/news">Artigos</a>
                    </li>
                    <li class="nav-item"  style="margin-right:10px">
                    <a class="nav-link fs-4" href="http://localhost:3000/aboutus">Sobre Nós</a>
                    </li>
                    <li class="nav-item"  cursor: pointer" onclick="logout()">
                        <a class="nav-link fs-4">Logout</a>
                    </li>
                </ul>
            </div>
        </div>
    </div>`
    )
}

function renderNavAdmin() {
    renderCode('navbar',
        `<div class="navbar navbar-expand-sm navbar-dark mb-5" style="background-color: grey; width:100%">
        <div class="container-fluid">
            <div class="ml-5" >
                <img class="d-inline-block align-text-top" src="http://localhost:3000/files/assets/StatGuruLogo" alt="img-fluid" width="auto" style="cursor: pointer;">
            </div>

            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" style="justify-content: end !important;" id="navbarNav">
                <ul class="navbar-nav" style="cursor: pointer; ">
                    <li class="nav-item" style="margin-right:10px">
                    <a class="nav-link fs-4" href="http://localhost:3000/home">Resultados em Direto e Estatísticas</a>
                    </li>
                    <li class="nav-item"  style="margin-right:10px">
                    <a class="nav-link fs-4" href="http://localhost:3000/news">Artigos</a>
                    </li>
                    <li class="nav-item"  style="margin-right:10px">
                    <a class="nav-link fs-4" href="http://localhost:3000/control">Dashboard</a>
                    </li>
                    <li class="nav-item" style:" cursor: pointer" onclick="logout()">
                        <a class="nav-link fs-4">Logout</a>
                    </li>
                </ul>
            </div>
        </div>
    </div>`)
}

function logout() {
    localStorage.removeItem("token");
    location.replace("http://localhost:3000/");
}

const hobbiesDataOriginal = [
    {
        "id": 1,
        "nome": "Esportes",
        "imagem": "10 Ways to Save Money on Sporting Equipment for Your Kids.jpeg",
        "destaqueCarrossel": true,
        "lugares_bh": "Lagoa da Pampulha (Corrida/Ciclismo), Parque das Mangabeiras, CTE-UFMG.",
        "profissionais": "Assessoria Esportes BH, Treinadores de corrida na Orla.",
        "site": "portalbelohorizonte.com.br",
        "dica": "A Orla da Pampulha fecha parte das pistas aos domingos de manhã para lazer."
    },
    {
        "id": 2,
        "nome": "Leitura",
        "imagem": "460f1b7f3aad5ec7e49ad2781d5ccfc8.jpg",
        "destaqueCarrossel": true,
        "lugares_bh": "Biblioteca Pública Estadual de MG (Praça da Liberdade), Café do CCBB, Livraria Quixote (Savassi).",
        "profissionais": "Mediadores de Clubes de Leitura da Savassi.",
        "site": "biblioteca.mg.gov.br",
        "dica": "O CCBB possui sofás confortáveis e entrada gratuita para leitura no pátio interno."
    },
    {
        "id": 3,
        "nome": "Desenho",
        "imagem": "Draw Your Way to Calm_ Stress Relief Drawing Ideas!.jpeg",
        "destaqueCarrossel": true,
        "lugares_bh": "Praça do Papa (Desenho de observação da cidade), Mirante das Mangabeiras.",
        "profissionais": "Casa dos Quadrinhos (Escola Técnica de Artes Visuais na Av. João Pinheiro).",
        "site": "casadosquadrinhos.com.br",
        "dica": "Leve sua prancheta para a Praça da Liberdade no fim de tarde, a iluminação é fantástica."
    },
    {
        "id": 4,
        "nome": "Instrumento Musical",
        "imagem": "artes dos instrumentos_.jpeg",
        "destaqueCarrossel": false,
        "lugares_bh": "Fundação de Educação Artística - FEA (Rua Gonçalves Dias), Escola de Música da UEMG.",
        "profissionais": "Professores particulares e oficinas da FEA BH.",
        "site": "feabh.org.br",
        "dica": "A FEA frequentemente oferece cursos livres para iniciantes e concertos didáticos de baixo custo."
    },
    {
        "id": 5,
        "nome": "Culinária",
        "imagem": "Sopa de Pollo Canaria_ Sabor Tradicional en tu Mesa.jpeg",
        "destaqueCarrossel": false,
        "lugares_bh": "Mercado Central de BH (oficinas esporádicas), Mercado Novo (foco em gastronomia de raiz).",
        "profissionais": "Chef Sabrina Gomide (Experimente Cozinha Foodlab no bairro Santa Lúcia), Cursos SENAC MG.",
        "site": "experimentecozinha.com.br",
        "dica": "O Experimente Cozinha realiza módulos práticos no estilo 'mão na massa' perfeitos para amadores."
    },
    {
        "id": 6,
        "nome": "Organização & Produtividade",
        "imagem": "download (3).jpeg",
        "destaqueCarrossel": false,
        "lugares_bh": "Espaços de Coworking locais (WeWork Savassi, Impact Hub BH) para estruturar rotinas.",
        "profissionais": "Personal Organizers associados à ANPOP atuantes na região metropolitana.",
        "site": "anpop.com.br",
        "dica": "Utilizar planners físicos comprados em papelarias tradicionais da Savassi ajuda a desconectar das telas."
    }
];

function inicializarLocalStorage() {
    if (!localStorage.getItem('hobbiesData')) {
        localStorage.setItem('hobbiesData', JSON.stringify(hobbiesDataOriginal));
    }
    if (!localStorage.getItem('favoritos')) {
        localStorage.setItem('favoritos', JSON.stringify([]));
    }
    // Cria o usuário padrão admin caso o banco de cadastros esteja limpo
    if (!localStorage.getItem('usuariosCadastrados')) {
        localStorage.setItem('usuariosCadastrados', JSON.stringify([{ username: "admin", password: "1234" }]));
    }
}

function checarSessao() {
    const usuarioLogado = localStorage.getItem('usuarioLogado');
    const navLogin = document.getElementById('nav-login');
    const navLogout = document.getElementById('nav-logout');
    const navFavoritos = document.getElementById('nav-favoritos');
    const areaFavoritosBloco = document.getElementById('favoritos');
    const loginSection = document.getElementById('login-section');
    const boasVindasTexto = document.getElementById('boas-vindas-texto');

    if (usuarioLogado) {
        if(navLogin) navLogin.style.display = 'none';
        if(navLogout) navLogout.style.display = 'block';
        if(navFavoritos) navFavoritos.style.display = 'block';
        if(areaFavoritosBloco) areaFavoritosBloco.style.display = 'block';
        if(loginSection) loginSection.style.display = 'none';
        if(boasVindasTexto) {
            boasVindasTexto.innerHTML = `Olá, <strong>${usuarioLogado}</strong>! Seja bem-vindo de volta ao seu painel.`;
        }
    } else {
        if(navLogin) navLogin.style.display = 'block';
        if(navLogout) navLogout.style.display = 'none';
        if(navFavoritos) navFavoritos.style.display = 'none';
        if(areaFavoritosBloco) areaFavoritosBloco.style.display = 'none';
        if(loginSection) loginSection.style.display = 'block';
        if(boasVindasTexto) {
            boasVindasTexto.innerText = "Let's Explore The live with Us.";
        }
    }
}

function carregarPagina(filtroTexto = '') {
    const gridContainer = document.getElementById('hobby-grid-container');
    const carouselInner = document.getElementById('carousel-inner-container');
    const carouselIndicators = document.getElementById('carousel-indicators-container');
    
    if(!gridContainer) return;
    gridContainer.innerHTML = '';
    
    const dadosHobbies = JSON.parse(localStorage.getItem('hobbiesData')) || [];
    const listaFavoritos = JSON.parse(localStorage.getItem('favoritos')) || [];
    
    if (filtroTexto === '') {
        if(carouselInner) carouselInner.innerHTML = '';
        if(carouselIndicators) carouselIndicators.innerHTML = '';
        let carrosselIndex = 0;
        
        dadosHobbies.forEach((hobby) => {
            if (hobby.destaqueCarrossel && carouselInner && carouselIndicators) {
                const indicatorBtn = document.createElement('button');
                indicatorBtn.type = 'button';
                indicatorBtn.setAttribute('data-bs-target', '#carrosselHobbies');
                indicatorBtn.setAttribute('data-bs-slide-to', carrosselIndex.toString());
                if (carrosselIndex === 0) indicatorBtn.classList.add('active');
                carouselIndicators.appendChild(indicatorBtn);
                
                const carouselItem = document.createElement('div');
                carouselItem.className = `carousel-item ${carrosselIndex === 0 ? 'active' : ''}`;
                carouselItem.innerHTML = `
                    <img src="${hobby.imagem}" class="d-block w-100" alt="${hobby.nome}" style="cursor:pointer;">
                    <div class="carousel-caption d-none d-md-block">
                        <h3 class="text-white mb-0">${hobby.nome}</h3>
                    </div>
                `;
                // Ao clicar na imagem do carrossel, abre os detalhes
                carouselItem.addEventListener('click', () => verDetalhesHobby(hobby));
                carouselInner.appendChild(carouselItem);
                carrosselIndex++;
            }
        });
    }
    
    const termoBusca = filtroTexto.toLowerCase();
    const usuarioLogado = localStorage.getItem('usuarioLogado');
    
    dadosHobbies.forEach((hobby) => {
        const matchesNome = hobby.nome.toLowerCase().includes(termoBusca);
        const matchesLugares = hobby.lugares_bh.toLowerCase().includes(termoBusca);
        const matchesDica = hobby.dica.toLowerCase().includes(termoBusca);
        
        if (termoBusca !== '' && !matchesNome && !matchesLugares && !matchesDica) {
            return;
        }
        
        const isFavorito = listaFavoritos.includes(hobby.id);
        
        const card = document.createElement('div');
        card.className = 'hobby-card';
        
        // Exibe botão de favoritos apenas se estiver logado
        let botaoFavHTML = '';
        if(usuarioLogado) {
            botaoFavHTML = `
                <button class="btn-favorito ${isFavorito ? 'marcado' : 'desmarcado'}" onclick="event.stopPropagation(); alternarFavorito(${hobby.id})">
                    ${isFavorito ? '♥' : '♡'}
                </button>
            `;
        }

        card.innerHTML = `
            ${botaoFavHTML}
            <h3>${hobby.nome}</h3>
            <img src="${hobby.imagem}" alt="${hobby.nome}">
            
            <span class="info-label">📍 Onde praticar em BH:</span>
            <p class="small text-muted mb-2">${hobby.lugares_bh}</p>
            
            <span class="info-label">👤 Quem acessar:</span>
            <p class="small text-muted mb-2">${hobby.profissionais}</p>
            
            <span class="info-label">🌐 Link útil:</span>
            <p class="small mb-2"><a href="https://${hobby.site}" target="_blank" onclick="event.stopPropagation();" style="color: var(--verde-escuro, #198754); font-weight: bold;">${hobby.site}</a></p>
            
            <span class="info-label">💡 Dica extra:</span>
            <p class="small text-secondary italic"><em>"${hobby.dica}"</em></p>
        `;
        
        // Clicar em qualquer lugar do card abre a tela de detalhes
        card.addEventListener('click', () => verDetalhesHobby(hobby));
        gridContainer.appendChild(card);
    });
    
    carregarFavoritos();
}

function carregarFavoritos() {
    const favoritosGrid = document.getElementById('favoritos-grid');
    if (!favoritosGrid) return;
    
    favoritosGrid.innerHTML = '';
    
    const dadosHobbies = JSON.parse(localStorage.getItem('hobbiesData')) || [];
    const listaFavoritos = JSON.parse(localStorage.getItem('favoritos')) || [];
    const usuarioLogado = localStorage.getItem('usuarioLogado');

    if(!usuarioLogado) return;
    
    const hobbiesFavoritados = dadosHobbies.filter(hobby => listaFavoritos.includes(hobby.id));
    
    if (hobbiesFavoritados.length === 0) {
        favoritosGrid.innerHTML = `<p style="text-align: center; color: #666; width: 100%;">Nenhum favorito registrado ainda.</p>`;
        return;
    }
    
    hobbiesFavoritados.forEach(hobby => {
        const card = document.createElement('div');
        card.className = 'hobby-card';
        card.innerHTML = `
            <button class="btn-favorito marcado" onclick="event.stopPropagation(); alternarFavorito(${hobby.id})">
                ♥
            </button>
            <h3>${hobby.nome}</h3>
            <img src="${hobby.imagem}" alt="${hobby.nome}">
            
            <span class="info-label">📍 Onde praticar em BH:</span>
            <p class="small text-muted mb-2">${hobby.lugares_bh}</p>
            
            <span class="info-label">💡 Dica extra:</span>
            <p class="small text-secondary italic"><em>"${hobby.dica}"</em></p>
        `;
        card.addEventListener('click', () => verDetalhesHobby(hobby));
        favoritosGrid.appendChild(card);
    });
}

function alternarFavorito(id) {
    let listaFavoritos = JSON.parse(localStorage.getItem('favoritos')) || [];
    
    if (listaFavoritos.includes(id)) {
        listaFavoritos = listaFavoritos.filter(favId => favId !== id);
    } else {
        listaFavoritos.push(id);
    }
    
    localStorage.setItem('favoritos', JSON.stringify(listaFavoritos));
    
    const inputPesquisa = document.getElementById('input-pesquisa');
    carregarPagina(inputPesquisa ? inputPesquisa.value : '');
}

function verDetalhesHobby(dadosHobby) {
    document.getElementById('detalhe-titulo').innerText = dadosHobby.nome;
    document.getElementById('detalhe-imagem').src = dadosHobby.imagem;
    document.getElementById('detalhe-imagem').alt = dadosHobby.nome;
    document.getElementById('detalhe-descricao').innerText = dadosHobby.descricaoCompleta || `Explore o universo do(a) ${dadosHobby.nome} em Belo Horizonte com as melhores dicas mapeadas para a sua rotina.`;
    document.getElementById('detalhe-local').innerText = dadosHobby.lugares_bh || "Belo Horizonte e região.";

    document.getElementById('conteudo-principal').style.display = 'none';
    document.getElementById('detalhe-hobby').style.display = 'block';
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function mostrarSecaoPrincipal() {
    document.getElementById('detalhe-hobby').style.display = 'none';
    document.getElementById('conteudo-principal').style.display = 'block';
}

// Evento do formulário de Login local
if(document.getElementById('form-login')) {
    document.getElementById('form-login').addEventListener('submit', function(e) {
        e.preventDefault();
        const usernameInput = document.getElementById('login-username').value.trim();
        const passwordInput = document.getElementById('login-password').value.trim();
        const loginError = document.getElementById('login-error');
        
        let listaUsuarios = JSON.parse(localStorage.getItem('usuariosCadastrados')) || [];
        
        const contaValida = listaUsuarios.find(u => u.username.toLowerCase() === usernameInput.toLowerCase() && u.password === passwordInput);
        
        if (contaValida) {
            localStorage.setItem('usuarioLogado', contaValida.username);
            loginError.style.display = 'none';
            document.getElementById('form-login').reset();
            checarSessao();
            carregarPagina();
            alert(`Bem-vindo de volta, ${contaValida.username}!`);
        } else {
            loginError.textContent = 'Usuário ou senha incorretos.';
            loginError.style.display = 'block';
        }
    });
}

function logout() {
    localStorage.removeItem('usuarioLogado');
    alert('Sessão encerrada!');
    checarSessao();
    carregarPagina();
}

// Monitora e inicializa a aplicação
document.addEventListener('DOMContentLoaded', () => {
    inicializarLocalStorage();
    checarSessao();
    carregarPagina();
    
    const inputPesquisa = document.getElementById('input-pesquisa');
    const btnLimpar = document.getElementById('btn-limpar-pesquisa');
    
    if(inputPesquisa) {
        inputPesquisa.addEventListener('input', (e) => {
            carregarPagina(e.target.value);
        });
    }
    
    if(btnLimpar) {
        btnLimpar.addEventListener('click', () => {
            inputPesquisa.value = '';
            carregarPagina('');
        });
    }
});

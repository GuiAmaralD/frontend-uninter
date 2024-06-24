class MyNavbar extends HTMLElement {
    constructor() {
        super();

        // Criação do Shadow DOM
        this.attachShadow({ mode: 'open' });

        const linkElem = document.createElement('link');
        linkElem.setAttribute('rel', 'stylesheet');
        linkElem.setAttribute('href', '/components/navbar.css');
        this.shadowRoot.appendChild(linkElem);
        
        this.render();
    }

    connectedCallback() {
        // Chama a função ao carregar a página
        this.atualizarNavbar();
    }

    // Função para verificar se o usuário está logado
    usuarioEstaLogado() {
        const token = localStorage.getItem('token');
        if (token && this.isTokenValid(token)) {
            return true;
        }
        return false;
    }

    isTokenValid(token) {
        const decodedToken = this.decodeToken(token);
        return decodedToken && decodedToken.exp * 1000 > Date.now();
    }
    
    decodeToken(token) {
        try {
            const base64Url = token.split('.')[1];
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            }).join(''));
    
            return JSON.parse(jsonPayload);
        } catch (error) {
            return null;
        }
    }

    atualizarNavbar() {
        const loggedInLinks = this.shadowRoot.getElementById('logged-in');
        const loggedOutLinks = this.shadowRoot.getElementById('logged-out');

        if (this.usuarioEstaLogado()) {
            loggedInLinks.style.display = 'block';
            loggedOutLinks.style.display = 'none';
        } else {
            loggedInLinks.style.display = 'none';
            loggedOutLinks.style.display = 'block';
        }
    }

    handleLogout() {
        const token = localStorage.getItem('token');
        if(token){
            localStorage.removeItem('token');
        }

        window.location.href = 'login.html';
    }
   
    render() {
        this.shadowRoot.innerHTML = `
            <style>
                @import 'components/navbar.css';
            </style>
            <nav class="navbar">
                <div class="navbar-left">
                    <div class="navbar-logo">
                        <img src="/assets/adotaconquista.png" alt="Logo da adota conquista">
                    </div>
                    <a href="sobre.html">Sobre</a>
                    <a href="duvidas.html">Dúvidas frequentes</a>
                    <a href="quero-adotar.html">Quero adotar</a>
                    <a href="cadastro_adocao.html">Ajude um pet a encontrar um lar</a>
                </div>
                <div class="navbar-right">
                    <div id="logged-out" style="display: none;">
                        <a href="login.html" id="login-link">Entrar</a>
                        <a href="cadastro.html" id="signup-link">Cadastre-se</a>
                    </div>

                    <div id="logged-in" style="display: none;">
                        <a href="perfil.html">Perfil</a>
                        <a href="index.html" id="logoutLink">Logout</a>
                    </div>
                </div>
            </nav>
        `;
        const logoutLink = this.shadowRoot.getElementById('logoutLink');
        logoutLink.addEventListener('click', () => this.handleLogout());
    }
}

customElements.define('my-navbar', MyNavbar);
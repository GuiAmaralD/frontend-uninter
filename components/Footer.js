class MyFooter extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        // Crie o conteúdo do footer
        this.innerHTML = `
            <style>
                @import 'components/footer.css';
            </style> 
            <footer class="footer">
                <div class="footer-content">
                    <img src="/assets/adotaconquista.png" alt="Logo do Projeto adotaconquista">
                    <p> &copy; 2024 Todos os direitos reservados.</p>
                </div>
            </footer>
        `;
    }
}

// Registre o componente personalizado
customElements.define('my-footer', MyFooter);
// Main App Functionality
document.addEventListener('DOMContentLoaded', () => {
    // Theme Management
    const initTheme = () => {
        const savedTheme = localStorage.getItem('thayer-theme') || 'dark';
        if (savedTheme === 'light') {
            document.documentElement.classList.add('light-mode');
        }

        const navActions = document.querySelector('.nav-actions');
        if (navActions) {
            const toggleBtn = document.createElement('button');
            toggleBtn.className = 'theme-toggle';
            toggleBtn.setAttribute('aria-label', 'Toggle Theme');
            toggleBtn.innerHTML = savedTheme === 'light' ? '<i class="fas fa-moon"></i>' : '<i class="fas fa-sun"></i>';

            toggleBtn.addEventListener('click', () => {
                const isLight = document.documentElement.classList.toggle('light-mode');
                const newTheme = isLight ? 'light' : 'dark';
                localStorage.setItem('thayer-theme', newTheme);
                toggleBtn.innerHTML = isLight ? '<i class="fas fa-moon"></i>' : '<i class="fas fa-sun"></i>';
            });

            navActions.prepend(toggleBtn);
        }
    };

    initTheme();

    // Sticky Navigation
    const nav = document.getElementById('main-nav');
    if (nav) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                nav.classList.add('scrolled');
            } else {
                nav.classList.remove('scrolled');
            }
        });
    }

    // URL Parameter Helper
    const getUrlParam = (param) => {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(param);
    };

    // Export helper
    window.thayerApp = {
        getUrlParam
    };
});

document.addEventListener('DOMContentLoaded', function() {
    // Get theme from local storage or default to light
    const getStoredTheme = () => localStorage.getItem('theme') || 'light';

    // Set theme in local storage and on document
    const setTheme = (theme) => {
        localStorage.setItem('theme', theme);
        document.documentElement.setAttribute('data-theme', theme);
    };

    // Initialize theme
    setTheme(getStoredTheme());

    // Wait for header.js to finish
    setTimeout(() => {
        // Theme toggle functionality
        const themeToggle = document.getElementById('theme-toggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', () => {
                const currentTheme = getStoredTheme();
                const newTheme = currentTheme === 'light' ? 'dark' : 'light';
                setTheme(newTheme);
            });
        }

        // Optional: Match system preference if no stored theme
        if (!localStorage.getItem('theme')) {
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            setTheme(prefersDark ? 'dark' : 'light');
        }
    }, 100); // Small delay to ensure header.js has run
});
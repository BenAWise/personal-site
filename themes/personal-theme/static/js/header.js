document.addEventListener('DOMContentLoaded', function() {
    // Get the header element
    const header = document.querySelector('header');
    
    // Create the header content with home link
    const headerContent = `
        <h1 class="site-title"><a href="/" class="site-title-link">Ben A. Wise</a></h1>
        <div class="theme-switch-wrapper">
            <button id="theme-toggle" aria-label="Toggle dark mode">
                <div class="switch">
                    <div class="switch-handle"></div>
                </div>
            </button>
        </div>
    `;
    
    // Replace the header content
    header.innerHTML = headerContent;
});
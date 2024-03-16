document.addEventListener('alpine:init', () => {
    Alpine.store('theme', {
        value: 'light',
        setTheme(themeValue) {
            this.value = themeValue;
            localStorage.setItem('theme', this.value);
        },
        toggle() {
            this.setTheme(this.value === 'dark' ? 'light' : 'dark');
        }
    });

    const themeValue = localStorage.getItem('theme');
    if (themeValue) {
        Alpine.store('theme').setTheme(themeValue);
    }
});

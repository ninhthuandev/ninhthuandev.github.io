let themeReactive = null;
document.addEventListener('alpine:init', () => {
    themeReactive = Alpine.reactive({
        value: 'light'
    });

    Alpine.store('theme', {
        value: 'light',
        setTheme(themeValue) {
            this.value = themeValue;
            localStorage.setItem('theme', this.value);
            themeReactive.value = this.value;
        },
        toggle() {
            this.setTheme(this.value === 'dark' ? 'light' : 'dark');
        },
        isDark() {
            return this.value === 'dark';
        }
    });

    const themeValue = localStorage.getItem('theme');
    if (themeValue) {
        Alpine.store('theme').setTheme(themeValue);
    }
});

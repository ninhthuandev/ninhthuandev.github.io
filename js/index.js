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

});

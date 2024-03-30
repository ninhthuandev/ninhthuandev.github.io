document.addEventListener('alpine:init', () => {

    Alpine.store('color', {
        value: '#000000',
        copied: false,

        changeColor(colorValue) {
            this.value = colorValue;
        },

        copy() {
            if (!this.copied) {
                navigator.clipboard.writeText(this.value);
                this.copied = true;
                setTimeout(() => {
                    this.copied = false;
                }, 3000);
            }

        }
    });

    document.addEventListener('DOMContentLoaded', function () {
        Coloris({
            parent: null,
            el: '.coloris-field',
            wrap: true,
            rtl: false,
            theme: 'large',
            themeMode: 'light',
            margin: 2,
            format: 'auto',
            formatToggle: true,
            alpha: true,
            forceAlpha: false,
            swatchesOnly: false,
            focusInput: true,
            selectInput: false,
            clearButton: true,
            clearLabel: 'Clear',
            closeButton: true,
            closeLabel: 'Close',
            swatches: [
                '#264653',
                '#2a9d8f',
                '#e9c46a',
                'rgb(244,162,97)',
                '#e76f51',
                '#d62828',
                'navy',
                '#07b',
                '#0096c7',
                '#00b4d880',
                'rgba(0,119,182,0.8)'
            ],
            inline: false,
            defaultColor: '#000000',
            onChange: (colorValue) => {
                Alpine.store('color').changeColor(colorValue);
            },
        });
    });
});

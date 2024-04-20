document.addEventListener('alpine:init', () => {

    Alpine.store('encodeDecode', {
        selectedType: 'BASE64',
        selectedTypeDisplayName: 'Base-64',
        supportedFile: false,

        isType(type) {
            return this.selectedType === type;
        },
        setSelectedType(type, selectedTypeDisplayName) {
            this.selectedType = type;
            this.selectedTypeDisplayName = selectedTypeDisplayName;
        },
        changeSupportedInputFile(value) {
            this.supportedInputFile = value;
        },
    })
});
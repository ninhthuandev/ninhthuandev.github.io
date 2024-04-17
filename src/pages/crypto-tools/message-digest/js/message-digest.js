document.addEventListener('alpine:init', () => {
    Alpine.store('messageDigest', {
        selectedType: 'MD5',
        selectedTypeDisplayName: 'MD5',
        supportedHmac: true,
        supportedFile: true,
        input: '',
        output: '',
        usingHmac: false,
        usingFile: false,
        secretKey: '',
        autoGenerate: true,

        isType(type) {
            return this.selectedType === type;
        },
        setInput(value) {
            this.input = value;

            if (this.autoGenerate) {
                this.generateOutput();
            }
        },
        changeInput(event) {
            this.setInput(event.target.value);
        },
        changeInputWithFile(event) {
            const file = event.target.files[0];
            const reader = new FileReader();

            reader.onload = (e) => {
                this.setInput(e.target.result);
            };

            reader.readAsArrayBuffer(file);
        },
        changeSecret(event) {
            this.secretKey = event.target.value;

            if (this.autoGenerate) {
                this.generateOutput();
            }
        },
        updateSelectedType(type, displayName, supportedHmac = true) {
            this.selectedType = type;
            this.selectedTypeDisplayName = displayName;
            this.supportedHmac = supportedHmac === 'true';
            this.supportedFile = type !== 'DOUBLE_SHA256';

            if (!this.supportedHmac) {
                this.usingHmac = false;
            }

            if (!this.supportedFile) {
                this.changeUsingFile(false);
            }

            this.generateOutput();
        },
        changeUsingHmac(value) {
          this.usingHmac = value;
          this.setInput(this.input)
        },
        changeUsingFile(value) {
            this.usingFile = value;
            this.setInput('');

            if (!this.usingFile) {
                document.getElementById('formFile').value = '';
            }
        },
        generateOutput() {
            console.log("Generate output");
            if (this.input !== '') {
                if (this.usingHmac) {
                    switch (this.selectedType) {
                        default:
                            this.output = window[this.selectedType.toLowerCase()].hmac(this.secretKey, this.input);
                            break;
                    }
                } else {
                    switch (this.selectedType) {
                        case 'DOUBLE_SHA256':
                            this.output = sha256(sha256.arrayBuffer(this.input));
                            break;
                        default:
                            this.output = window[this.selectedType.toLowerCase()](this.input);
                            break;
                    }
                }
            } else {
                this.output = '';
            }
        },
    })
});
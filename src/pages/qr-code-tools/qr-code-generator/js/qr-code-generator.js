const QrCodeType = {
    TEXT: 'TEXT',
    URL: 'URL',
    EMAIL: 'EMAIL',
    VCARD: 'VCARD',
}

const urlRegex = /^(https?|chrome):\/\/[^\s$.?#].[^\s]*$/gm;

function getUrlFormData() {
    return {
        url: '',
        validation: {
            url: {
                rule: {
                    regex: function (value) {
                        if (urlRegex.test(value)) {
                            return {
                                error: false,
                                message: '',
                            };
                        } else {
                            return {
                                error: true,
                                message: 'Please input correct URL',
                            };
                        }
                    }
                },
                error: false,
                message: '',
            },
        },
        validate (field) {
            for (const key in this.validation[field].rule) {
                const validationResult = this.validation[field].rule[key](this[field])
                if (validationResult.error) {
                    this.validation[field].error = true;
                    this.validation[field].message = validationResult.message;
                    break;
                }
                this.validation[field].error = false;
                this.validation[field].message = '';
                continue;
            }
        }
    }
}

document.addEventListener('alpine:init', () => {
    Alpine.store('qrCode', {
        type: QrCodeType.TEXT,
        value: '',
        qrCode: null,

        generateQrCode() {
            let options = {
                text: this.value
            };
            if( !this.qrCode) {
                this.qrCode = new QRCode(document.getElementById('qr-code-image'), options);
                this.qrCode.makeCode(this.value);
            } else {
                this.qrCode.makeCode(this.value);
            }
        },

        changeValueAndGenerateQrCode(value) {
            this.value = value;
            this.generateQrCode();
        },

        changeType(type) {
            this.type = type;
        },

        isType(type) {
            return this.type === type;
        }
    });

    Alpine.store('qrCode').generateQrCode();
});

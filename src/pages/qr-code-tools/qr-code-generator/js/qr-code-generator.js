const QrCodeType = {
    TEXT: 'TEXT',
    URL: 'URL',
    EMAIL: 'EMAIL',
    VCARD: 'VCARD',
    SMS: 'SMS',
    WIFI: 'WIFI',
}

const MimeType = {
    PNG: 'image/png',
    SVG: 'image/svg+xml',
    JPG: 'image/jpeg',
}

const urlRegex = /^(https?|chrome):\/\/[^\s$.?#].[^\s]*$/gm;

function validateForm(field) {
    for (const key in this.validation[field].rule) {
        const validationResult = this.validation[field].rule[key](this[field])
        if (validationResult.error) {
            this.validation[field].error = true;
            this.validation[field].message = validationResult.message;
            break;
        }
        this.validation[field].error = false;
        this.validation[field].message = '';
    }
}

function triggerDownloadImage(qrCodeBlobImage, mimeType) {
    const link = document.createElement('a');
    link.href = qrCodeBlobImage;
    link.download = 'qr-code.' + Object.keys(MimeType).find(key => MimeType[key] === mimeType).toLowerCase();
    link.click();
}

function downloadQrCode(mimeType) {
    const qrCodeImageContainer = document.getElementById('qr-code-image');
    // const qrCodeCanvas = qrCodeImageContainer.querySelector('canvas');
    // const qrCodeImage = qrCodeCanvas.toDataURL(mimeType);
    Alpine.store('qrCode').getBlobQrCodeForDownloading(mimeType).then((blob) => {
        if (mimeType !== MimeType.SVG) {
            const qrCodeBlobImage = URL.createObjectURL(blob);
            triggerDownloadImage(qrCodeBlobImage, mimeType);
        }
    });
    // if (mimeType !== MimeType.SVG) {
    //     triggerDownloadImage(qrCodeImage);
    // } else {
    //     const ctx = new C2S(500, 500);
    //     ctx.fillStyle="white";
    //
    // }
}

document.addEventListener('alpine:init', () => {
    Alpine.data('urlFormData', () => ({
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
        validate(field) {
            validateForm.apply(this, [field]);
        }
    }));

    Alpine.data('emailFormData', () => ({
        email: '',
        subject: '',
        body: '',
        toQrCodeStringFromEmailData() {
            return `mailto:${this.email}?subject=${this.subject}&body=${this.body}`;
        },
        validation: {
            email: {
                rule: {
                    regex: function (value) {
                        if (value.length === 0) {
                            return {
                                error: false,
                                message: '',
                            };
                        }
                        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                        if (emailRegex.test(value)) {
                            return {
                                error: false,
                                message: '',
                            };
                        } else {
                            return {
                                error: true,
                                message: 'Please input correct email',
                            };
                        }
                    }
                },
                error: false,
                message: '',
            },
        },
        validate(field) {
            validateForm.apply(this, [field]);
        }
    }));

    Alpine.data('vCardFormData', () => ({
        firstName: '',
        lastName: '',
        organization: '',
        jobTitle: '',
        phone: '',
        email: '',
        address: '',
        website: '',
        toQrCodeStringFromVCardData() {
            let str = `BEGIN:VCARD
            VERSION:3.0
            N:${this.lastName};${this.firstName};;;
            FN:${this.firstName} ${this.lastName}
            ORG:${this.organization}
            TITLE:${this.jobTitle}
            TEL:${this.phone}
            EMAIL:${this.email}
            ADR:;;${this.address};;;;;
            URL:${this.website}
            END:VCARD`;

            // remove indentations
            str = str.replace(/  +/g, '');

            console.log(str);
            return str;
        }
    }));

    Alpine.data('smsFormData', () => ({
        phoneNumber: '',
        message: '',
        toQrCodeStringFromSmsData() {
            return `SMSTO:${this.phoneNumber}:${this.message}`;
        }
    }));

    Alpine.data('wifiFormData', () => ({
        ssid: '',
        hidden: false,
        password: '',
        encryption: 'WPA',
        toQrCodeStringFromWifiData() {
            return `WIFI:S:${this.ssid};T:${this.encryption};P:${this.password};H:${this.hidden ? 'true' : 'false'};`;
        }
    }));

    const defaultQrCodeOptions = {
        correctLevel: QRCode.CorrectLevel.M,
        drawer: 'canvas',
        quietZone: 20,
    }

    Alpine.store('qrCode', {
        type: QrCodeType.TEXT,
        value: '',
        qrCode: null,

        generateQrCode() {
            let options = {
                ...defaultQrCodeOptions,
                text: this.value,
            };
            if (!this.qrCode) {
                this.qrCode = new QRCode(document.getElementById('qr-code-image'), options);
                this.qrCode.makeCode(this.value);
            } else {
                this.qrCode.makeCode(this.value);
            }
        },

        getBlobQrCodeForDownloading(mimeType) {
            let options = {
                ...defaultQrCodeOptions,
                text: this.value,
                drawer: mimeType === MimeType.SVG ? 'svg' : 'canvas',
                onRenderingEnd: (_, data) => {
                    if (mimeType === MimeType.SVG) {
                        let blob = new Blob([data], {type: MimeType.SVG});

                        let objectUrl = URL.createObjectURL(blob);

                        triggerDownloadImage(objectUrl, mimeType);
                    } else {
                        triggerDownloadImage(data, mimeType);
                    }
                }
            };

            let fakeElement = document.createElement('div');

            fakeElement.style.width = '1000px';
            let qrCode = new QRCode(fakeElement, options);
            qrCode.makeCode(this.value);
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
})
;

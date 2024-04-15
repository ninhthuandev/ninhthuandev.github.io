function text2Unit8Array(string, encoding) {
    let textEncoder = new TextEncoder();
    return textEncoder.encode(string);
}

function encode(s) {
    return unescape(encodeURIComponent(s));
}

function decode(s) {
    return decodeURIComponent(escape(s));
}

document.addEventListener('alpine:init', () => {
    const str = 'Thuбєn';
    const utf8String = text2Unit8Array(str, 'window-1251');

    console.log(utf8String);
    console.log(md5(utf8String));
    console.log(text2Unit8Array('Thuận', 'utf-8'));
    console.log(md5(text2Unit8Array('Thuận', 'utf-8')))

    Alpine.store('messageDigest', {
        selectedType: 'MD5',
        selectedTypeDisplayName: 'MD5',
        input: '',
        output: '',
        usingHmac: false,
        hmacKey: '',
        autoGenerate: true,

        isType(type) {
            return this.selectedType === type;
        },
        changeInput(event) {
            console.log(event.target.value)
            this.input = event.target.value;

            if (this.autoGenerate) {
                this.generateOutput();
            }
        },
        updateSelectedType(type, displayName) {
            this.selectedType = type;
            this.selectedTypeDisplayName = displayName;

            this.generateOutput();
        },
        generateOutput() {
            console.log(this.selectedType);

            if (this.input !== '') {
                switch (this.selectedType) {
                    case 'DOUBLE_SHA256':
                        this.output = sha256(sha256.arrayBuffer(this.input));
                        break;
                    case 'SHAKE128':
                        this.output = shake128(this.input, 256);
                        break;
                    case 'SHAKE256':
                        this.output = shake256(this.input, 512);
                        break;
                    default:
                        this.output = window[this.selectedType.toLowerCase()](this.input);
                        break;
                }

            } else {
                this.output = '';
            }
        },
    })
});
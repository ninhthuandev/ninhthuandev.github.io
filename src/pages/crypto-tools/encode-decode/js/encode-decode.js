const Type = {
    TEXT: 'TEXT',
    FILE: 'FILE',
};

const Mode = {
    ENCODE: 'ENCODE',
    DECODE: 'DECODE',
}

document.addEventListener('alpine:init', () => {

    Alpine.store('encodeDecode', {
        selectedType: 'BASE64',
        selectedTypeDisplayName: 'Base-64',
        supportedFile: true,

        inputType: Type.TEXT,
        outputType: Type.TEXT,

        input: '',
        output: '',
        outputFileName: 'output.txt',

        mode: Mode.ENCODE,

        errorMessage: '',

        isType(type) {
            return this.selectedType === type;
        },
        setSelectedType(type, selectedTypeDisplayName, supportedFile) {
            this.selectedType = type;
            this.supportedFile = supportedFile === 'true';
            this.selectedTypeDisplayName = selectedTypeDisplayName;

            if (this.mode === Mode.ENCODE) {
                this.setInput(this.input);
            } else {
                this.setInput('');
            }
        },
        setInput(value) {
            try {
                this.input = value;
                this.generateOutput();
                this.errorMessage = '';
            } catch (err) {
                this.errorMessage = err.message;
                console.log(err);
            }
        },
        changeInputType(inputType) {
            this.setInput('');
            if (this.supportedFile === false && inputType === Type.FILE) {
                return;
            }

            this.inputType = inputType;

            if (this.inputType === Type.FILE) {
                this.outputType = Type.TEXT;
            }
        },
        changeOutputType(outputType) {
            if (this.supportedFile === false && outputType === Type.FILE) {
                return;
            }
            this.outputType = outputType;

            if (this.outputType === Type.FILE) {
                this.inputType = Type.TEXT;
            }
        },
        switchMode() {
            this.mode = this.mode === Mode.ENCODE ? Mode.DECODE : Mode.ENCODE;
            this.setTypeForCurrentMode();
            this.setInput('');
        },
        setTypeForCurrentMode() {
            if (this.mode === Mode.ENCODE) {
                this.outputType = Type.TEXT;
            } else {
                this.inputType = Type.TEXT;
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
        generateOutput() {
            if (this.input === '') {
                this.output = '';
                document.getElementById('inputFile').value = '';
                return;
            }

            if (this.mode === Mode.ENCODE) {
                this.output = this.encode(this.input);
            } else if (this.outputType === Type.TEXT) {
                this.output = this.decode(this.input);
            } else {
                this.output = this.decodeToBytes(this.input);
            }
        },
        downloadOutputAsFile() {
            this.setInput(this.input);

            const fileExtension = this.outputFileName.split('.').pop();
            // let mimeType = mime.getType(fileExtension);

            const blob = new Blob([this.output]);
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = this.outputFileName;
            a.click();
        },
        encode(input) {
            let dataToStartEncode = input;

            if (this.selectedType === 'BASE58') {
                return base58Encode(input);
            }

            if (this.selectedType.includes('BASE')) {
                return window[this.selectedType.toLowerCase()].encode(dataToStartEncode);
            } else return '';
        },
        decode(input) {
            let output = '';

            if (this.selectedType === 'BASE58') {
                output = base58Decode(input);
            } else if (this.selectedType.includes('BASE')) {
                output = window[this.selectedType.toLowerCase()].decode(input);
            } else output = '';

            return output;
        },
        decodeToBytes(input) {
            let output = '';

            if (this.selectedType === 'BASE58') {
                output = base58.decode(input);
            } else if (this.selectedType === 'BASE32') {
                output = new Uint8Array(window[this.selectedType.toLowerCase()].decode.asBytes(input));
            } else if (this.selectedType.includes('BASE')) {
                output = new Uint8Array(window[this.selectedType.toLowerCase()].decode.bytes(input));
            } else output = '';

            return output;
        }
    })
});
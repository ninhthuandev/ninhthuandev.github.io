const Type = {
    TEXT: 'TEXT',
    FILE: 'FILE',
};

const Mode = {
    ENCODE: 'ENCODE',
    DECODE: 'DECODE',
}

const FileType = {
    CUSTOM: 'CUSTOM',
    IMG: 'IMG',
    PDF: 'PDF',
}

const MapMimeType = {

    "image/png": {
        extension: 'png',
        bytes: [137, 80, 78, 71],
    },
    "image/jpeg": {
        extension: 'jpeg',
        bytes: [255, 216],
    },
    "image/gif": {
        extension: 'gif',
        bytes: [71, 73, 70, 56],
    },
    "image/svg+xml": {
        extension: 'svg',
        bytes: [60, 63, 120, 109],
    },
    "image/webp": {
        extension: 'webp',
        bytes: [82, 73, 70, 70],
    },
    "image/tiff": {
        extension: 'tiff',
        bytes: [77, 77, 0, 42],
    },
    "image/x-icon": {
        extension: 'ico',
        bytes: [0, 0, 1, 0],
    },
    "image/bmp": {
        extension: 'bmp',
        bytes: [66, 77],
    },
    "image/vnd.adobe.photoshop": {
        extension: 'psd',
        bytes: [56, 66, 80, 83],
    },
    "text/csv": {
        extension: 'csv',
        bytes: [44],
    },
    "text/html": {
        extension: 'html',
        bytes: [60, 104, 116, 109, 108, 62],
    },
    "text/css": {
        extension: 'css',
        bytes: [47, 42],
    },
    "text/javascript": {
        extension: 'js',
        bytes: [47, 47],
    },
    "application/json": {
        extension: 'json',
        bytes: [123],
    },
    "application/xml": {
        extension: 'xml',
        bytes: [60, 63, 120, 109, 108],
    },
    "application/vnd.ms-excel": {
        extension: 'xls',
        bytes: [208, 207, 17, 224, 161, 177, 26, 225],
    },
    "application/vnd.ms-powerpoint": {
        extension: 'ppt',
        bytes: [208, 207, 17, 224, 161, 177, 26, 225],
    },
    "application/msword": {
        extension: 'doc',
        bytes: [208, 207, 17, 224, 161, 177, 26, 225],
    },
    "application/pdf": {
        extension: 'pdf',
        bytes: [37, 80, 68, 70],
    },
    "application/zip": {
        extension: 'zip',
        bytes: [80, 75, 3, 4],
    },
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document": {
        extension: 'docx',
        bytes: [80, 75, 3, 4],
    },
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": {
        extension: 'xlsx',
        bytes: [80, 75, 3, 4],
    },
    "application/x-rar-compressed": {
        extension: 'rar',
        bytes: [82, 97, 114, 33, 26, 7, 0],
    },
    "audio/mpeg": {
        extension: 'mp3',
        bytes: [255, 251, 3],
    },
    "audio/wav": {
        extension: 'wav',
        bytes: [82, 73, 70, 70, 0, 0, 0, 0, 87, 65, 86, 69],
    },
    "audio/ogg": {
        extension: 'ogg',
        bytes: [79, 103, 103, 83],
    },
    "audio/flac": {
        extension: 'flac',
        bytes: [102, 76, 97, 67],
    },
    "audio/aac": {
        extension: 'aac',
        bytes: [255, 251, 3],
    },
    "video/mp4": {
        extension: 'mp4',
        bytes: [0, 0, 0, 0, 102, 116, 121, 112, 105, 115, 111, 109, 0, 0, 0, 18, 109, 112, 52, 49],
    },
    "video/x-msvideo": {
        extension: 'avi',
        bytes: [82, 73, 70, 70, 0, 0, 0, 0, 65, 86, 73, 32],
    },
    "video/x-matroska": {
        extension: 'mkv',
        bytes: [1, 0, 0, 0, 15, 67, 44, 61],
    },
    "video/quicktime": {
        extension: 'mov',
        bytes: [0, 0, 0, 20, 102, 116, 121, 112, 113, 116, 32, 32],
    },
    "video/x-ms-wmv": {
        extension: 'wmv',
        bytes: [48, 38, 178, 117, 142, 102, 207, 17, 131, 137, 0, 170, 0, 170, 0, 42],
    },
    "video/webm": {
        extension: 'webm',
        bytes: [26, 69, 223, 163],
    },
    "video/x-flv": {
        extension: 'flv',
        bytes: [70, 76, 86, 1],
    },
    "video/3gpp": {
        extension: '3gp',
        bytes: [0, 0, 0, 20, 102, 116, 121, 112, 51, 103, 112, 52],
    },
    "video/3gpp2": {
        extension: '3g2',
        bytes: [0, 0, 0, 20, 102, 116, 121, 112, 51, 103, 112, 50],
    },
}

function getMimeTypeFromUnit8ByteArray(unit8ByteArray) {
    for (const mimeType in MapMimeType) {
        const mimeTypeData = MapMimeType[mimeType];
        const mimeTypeBytes = mimeTypeData.bytes;
        let bytesLength = mimeTypeBytes.length;
        for (let i = 0; i < bytesLength; i++) {
            if (unit8ByteArray[i] !== mimeTypeBytes[i]) {
                break;
            }
            if (i === bytesLength - 1) {
                return mimeType;
            }
        }
    }
    return null;
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
        outputFileMimeType: null,
        outputPreviewData: null,

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

            this.setInput(this.input);
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
                this.outputFileMimeType = null;
                this.outputPreviewData = null;
                this.outputFileName = 'output.txt';
                document.getElementById('inputFile').value = '';
                return;
            }

            if (this.mode === Mode.ENCODE) {
                this.output = this.encode(this.input);
            } else if (this.outputType === Type.TEXT) {
                this.output = this.decode(this.input);
            } else {
                this.output = this.decodeToBytes(this.input);
                this.updateInfoForBytesData(this.output);
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
        },
        updateInfoForBytesData(output) {
            const mimeType = getMimeTypeFromUnit8ByteArray(output);
            if (mimeType) {
                const mimeTypeData = MapMimeType[mimeType];
                this.outputFileName = `output.${mimeTypeData.extension}`;
                this.outputFileMimeType = mimeType;

                if (mimeType.includes('image')) {
                    this.outputPreviewData = URL.createObjectURL(new Blob([output], { type: mimeType }));
                }
            } else {
                this.outputFileName = 'output.txt';
                this.outputFileMimeType = null;
            }
        }
    })
});
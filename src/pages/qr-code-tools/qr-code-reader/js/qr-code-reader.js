const html5QrCodeForCamera = new Html5Qrcode("reader");
const html5QrCodeForFileUpload = new Html5Qrcode("file-reader");

function startScanningQrCode(cameraId) {
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    const readerWidth = document.getElementById('reader').offsetWidth;
    const readerHeight = windowHeight * readerWidth / windowWidth;

    const qrBoxRatio = 0.7;
    let qrBoxSize = readerWidth * qrBoxRatio;

    if (readerHeight < readerWidth) {
        qrBoxSize = readerHeight * qrBoxRatio;
    }

    if (!Alpine.store('qrCode')) {
        return;
    } else {
        Alpine.store('qrCode').setScanning(true);
    }

    html5QrCodeForCamera.start(
        cameraId,
        {
            fps: 10,
            qrbox: {width: qrBoxSize, height: qrBoxSize}  // Optional, if you want bounded box UI
        },
        (decodedText, decodedResult) => {
            html5QrCodeForCamera.stop().then(ignore => {
                console.log("QR Code stopped", ignore);
            }).catch(err => {
                console.log("Error", err);
            }).finally(() => {
                Alpine.store('qrCode').setScanning(false);
                Alpine.store('qrCode').setDecodedInfo(decodedText, decodedResult);
            });
        },
        (errorMessage) => {
            console.log(errorMessage);
        })
        .catch((err) => {
            console.log(err);
        });

}

function decodeQrCodeFromImage(event) {
    const files = event.target.files;
    if (files.length === 0) {
        return;
    }
    const imageFile = event.target.files[0];
    // Scan QR Code
    html5QrCodeForFileUpload.scanFile(imageFile, true)
        .then(decodedText => {
            Alpine.store('qrCode').setDecodedInfo(decodedText, null);
        })
        .catch(err => {
            console.log("Error cannot decode QR Code from image", err);
            Alpine.store('qrCode').setDecodedInfo(null, null, true);
        });
}

function stopScanningQrCode() {
    try {
        html5QrCodeForCamera.stop().then(ignore => {
            console.log("QR Code stopped", ignore);
        }).catch(err => {
            console.log("Error", err);
            html5QrCodeForCamera.clear();
        }).finally(() => {
            Alpine.store('qrCode').setScanning(false);
        });
    } catch (err) {
        html5QrCodeForCamera.clear();
        console.error("ERR: ",err);
    } finally {
        Alpine.store('qrCode').setScanning(false);
    }
}

const Tabs = {
    CAMERA: 'CAMERA',
    FILE_UPLOAD: 'FILE_UPLOAD',
}

document.addEventListener('alpine:init', () => {
    Alpine.store('tab', {
        selectedTab: Tabs.CAMERA,

        isTab(tab) {
            return this.selectedTab === tab;
        },

        switchTab(tab) {
            this.selectedTab = tab;

            Alpine.store('qrCode').setDecodedInfo(undefined, undefined);
            html5QrCodeForCamera.clear();
            html5QrCodeForFileUpload.clear();
        }
    });

    Alpine.store('cameraDevices', {
        devices: [{id: '', label: ''}],
        selectedDevice: {},
        setDevices(devices) {
            this.devices = devices;
            this.selectedDevice = devices[0];
        },
        changeDevices(event) {
            const deviceId = event.target.value;
            this.selectedDevice = this.devices.find(device => device.id === deviceId);
        }
    });

    Alpine.store('qrCode', {
        decodedText: undefined,
        decodedResult: undefined,
        scanning: false,
        isError: false,

        setDecodedInfo(decodedText, decodedResult, isError = false) {
            this.decodedText = decodedText;
            this.decodedResult = decodedResult;
            this.isError = isError;
        },
        setScanning(scanning) {
            this.scanning = scanning;
        }
    });

    // This method will trigger user permissions
    Html5Qrcode.getCameras().then(devices => {
        /**
         * devices would be an array of objects of type:
         * { id: "id", label: "label" }
         */
        if (devices && devices.length) {
            console.log("Devices:", devices);

            Alpine.store('cameraDevices').setDevices(devices);

            console.log("Test", Alpine.store('cameraDevices').devices[0].id);
        }
    }).catch(err => {
        console.error('Error');
    });
});
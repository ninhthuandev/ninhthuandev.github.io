const html5QrCode = new Html5Qrcode("reader");

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

    html5QrCode.start(
        cameraId,
        {
            fps: 10,
            qrbox: {width: qrBoxSize, height: qrBoxSize}  // Optional, if you want bounded box UI
        },
        (decodedText, decodedResult) => {
            html5QrCode.stop().then(ignore => {
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

function stopScanningQrCode() {
    html5QrCode.stop().then(ignore => {
        console.log("QR Code stopped", ignore);
    }).catch(err => {
        console.log("Error", err);
    }).finally(() => {
        Alpine.store('qrCode').setScanning(false);
    });
}

document.addEventListener('alpine:init', () => {
    Alpine.store('cameraDevices', {
        devices: [{id: '', label: ''}],
        selectedDevice: {},
        setDevices(devices) {
            this.devices = devices;
            this.selectedDevice = devices[0];
        },
    });

    Alpine.store('qrCode', {
        decodedText: undefined,
        decodedResult: undefined,
        scanning: false,

        setDecodedInfo(decodedText, decodedResult) {
            this.decodedText = decodedText;
            this.decodedResult = decodedResult;
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
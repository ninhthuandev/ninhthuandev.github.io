function initView(cameraId) {
    const html5QrCode = new Html5Qrcode("reader");
    const readerWidth = document.getElementById('reader').offsetWidth;
    const readerHeight = document.getElementById('reader').offsetHeight;

    console.log("Reader Width", readerWidth);
    console.log("Reader Height", readerHeight);

    let qrBoxSize = readerWidth * 0.8;

    if (readerHeight < readerWidth) {
        qrBoxSize = readerHeight * 0.8;
    }
    console.log("QR Box Size", qrBoxSize);

    html5QrCode.start(
        cameraId,
        {
            fps: 10,
            qrbox: {width: qrBoxSize, height: qrBoxSize}  // Optional, if you want bounded box UI
        },
        (decodedText, decodedResult) => {
            Alpine.store('qrCode').setDecodedInfo(decodedText, decodedResult);

            html5QrCode.stop().then(ignore => {
                console.log("QR Code stopped", ignore);
            }).catch(err => {
                console.log("Error", err);
            });
        },
        (errorMessage) => {
            console.log(errorMessage);
        })
        .catch((err) => {
            console.log(err);
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

        setDecodedInfo(decodedText, decodedResult) {
            this.decodedText = decodedText;
            this.decodedResult = decodedResult;
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
        // console.error('Error')
        // handle err
    });
});
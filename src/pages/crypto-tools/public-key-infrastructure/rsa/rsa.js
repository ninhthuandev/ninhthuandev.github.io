document.addEventListener('alpine:init', () => {
    var rsa = forge.pki.rsa;

    console.log(rsa)

    Alpine.store('rsa', {
        bits: 2048,
        privateKeyPem: '',
        publicKeyPem: '',

        init() {
            this.generateKeyPair();
        },

        generateKeyPair() {
            const param = {
                bits: this.bits,
                workers: 2,
            };

            const root = this;
            rsa.generateKeyPair(param, function (err, keypair) {
                root.privateKeyPem = forge.pki.privateKeyToPem(keypair.privateKey);
                root.publicKeyPem = forge.pki.publicKeyToPem(keypair.publicKey);
            });
        }
    });

    Alpine.store('encryption', {
        clearText: "",
        encryptedText: "",
        errorMessage: "",
        algorithm: 'RSAES-PKCS1-V1_5',

        encrypt() {
            try {
                const publicKeyPem = Alpine.store('rsa').publicKeyPem;
                console.log(publicKeyPem);
                const publicKey = forge.pki.publicKeyFromPem(publicKeyPem);
                const clearText = this.clearText;
                this.encryptedText = forge.util.encode64(this.encryptWithAlgorithm(publicKey, clearText, this.algorithm));
            } catch (e) {
                this.errorMessage = e.message;
                throw e;
            }
        },

        encryptWithAlgorithm(publicKey, clearText, algorithm) {
            switch (algorithm) {
                case 'RSAES-PKCS1-V1_5':
                    return publicKey.encrypt(clearText);
                case 'RSA-OAEP':
                    return publicKey.encrypt(clearText, 'RSA-OAEP');
                case 'RSAES-OAEP/SHA-256':
                    return publicKey.encrypt(clearText, 'RSA-OAEP', {
                        md: forge.md.sha256.create()
                    });
                case 'RSAES-OAEP/SHA-256/MGF1-SHA-1':
                    return publicKey.encrypt(clearText, 'RSA-OAEP', {
                        md: forge.md.sha256.create(),
                        mgf1: {
                            md: forge.md.sha1.create()
                        }
                    });
                default:
                    throw new Error('Invalid algorithm');
            }
        },

        decrypt() {
            try {
                const privateKeyPem = Alpine.store('rsa').privateKeyPem;
                console.log(privateKeyPem);
                const privateKey = forge.pki.privateKeyFromPem(privateKeyPem);
                const encryptedText = this.encryptedText;
                this.clearText = this.decryptWithAlgorithm(privateKey, forge.util.decode64(encryptedText), this.algorithm);
            } catch (e) {
                this.errorMessage = e.message;
                throw e;
            }
        },

        decryptWithAlgorithm(privateKey, encryptedText, algorithm) {
            switch (algorithm) {
                case 'RSAES-PKCS1-V1_5':
                    return privateKey.decrypt(encryptedText);
                case 'RSA-OAEP':
                    return privateKey.decrypt(encryptedText, 'RSA-OAEP');
                case 'RSAES-OAEP/SHA-256':
                    return privateKey.decrypt(encryptedText, 'RSA-OAEP', {
                        md: forge.md.sha256.create()
                    });
                case 'RSAES-OAEP/SHA-256/MGF1-SHA-1':
                    return privateKey.decrypt(encryptedText, 'RSA-OAEP', {
                        md: forge.md.sha256.create(),
                        mgf1: {
                            md: forge.md.sha1.create()
                        }
                    });
                default:
                    throw new Error('Invalid algorithm');
            }
        }
    })
});
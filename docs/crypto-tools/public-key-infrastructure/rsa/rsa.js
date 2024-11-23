"use strict";document.addEventListener("alpine:init",function(){var r=forge.pki.rsa;console.log(r),Alpine.store("rsa",{bits:2048,privateKeyPem:"",publicKeyPem:"",init:function(){this.generateKeyPair()},generateKeyPair:function(){var e={bits:this.bits,workers:2},t=this;r.generateKeyPair(e,function(e,r){t.privateKeyPem=forge.pki.privateKeyToPem(r.privateKey),t.publicKeyPem=forge.pki.publicKeyToPem(r.publicKey)})}}),Alpine.store("encryption",{clearText:"",encryptedText:"",errorMessage:"",algorithm:"RSAES-PKCS1-V1_5",encrypt:function(){try{var e=Alpine.store("rsa").publicKeyPem;console.log(e);var r=forge.pki.publicKeyFromPem(e),t=this.clearText;this.encryptedText=forge.util.encode64(this.encryptWithAlgorithm(r,t,this.algorithm))}catch(e){throw this.errorMessage=e.message,e}},encryptWithAlgorithm:function(e,r,t){switch(t){case"RSAES-PKCS1-V1_5":return e.encrypt(r);case"RSA-OAEP":return e.encrypt(r,"RSA-OAEP");case"RSAES-OAEP/SHA-256":return e.encrypt(r,"RSA-OAEP",{md:forge.md.sha256.create()});case"RSAES-OAEP/SHA-256/MGF1-SHA-1":return e.encrypt(r,"RSA-OAEP",{md:forge.md.sha256.create(),mgf1:{md:forge.md.sha1.create()}});default:throw new Error("Invalid algorithm")}},decrypt:function(){try{var e=Alpine.store("rsa").privateKeyPem;console.log(e);var r=forge.pki.privateKeyFromPem(e),t=this.encryptedText;this.clearText=this.decryptWithAlgorithm(r,forge.util.decode64(t),this.algorithm)}catch(e){throw this.errorMessage=e.message,e}},decryptWithAlgorithm:function(e,r,t){switch(t){case"RSAES-PKCS1-V1_5":return e.decrypt(r);case"RSA-OAEP":return e.decrypt(r,"RSA-OAEP");case"RSAES-OAEP/SHA-256":return e.decrypt(r,"RSA-OAEP",{md:forge.md.sha256.create()});case"RSAES-OAEP/SHA-256/MGF1-SHA-1":return e.decrypt(r,"RSA-OAEP",{md:forge.md.sha256.create(),mgf1:{md:forge.md.sha1.create()}});default:throw new Error("Invalid algorithm")}}})});
//# sourceMappingURL=rsa.js.map
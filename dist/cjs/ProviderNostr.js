"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProviderNostr = void 0;
const ProviderNostrBase_1 = require("./ProviderNostrBase");
function isWalletEventMethodMatch(method, name) {
    return method === `metamask_${name}` || method === `wallet_events_${name}`;
}
const PROVIDER_EVENTS = {
    'connect': 'connect',
    'disconnect': 'disconnect',
    'accountChanged': 'accountChanged',
    'message_low_level': 'message_low_level',
};
class ProviderNostr extends ProviderNostrBase_1.ProviderNostrBase {
    constructor(props) {
        super(props);
        this.states = {
            enabled: false,
            executing: false
        };
        this.nip04 = {
            encrypt: (pubkey, plaintext) => __awaiter(this, void 0, void 0, function* () {
                const result = yield this._callBridge({ method: "encrypt", params: { pubkey, plaintext } });
                return result;
            }),
            decrypt: (pubkey, ciphertext) => __awaiter(this, void 0, void 0, function* () {
                const result = yield this._callBridge({ method: "decrypt", params: { pubkey, ciphertext } });
                return result;
            }),
        };
        this._registerEvents();
    }
    _registerEvents() {
        window.addEventListener('chargerwallet_bridge_disconnect', () => {
            this._handleDisconnected();
        });
        this.on(PROVIDER_EVENTS.message_low_level, (payload) => {
            const { method } = payload;
            if (isWalletEventMethodMatch(method, PROVIDER_EVENTS.accountChanged)) {
                this._handleAccountChange();
            }
        });
    }
    _handleDisconnected(options = { emit: true }) {
        if (options.emit && this.isConnectionStatusChanged('disconnected')) {
            this.emit('disconnect');
            this.emit('accountChanged');
        }
    }
    _handleAccountChange() {
        this.emit('accountChanged');
    }
    on(event, listener) {
        return super.on(event, listener);
    }
    off(event, listener) {
        return super.off(event, listener);
    }
    emit(event, ...args) {
        return super.emit(event, ...args);
    }
    _callBridge(params) {
        return this.bridgeRequest(params);
    }
    enable() {
        return __awaiter(this, void 0, void 0, function* () {
            return Promise.resolve(true);
        });
    }
    getPublicKey() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this._callBridge({ method: "getPublicKey" });
            return result;
        });
    }
    signEvent(event) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this._callBridge({ method: "signEvent", params: { event } });
            return result;
        });
    }
    getRelays() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this._callBridge({ method: "getRelays" });
            return result;
        });
    }
    encrypt(pubkey, plaintext) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this._callBridge({ method: "encrypt", params: { pubkey, plaintext } });
            return result;
        });
    }
    decrypt(pubkey, ciphertext) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this._callBridge({ method: "decrypt", params: { pubkey, ciphertext } });
            return result;
        });
    }
    signSchnorr(sigHash) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this._callBridge({ method: "signSchnorr", params: sigHash });
            return result;
        });
    }
}
exports.ProviderNostr = ProviderNostr;

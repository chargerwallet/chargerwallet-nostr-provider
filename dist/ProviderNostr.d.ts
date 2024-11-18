import { IInpageProviderConfig } from "@chargerwallet/cross-inpage-provider-core";
import { ProviderNostrBase } from "./ProviderNostrBase";
import { IProviderNostr, NostrProviderEventsMap, Event, IRelay } from "./types";
declare class ProviderNostr extends ProviderNostrBase implements IProviderNostr {
    private states;
    constructor(props: IInpageProviderConfig);
    private _registerEvents;
    private _handleDisconnected;
    private _handleAccountChange;
    on<E extends keyof NostrProviderEventsMap>(event: E, listener: NostrProviderEventsMap[E]): this;
    off<E extends keyof NostrProviderEventsMap>(event: E, listener: NostrProviderEventsMap[E]): this;
    emit<E extends keyof NostrProviderEventsMap>(event: E, ...args: Parameters<NostrProviderEventsMap[E]>): boolean;
    private _callBridge;
    enable(): Promise<boolean>;
    getPublicKey(): Promise<string>;
    signEvent(event: Event): Promise<Event>;
    getRelays(): Promise<IRelay>;
    encrypt(pubkey: string, plaintext: string): Promise<string>;
    decrypt(pubkey: string, ciphertext: string): Promise<string>;
    nip04: {
        encrypt: (pubkey: string, plaintext: string) => Promise<string>;
        decrypt: (pubkey: string, ciphertext: string) => Promise<string>;
    };
    signSchnorr(sigHash: string): Promise<string>;
}
export { ProviderNostr };

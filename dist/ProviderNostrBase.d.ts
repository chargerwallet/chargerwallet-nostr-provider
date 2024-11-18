import { IInjectedProviderNames } from '@chargerwallet/cross-inpage-provider-types';
import { ProviderBase, IInpageProviderConfig } from '@chargerwallet/cross-inpage-provider-core';
declare class ProviderNostrBase extends ProviderBase {
    constructor(props: IInpageProviderConfig);
    protected readonly providerName = IInjectedProviderNames.nostr;
    request(data: unknown): Promise<unknown>;
}
export { ProviderNostrBase };

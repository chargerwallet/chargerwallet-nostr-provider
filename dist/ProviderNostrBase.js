import { IInjectedProviderNames } from '@chargerwallet/cross-inpage-provider-types';
import { ProviderBase } from '@chargerwallet/cross-inpage-provider-core';
class ProviderNostrBase extends ProviderBase {
    constructor(props) {
        super(props);
        this.providerName = IInjectedProviderNames.nostr;
    }
    request(data) {
        return this.bridgeRequest(data);
    }
}
export { ProviderNostrBase };

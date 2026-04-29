import { type Provider, providerRegistry } from '@debug-panel/providers';

export function registerProvider( definition: Provider ): void {
    providerRegistry.add( definition );
}

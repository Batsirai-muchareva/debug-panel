import { type Provider, providerRegistry } from '@debug-panel/providers';

export function registerProvider<TData>( definition: Provider<TData> ): void {
  providerRegistry.add( definition );
}

import { persisted } from 'svelte-local-storage-store';

export const packOrder = persisted<string[]>('material-pack-order', []);

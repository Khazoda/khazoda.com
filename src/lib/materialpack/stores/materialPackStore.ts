import { writable } from 'svelte/store';
import { persisted } from 'svelte-local-storage-store';
import { get } from 'svelte/store';

// Add new types for managing multiple packs
type MaterialPackList = {
	packs: { [key: string]: MaterialPack }; // Using pack_name as key
	currentPack: string | null;
};

// Initial state
const initialState: MaterialPack = {
	localstorage_id: '',
	pack_name: '',
	mod_dependency_name: '',
	mod_dependency_modid: '',
	minecraft_version: '',
	materials: [],
	pack_icon: null
};

const initialPackListState: MaterialPackList = {
	packs: {},
	currentPack: null
};

// Create stores
export const materialPacks = persisted<MaterialPackList>('material-packs', initialPackListState);
export const materialPack = writable<MaterialPack>(initialState);

// Generate unique ID
const generateUniqueId = () => {
	return Date.now().toString(36) + Math.random().toString(36).substring(2);
};

// Update current pack whenever it changes
materialPacks.subscribe(({ packs, currentPack }) => {
	if (currentPack && packs[currentPack]) {
		materialPack.set(packs[currentPack]);
	} else {
		materialPack.set(initialState);
	}
});

// Helper functions
export const createNewPack = () => {
	if (Object.keys(get(materialPacks).packs).length >= 10) {
		throw new Error('Maximum number of packs (10) reached');
	}

	const localstorage_id = generateUniqueId();
	const newPack = {
		...initialState,
		localstorage_id,
		pack_name: ``,
		pack_icon:
			'data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgBAMAAACBVGfHAAABgWlDQ1BzUkdCIElFQzYxOTY2LTIuMQAAKJF1kbtLA0EQh78kimKUCFGwsAiSWBnRCEEbi4hGQS1iBF9NcnkJeRx3CRJsBVtBQbTxVehfoK1gLQiKIoi1too2KudcEkgQM8vOfvvbmWF3FqzhtJLRGwYgk81roWDAtbC45Gp6xYITOx46I4quzsxNhKlrn/cSLXbrNWvVj/vX7LG4roClWXhUUbW88KTw9FpeNXlHuENJRWLCZ8J9mlxQ+M7Uo2V+MTlZ5m+TtXBoDKztwq5kDUdrWElpGWF5Oe5MuqBU7mO+pDWenZ+TtUdmNzohggRwMcU4Y/gZZES8Hy8++mVHnfyBUv4sOclVxKsU0VglSYo8faIWpHpc1oTocRlpimb///ZVTwz5ytVbA9D4bBjvHmjahp8tw/g6MoyfY7A9wWW2mp87hOEP0beqmvsAHBtwflXVortwsQldj2pEi5Qkm0xrIgFvp9C2CM4baFku96xyzskDhNflq65hbx96Jd6x8gtehWfiZr0+nQAAAAlwSFlzAAALEwAACxMBAJqcGAAAACFQTFRFAAAANzc3VlZWek4/i4uLqWJKrmVMvX5pw4p3y8vL////0LzRUAAAAAF0Uk5TAEDm2GYAAABnSURBVCjPY2AgDARRAFBAvLy8vLgcCgpBAh0dHc0dUAARQGiQAAs0KsGAikQgWEBzJhTMEiNTQNgQISBsSCVDaSIgSoZAIoaA1yoYgAogAhkikJaWlpwGBWCB0NDQ4FAoCMQWlYQAALdlmknY+BjuAAAAAElFTkSuQmCC'
	};

	materialPacks.update((state) => ({
		...state,
		packs: { ...state.packs, [localstorage_id]: newPack },
		currentPack: localstorage_id
	}));
};

export const selectPack = (packId: string | null) => {
	materialPacks.update((state) => {
		if (packId === null || state.packs[packId]) {
			return {
				...state,
				currentPack: packId
			};
		}
		return state;
	});
};

export const deletePack = (packId: string) => {
	materialPacks.update((state) => {
		const { [packId]: removed, ...remainingPacks } = state.packs;
		return {
			packs: remainingPacks,
			currentPack: state.currentPack === packId ? null : state.currentPack
		};
	});
};

// Update pack helper
export const updatePack = (packId: string, updatedPack: Partial<MaterialPack>) => {
	materialPacks.update((state) => {
		if (state.packs[packId]) {
			return {
				...state,
				packs: {
					...state.packs,
					[packId]: {
						...state.packs[packId],
						...updatedPack
					}
				}
			};
		}
		return state;
	});
};

// Update existing helper functions to work with the new structure
export const addMaterial = () => {
	materialPack.update((pack) => {
		const updatedPack = {
			...pack,
			materials: [
				...pack.materials,
				{
					name: '',
					durability: 0,
					attack_damage_bonus: 0,
					attack_speed_bonus: 0,
					reach_bonus: 0,
					enchantability: 0,
					repair_ingredient: '',
					textures: {
						dagger: null,
						hammer: null,
						club: null,
						spear: null,
						spear_held: null,
						quarterstaff: null,
						quarterstaff_held: null,
						glaive: null,
						glaive_held: null
					}
				}
			]
		};

		// Update the pack in the packs store
		materialPacks.update((state) => ({
			...state,
			packs: {
				...state.packs,
				[pack.pack_name]: updatedPack
			}
		}));

		return updatedPack;
	});
};

export const removeMaterial = (index: number) => {
	materialPack.update((pack) => ({
		...pack,
		materials: pack.materials.filter((_, i) => i !== index)
	}));
};

export const updateMaterial = (index: number, updatedMaterial: Material) => {
	materialPack.update((pack) => ({
		...pack,
		materials: pack.materials.map((material, i) => (i === index ? updatedMaterial : material))
	}));
};

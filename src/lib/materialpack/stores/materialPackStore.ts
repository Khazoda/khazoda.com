import { writable } from 'svelte/store';
import { persisted } from 'svelte-local-storage-store';
import { get } from 'svelte/store';
import type { Material, MaterialPack } from '../types/materialpackTypes';
import { RecipeTypes } from '../types/materialpackTypes';
import { MAX_MATERIAL_PACKS, DEFAULT_PACK_ICON, DEFAULT_HANDLE_INGREDIENT } from 'src/config/material-pack-creator';

type MaterialPackList = {
	packs: { [key: string]: MaterialPack }; // Using pack_name as key
	currentPack: string | null;
};

const initialState: MaterialPack = {
	localstorage_id: '',
	pack_name: '',
	mod_dependency_modid: '',
	materials: [],
	pack_icon: null
};

const initialPackListState: MaterialPackList = {
	packs: {},
	currentPack: null
};

export const materialPacks = persisted<MaterialPackList>('material-packs', initialPackListState);
export const materialPack = writable<MaterialPack>(initialState);

const generateUniqueId = () => {
	return Date.now().toString(36) + Math.random().toString(36).substring(2);
};

materialPacks.subscribe(({ packs, currentPack }) => {
	if (currentPack && packs[currentPack]) {
		materialPack.set(packs[currentPack]);
	} else {
		materialPack.set(initialState);
	}
});

export const createNewPack = () => {
	if (Object.keys(get(materialPacks).packs).length >= MAX_MATERIAL_PACKS) {
		throw new Error(`Maximum number of packs (${MAX_MATERIAL_PACKS}) reached`);
	}

	const localstorage_id = generateUniqueId();
	const newPack = {
		...initialState,
		localstorage_id,
		pack_name: ``,
		pack_icon: DEFAULT_PACK_ICON
	};

	materialPacks.update(state => ({
		...state,
		packs: { ...state.packs, [localstorage_id]: newPack },
		currentPack: localstorage_id
	}));
};

export const selectPack = (packId: string | null) => {
	materialPacks.update(state => {
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
	materialPacks.update(state => {
		const { [packId]: removed, ...remainingPacks } = state.packs;
		return {
			packs: remainingPacks,
			currentPack: state.currentPack === packId ? null : state.currentPack
		};
	});
};

export const updatePack = (packId: string, updatedPack: Partial<MaterialPack>) => {
	materialPacks.update(state => {
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

export const addMaterial = () => {
	materialPack.update(pack => {
		const updatedPack = {
			...pack,
			materials: [
				...pack.materials,
				{
					material_name: '',
					durability: 0,
					attack_damage_bonus: 0,
					attack_speed_bonus: 0,
					reach_bonus: 0,
					enchantability: 0,
					recipe_type: RecipeTypes.crafting,
					repair_ingredient: '',
					handle_ingredient: DEFAULT_HANDLE_INGREDIENT,
					upgrade_smithing_template_ingredient: '',
					smithing_weapon_material_prefix: '',
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

		materialPacks.update(state => ({
			...state,
			packs: {
				...state.packs,
				[pack.localstorage_id]: updatedPack
			}
		}));

		return updatedPack;
	});
};

export const removeMaterial = (index: number) => {
	materialPack.update(pack => ({
		...pack,
		materials: pack.materials.filter((_, i) => i !== index)
	}));
};

export const updateMaterial = (index: number, updatedMaterial: Material) => {
	materialPack.update(pack => ({
		...pack,
		materials: pack.materials.map((material, i) => (i === index ? updatedMaterial : material))
	}));
};

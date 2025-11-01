import JSZip from 'jszip';
import type { Material } from '../../types/materialpackTypes';

const WEAPON_TYPES = ['dagger', 'hammer', 'club', 'spear', 'quarterstaff', 'glaive', 'sword', 'axe'] as const;
const HELD_VARIANT_WEAPONS = ['spear', 'glaive', 'quarterstaff'] as const;

function uint8ArrayToBase64(bytes: Uint8Array): string {
	const binary = Array.from(bytes, byte => String.fromCharCode(byte)).join('');
	const base64 = btoa(binary);
	return `data:image/png;base64,${base64}`;
}

export async function mapTextures(
	zip: JSZip,
	materialName: string
): Promise<Material['textures']> {
	const textures: Material['textures'] = {
		dagger: null,
		hammer: null,
		club: null,
		spear: null,
		spear_held: null,
		quarterstaff: null,
		quarterstaff_held: null,
		glaive: null,
		glaive_held: null,
		sword: null,
		axe: null
	};
	
	for (const weaponType of WEAPON_TYPES) {
		const textureFile = zip.file(`assets/basicweapons/textures/item/${materialName}_${weaponType}.png`);
		if (textureFile) {
			const bytes = await textureFile.async('uint8array');
			textures[weaponType] = uint8ArrayToBase64(bytes);
		}
		
		if (HELD_VARIANT_WEAPONS.includes(weaponType as any)) {
			const heldTextureFile = zip.file(`assets/basicweapons/textures/item/${materialName}_${weaponType}_held.png`);
			if (heldTextureFile) {
				const heldBytes = await heldTextureFile.async('uint8array');
				const heldKey = `${weaponType}_held` as keyof typeof textures;
				textures[heldKey] = uint8ArrayToBase64(heldBytes);
			}
		}
	}
	
	return textures;
}

export async function extractPackIcon(zip: JSZip): Promise<string | null> {
	const iconFile = zip.file('pack.png');
	if (!iconFile) return null;
	
	try {
		const bytes = await iconFile.async('uint8array');
		return uint8ArrayToBase64(bytes);
	} catch (e) {
		return null;
	}
}


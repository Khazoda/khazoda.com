import JSZip from 'jszip';
import { detectVersionFromPackFormat } from 'src/config/minecraft-versions';

export function extractPackInfoFromFilename(filename: string): {
	pack_name: string;
	minecraft_version?: string;
} {
	const nameWithoutExt = filename.replace(/\.zip$/i, '');
	if (!nameWithoutExt.startsWith('bwmp_')) {
		return {
			pack_name: nameWithoutExt.replace(/_/g, ' ')
		};
	}

	const afterPrefix = nameWithoutExt.slice(5);

	const versionMatch = afterPrefix.match(/_([0-9.]+)$/);
	if (versionMatch) {
		const version = versionMatch[1];
		const beforeVersion = afterPrefix.slice(0, -(version.length + 1));

		const modidMatch = beforeVersion.match(/_([^_]+)$/);
		if (modidMatch) {
			const potentialModid = modidMatch[1];
			const beforeModid = beforeVersion.slice(0, -(potentialModid.length + 1));

			if (potentialModid === 'minecraft') {
				return {
					pack_name: beforeModid.replace(/_/g, ' '),
					minecraft_version: version
				};
			}

			return {
				pack_name: beforeModid.replace(/_/g, ' '),
				minecraft_version: version
			};
		}

		return {
			pack_name: beforeVersion.replace(/_/g, ' '),
			minecraft_version: version
		};
	}

	return {
		pack_name: afterPrefix.replace(/_/g, ' ')
	};
}

export async function detectMinecraftVersion(zip: JSZip): Promise<string | undefined> {
	try {
		const dataMcmeta = zip.file('data/pack.mcmeta');
		if (dataMcmeta) {
			const content = await dataMcmeta.async('text');
			const mcmeta = JSON.parse(content);
			const packFormat = mcmeta.pack?.pack_format;

			if (packFormat !== undefined) {
				return detectVersionFromPackFormat(packFormat);
			}
		}
	} catch (e) {
		return undefined;
	}

	return undefined;
}


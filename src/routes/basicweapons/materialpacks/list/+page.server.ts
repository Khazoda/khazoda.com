import type { PageServerLoad } from './$types';
import { MATERIAL_PACKS } from 'config/material-packs';

interface ModrinthProject {
	id: string;
	slug: string;
	title: string;
	description: string;
	downloads: number;
	icon_url: string;
	team: string;
	published: string;
	updated: string;
	categories: string[];
}

export const load: PageServerLoad = async ({ fetch }) => {
	const materialPacks = await Promise.allSettled(
		MATERIAL_PACKS.map(async ({ slug, category, required_mod_slug }) => {
			try {
				// Fetch main project
				const response = await fetch(`https://api.modrinth.com/v2/project/${slug}`);
				if (!response.ok) {
					console.error(`Failed to fetch project ${slug}: ${response.statusText}`);
					return null;
				}
				const project = await response.json();

				// Fetch team info
				const teamResponse = await fetch(`https://api.modrinth.com/v2/project/${slug}/members`);
				if (!teamResponse.ok) {
					console.error(`Failed to fetch team for ${slug}: ${teamResponse.statusText}`);
					return null;
				}
				const teamInfo = await teamResponse.json();
				const owner = teamInfo.find((member: { role: string }) => member.role === 'Owner');
				const authorName = owner?.user.username || 'Unknown';

				// Fetch required mod info if specified
				let requiredMod = null;
				if (required_mod_slug) {
					const modResponse = await fetch(
						`https://api.modrinth.com/v2/project/${required_mod_slug}`
					);
					if (modResponse.ok) {
						const modData = await modResponse.json();
						requiredMod = {
							name: modData.title,
							slug: modData.slug,
							url: `https://modrinth.com/mod/${modData.slug}`
						};
					} else {
						console.error(
							`Failed to fetch required mod ${required_mod_slug}: ${modResponse.statusText}`
						);
					}
				}

				return { project, authorName, requiredMod };
			} catch (error) {
				console.error(`Failed to fetch pack ${slug}:`, error);
				return null;
			}
		})
	);

	return {
		materialPacks: materialPacks
			.filter(
				(result): result is PromiseFulfilledResult<any> =>
					result.status === 'fulfilled' && result.value !== null
			)
			.map(result => {
				const { project, authorName, requiredMod } = result.value;
				const metadata = MATERIAL_PACKS.find(p => p.slug === project.slug);
				const normalizedTitle = project.title.toLowerCase();
				const capitalizedTitle = normalizedTitle.charAt(0).toUpperCase() + normalizedTitle.slice(1);
				const trimmedTitle = capitalizedTitle.replace('material pack for basic weapons', '');
				return {
					name: trimmedTitle,
					description: 'A material pack for Basic Weapons',
					author: authorName,
					downloads: project.downloads,
					category: metadata!.category,
					icon: project.icon_url,
					created: project.published,
					required_mod: requiredMod,
					official: metadata!.official,
					url: `https://modrinth.com/mod/${project.slug}`
				};
			})
	};
};

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
	// Fetch all projects in parallel
	const materialPacks = await Promise.all(
		MATERIAL_PACKS.map(async ({ slug, category, required_mod_slug }) => {
			try {
				// Fetch project and team info in parallel
				const [projectResponse, teamResponse] = await Promise.all([
					fetch(`https://api.modrinth.com/v2/project/${slug}`),
					fetch(`https://api.modrinth.com/v2/project/${slug}/members`)
				]);

				if (!projectResponse.ok || !teamResponse.ok) {
					return null;
				}

				const [project, teamInfo] = await Promise.all([
					projectResponse.json(),
					teamResponse.json()
				]);

				const owner = teamInfo.find((member: { role: string }) => member.role === 'Owner');
				const authorName = owner?.user.username || 'Unknown';

				// Fetch required mod if needed
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
			.filter((result): result is NonNullable<typeof result> => result !== null)
			.map(({ project, authorName, requiredMod }) => {
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

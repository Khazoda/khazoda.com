import type { PageServerLoad } from './$types';
import { MATERIAL_PACKS } from 'src/config/material-packs';

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
	const materialPacks = await Promise.all(
		MATERIAL_PACKS.map(async ({ slug, category, required_mod_slug, official }) => {
			try {
				const [projectResponse, teamResponse] = await Promise.all([
					fetch(`https://api.modrinth.com/v2/project/${slug}`),
					fetch(`https://api.modrinth.com/v2/project/${slug}/members`)
				]);

				if (!projectResponse.ok || !teamResponse.ok) {
					return {
						name: null,
						description: null,
						author: null,
						downloads: 0,
						category,
						icon: null,
						created: new Date().toISOString(),
						required_mod: null,
						official,
						url: `https://modrinth.com/mod/${slug}`,
						slug: slug
					};
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

				const rawTitle = project.title
					.toLowerCase()
					.replace('material pack for basic weapons', '')
					.trim();
				const capitalizedTitle = rawTitle.charAt(0).toUpperCase() + rawTitle.slice(1);

				return {
					name: capitalizedTitle,
					description: 'A material pack for Basic Weapons',
					author: authorName,
					downloads: project.downloads,
					category,
					icon: project.icon_url,
					created: project.published,
					required_mod: requiredMod,
					official,
					url: `https://modrinth.com/mod/${project.slug}`
				};
			} catch (error) {
				console.error(`Failed to fetch pack ${slug}:`, error);
				return {
					name: null,
					description: null,
					author: null,
					downloads: 0,
					category,
					icon: null,
					created: new Date().toISOString(),
					required_mod: null,
					official,
					url: null
				};
			}
		})
	);

	return {
		materialPacks
	};
};

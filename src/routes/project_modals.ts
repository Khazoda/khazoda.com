export interface ProjectLink {
	type: "modrinth" | "curseforge" | "youtube" | "github" | "wiki" | "planet" | "lens";
	label: string;
	url: string;
	disabled?: boolean;
	separator?: boolean;
}

export interface Project {
	id: string;
	name: string;
	image?: string;
	titleImage?: string;
	platformIcon: string;
	bskyURL?: string;
	learnMoreURL?: string;
	description: string[];
	links: ProjectLink[];
	featureVideo?: string;
	collabText?: string;
	collabLinks?: { name: string; url: string }[];
	featureSection?: {
		title: string;
		description: string[];
		links: ProjectLink[];
	};
}

// Site Exclusive Icons
import web_large_plushables from "$lib/media/mod_icons/web_large_plushables.webp";
import web_large_basicweapons from "$lib/media/mod_icons/web_large_basicweapons.webp";
import web_large_bronze from "$lib/media/mod_icons/web_large_bronze.webp";
import web_large_basicstorage from "$lib/media/mod_icons/web_large_basicstorage.webp";
import web_large_breakerplacer from "$lib/media/mod_icons/web_large_breakerplacer.webp";
import web_large_heirlooms from "$lib/media/mod_icons/web_large_heirlooms.webp";

// Project Icons (Same as Modrinth/Curseforge)
import platform_plushables from "$lib/media/mod_icons/platform_plushables.webp";
import platform_basicweapons from "$lib/media/mod_icons/platform_basicweapons.webp";
import platform_bronze from "$lib/media/mod_icons/platform_bronze.webp";
import platform_basicstorage from "$lib/media/mod_icons/platform_basicstorage.webp";
import platform_breakerplacer from "$lib/media/mod_icons/platform_breakerplacer.webp";
import platform_heirlooms from "$lib/media/mod_icons/platform_heirlooms.webp";

import beef_project_icon from "$lib/media/mod_icons/beef_project_icon.webp";
import dwayne_project_icon from "$lib/media/mod_icons/dwayne_project_icon.webp";
import hookaduck_project_icon from "$lib/media/mod_icons/hookaduck_project_icon.webp";
import kreebles_project_icon from "$lib/media/mod_icons/kreebles_project_icon.webp";
import plastar_project_icon from "$lib/media/mod_icons/plastar_project_icon.webp";
import helpfulcampfires_project_icon from "$lib/media/mod_icons/helpfulcampfires_project_icon.webp";

// Project Stylized Names
import title_plushables from "$lib/media/stylized_names/plushables.webp";
import title_basicweapons from "$lib/media/stylized_names/basicweapons.webp";
import title_bronze from "$lib/media/stylized_names/bronze.webp";
import title_basicstorage from "$lib/media/stylized_names/basicstorage.webp";
import title_breakerplacer from "$lib/media/stylized_names/breakerplacer.webp";
import title_heirlooms from "$lib/media/stylized_names/heirlooms.webp";

// Project Feature Images
import plushables_feature from "$lib/media/animated/plushables_feature.webm";
import kreebles_feature from "$lib/media/animated/kreebles_feature.webm";
import heirlooms_feature from "$lib/media/animated/heirlooms_feature.webm";
import helpfulcampfires_feature from "$lib/media/animated/helpfulcampfires_feature.webm";

export const mainProjects: Project[] = [
	{
		id: "plushables",
		name: "Plushables",
		image: web_large_plushables,
		titleImage: title_plushables,
		platformIcon: platform_plushables,
		bskyURL: "https://bsky.app/search?q=from%3A%40khazoda.com+plushables",
		learnMoreURL: "/plushables",
		description: [
			"Plushables adds over 45 new plushies to Minecraft.",
			"From cats to dogs to small mushroom people, wizards and mammoths - there's a plushie for everyone.",
			"Plushables aims to bring fresh new designs into the game rather than recreating existing Minecraft mobs.",
			"Along with Plushables' original designs you will find plushies based on a variety of other mods.",
			"Some plushies have custom sounds and particle effects!"
		],
		links: [
			{ type: "modrinth", label: "Download on Modrinth", url: "https://modrinth.com/mod/plushables" },
			{
				type: "curseforge",
				label: "Download on CurseForge",
				url: "https://legacy.curseforge.com/minecraft/mc-mods/plushables"
			},
			{
				type: "youtube",
				label: "Watch Showcase",
				url: "https://www.youtube.com/@khazoda/videos",
				disabled: true,
				separator: true
			},
			{ type: "github", label: "View the GitHub repository", url: "https://github.com/Khazoda/Plushables", separator: true }
		],
		featureVideo: plushables_feature
	},
	{
		id: "basicweapons",
		name: "Basic Weapons",
		image: web_large_basicweapons,
		titleImage: title_basicweapons,
		platformIcon: platform_basicweapons,
		bskyURL: "https://bsky.app/search?q=from%3A%40khazoda.com+basicweapons",
		learnMoreURL: "/basicweapons",
		description: [
			"Basic Weapons adds 6 new vanilla-esque weapon types to Minecraft.",
			"Each weapon has a distinctly different combat style.",
			"Integration with the Better Combat and Bronze mods lets Basic Weapons really shine.",
			"Sword & axe melee combat is too repetitive - treat yourself to some other options with Basic Weapons!"
		],
		links: [
			{ type: "modrinth", label: "Download on Modrinth", url: "https://modrinth.com/mod/basicweapons" },
			{
				type: "curseforge",
				label: "Download on CurseForge",
				url: "https://legacy.curseforge.com/minecraft/mc-mods/basicweapons"
			},
			{
				type: "youtube",
				label: "Watch Showcase",
				url: "https://www.youtube.com/@khazoda/videos",
				disabled: true,
				separator: true
			},
			{ type: "github", label: "View the GitHub repository", url: "https://github.com/Khazoda/basic-weapons", separator: true },
			{ type: "wiki", label: "Visit the Wiki", url: "https://basicweapons.khazoda.com/en/latest/" }
		],
		featureSection: {
			title: "Material Packs",
			description: [
				"Your Basic Weapons experience can be evolved through material packs.",
				"These packs add new weapons to your game and are super easy to make! Explore the public list or try your hand at making your own:"
			],
			links: [
				{ type: "planet", label: "View All Material Packs", url: "/basicweapons/materialpacks/list" },
				{ type: "lens", label: "Create Your Own", url: "/basicweapons/materialpacks/create", separator: true }
			]
		}
	},
	{
		id: "bronze",
		name: "Bronze",
		image: web_large_bronze,
		titleImage: title_bronze,
		platformIcon: platform_bronze,
		bskyURL: "https://bsky.app/search?q=from%3A%40khazoda.com+bronze",
		learnMoreURL: "/bronze",
		description: [
			"Bronze adds two new materials; Tin and Bronze.",
			"Bronze can be turned into new armor, weaponry, tools and blocks.",
			"The bronze tier is slightly better than iron across the board, though significantly worse than diamond.",
			"Bronze is intended to be a material expansion that fits neatly into vanilla gameplay and progression."
		],
		links: [
			{ type: "modrinth", label: "Download on Modrinth", url: "https://modrinth.com/mod/bronze" },
			{
				type: "curseforge",
				label: "Download on CurseForge",
				url: "https://legacy.curseforge.com/minecraft/mc-mods/bronze-mod"
			},
			{
				type: "youtube",
				label: "Watch Showcase",
				url: "https://www.youtube.com/@khazoda/videos",
				disabled: true,
				separator: true
			},
			{ type: "github", label: "View the GitHub repository", url: "https://github.com/Khazoda/bronze", separator: true }
		]
	},
	{
		id: "basicstorage",
		name: "Basic Storage",
		image: web_large_basicstorage,
		titleImage: title_basicstorage,
		platformIcon: platform_basicstorage,
		bskyURL: "https://bsky.app/search?q=from%3A%40khazoda.com+basicstorage",
		learnMoreURL: "/basicstorage",
		description: [
			"Basic Storage adds one block - the crate.",
			"Crates fulfil a nieche in Minecraft's storage blocks that chests, barrels, shulker boxes and bundles don't.",
			"Interaction with crates happens directly, rather then in a GUI.",
			"Crates can hold up to 1 billion items of a single type, and retain their contents when broken."
		],
		links: [
			{ type: "modrinth", label: "Download on Modrinth", url: "https://modrinth.com/mod/basicstorage" },
			{
				type: "curseforge",
				label: "Download on CurseForge",
				url: "https://legacy.curseforge.com/minecraft/mc-mods/basic-storage"
			},
			{
				type: "youtube",
				label: "Watch Showcase",
				url: "https://www.youtube.com/@khazoda/videos",
				disabled: true,
				separator: true
			},
			{
				type: "github",
				label: "View the GitHub repository",
				url: "https://github.com/Khazoda/basic-storage",
				separator: true
			},
			{ type: "wiki", label: "Visit the Wiki", url: "https://modded.wiki/w/Mod:Basic_Storage" }
		]
	},
	{
		id: "breakerplacer",
		name: "Block Breaker & Block Placer",
		image: web_large_breakerplacer,
		titleImage: title_breakerplacer,
		platformIcon: platform_breakerplacer,
		bskyURL: "https://bsky.app/search?q=from%3A%40khazoda.com+breakerplacer",
		learnMoreURL: "/breakerplacer",
		description: [
			"Block Breaker & Block Placer is a content mod that adds two new blocks.",
			"The Breaker breaks a block in front of it when powered by a redstone pulse.",
			"The Placer places a block in front of it when powered by a redstone pulse.",
			"Considerations have been made in regards to gameplay balance for the Breaker"
		],
		links: [
			{ type: "modrinth", label: "Download on Modrinth", url: "https://modrinth.com/mod/breakerplacer" },
			{
				type: "curseforge",
				label: "Download on CurseForge",
				url: "https://legacy.curseforge.com/minecraft/mc-mods/breakerplacer"
			},
			{
				type: "youtube",
				label: "Watch Showcase",
				url: "https://www.youtube.com/@khazoda/videos",
				disabled: true,
				separator: true
			},
			{
				type: "github",
				label: "View the GitHub repository",
				url: "https://github.com/Khazoda/block-breaker-placer",
				separator: true
			}
		]
	},
	{
		id: "heirlooms",
		name: "Heirlooms",
		image: web_large_heirlooms,
		titleImage: title_heirlooms,
		platformIcon: platform_heirlooms,
		bskyURL: "https://bsky.app/search?q=from%3A%40khazoda.com+heirlooms",
		learnMoreURL: "/heirlooms",
		description: [
			"This mod was made for the 2025 CurseForge ModJam",
			"Crafting unstackable items affixes them with the date and the player's name",
			"Look back at the history of your items and feel a greater sense of pride and ownership"
		],
		links: [
			{ type: "modrinth", label: "Download on Modrinth", url: "https://modrinth.com/mod/heirlooms" },
			{
				type: "curseforge",
				label: "Download on CurseForge",
				url: "https://legacy.curseforge.com/minecraft/mc-mods/heirlooms"
			},
			{
				type: "youtube",
				label: "Watch Showcase",
				url: "https://www.youtube.com/@khazoda/videos",
				disabled: true,
				separator: true
			},
			{ type: "github", label: "View the GitHub repository", url: "https://github.com/Khazoda/heirlooms", separator: true }
		],
		featureVideo: heirlooms_feature
	}
];

export const otherMods: Project[] = [
	{
		id: "helpfulcampfires",
		name: "Helpful Campfires",
		platformIcon: helpfulcampfires_project_icon,
		description: [
			"This mod was made for SpookyJam 2025",
			"Minecraft's campfires now give buffs in an area",
			"Normal campfires give players a regeneration effect",
			"Soul campfires give players a 2 block high jump boost",
			"Additionally, a new stump chair block lets you sit around a campfire with your friends, whether they're players or animals"
		],
		links: [
			{ type: "modrinth", label: "Download on Modrinth", url: "https://modrinth.com/mod/helpfulcampfires" },
			{
				type: "curseforge",
				label: "Download on CurseForge",
				url: "https://legacy.curseforge.com/minecraft/mc-mods/helpfulcampfires"
			},
			{
				type: "youtube",
				label: "Watch Showcase",
				url: "https://youtube.com/shorts/6ty8oi36AoQ?si=SHc_ngt0WaAd6-tj",
				disabled: true,
				separator: true
			},
			{
				type: "github",
				label: "View the GitHub repository",
				url: "https://github.com/Khazoda/helpful-campfires",
				separator: true
			}
		],
		featureVideo: helpfulcampfires_feature
	},
	{
		id: "plastar",
		name: "Mecha Soldier PLASTAR",
		platformIcon: plastar_project_icon,
		description: [
			"This mod was made for Modfest 1.21 in October 2024",
			"Tree resin can be turned into modular mecha",
			"These mecha can fight for you and perform various tasks."
		],
		collabText: "This project was a collaboration with MattiDragon, Kneelawk, LemmaEOF, Pug and snakefangox.",
		collabLinks: [
			{ name: "MattiDragon", url: "https://modrinth.com/user/MattiDragon" },
			{ name: "Kneelawk", url: "https://modrinth.com/user/Kneelawk" },
			{ name: "LemmaEOF", url: "https://modrinth.com/user/LemmaEOF" },
			{ name: "Pug", url: "https://modrinth.com/user/Pug" },
			{ name: "snakefangox", url: "https://modrinth.com/user/snakefangox" }
		],
		links: [
			{ type: "modrinth", label: "Download on Modrinth", url: "https://modrinth.com/mod/plastar" },
			{
				type: "github",
				label: "View the GitHub repository",
				url: "https://github.com/Kneelawk/Mecha-Soldier-PLASTAR",
				separator: true
			}
		]
	},
	{
		id: "kreebles",
		name: "Kreebles",
		platformIcon: kreebles_project_icon,
		description: [
			"This mod was made for SpookyJam 2024",
			"Mining stone & deepslate can sometimes yield more than you bargained for.",
			"Kreebles jump out of broken rocks and attack any prey they can see.",
			"Bearing the dastardly talisman, a rare drop from kreebles, will make them freeze in fear."
		],
		links: [
			{ type: "modrinth", label: "Download on Modrinth", url: "https://modrinth.com/mod/kreebles" },
			{
				type: "curseforge",
				label: "Download on CurseForge",
				url: "https://legacy.curseforge.com/minecraft/mc-mods/kreebles"
			},
			{
				type: "youtube",
				label: "Watch Teaser",
				url: "https://youtube.com/shorts/SvPh7RlwnbA?feature=shared",
				separator: true
			},
			{ type: "youtube", label: "Watch Showcase", url: "https://www.youtube.com/watch?v=0YIWTT6_AQk" },
			{
				type: "github",
				label: "View the GitHub repository",
				url: "https://github.com/Khazoda/kreebles",
				separator: true
			}
		],
		featureVideo: kreebles_feature
	},
	{
		id: "hookaduck",
		name: "Hook a Duck",
		platformIcon: hookaduck_project_icon,
		description: [
			"This mod was made for Modfest: Carnival in 2024",
			"Colourful ducks spawn in the rivers of your world.",
			"Hook them up with a fishing rod to receive tickets and prizes!",
			"For the best experience, try this mod out with the Modfest Carnival modpack"
		],
		collabText: "This project was a collaboration with Dabloon.",
		collabLinks: [{ name: "Dabloon", url: "https://modrinth.com/user/Dabloon" }],
		links: [
			{ type: "modrinth", label: "Download on Modrinth", url: "https://modrinth.com/mod/hookaduck" },
			{
				type: "github",
				label: "View the GitHub repository",
				url: "https://github.com/Khazoda/Hook-a-Duck",
				separator: true
			}
		]
	},
	{
		id: "beefandblade",
		name: "Beef & Blade",
		platformIcon: beef_project_icon,
		description: [
			"Beef & Blade is a serverside datapack that lets you prioritize raw beef or leather from cow drops",
			"Using a sword will yield leather drops",
			"Using an axe will yield raw beef drops"
		],
		links: [
			{ type: "modrinth", label: "Download on Modrinth", url: "https://modrinth.com/mod/beefandblade" },
			{
				type: "curseforge",
				label: "Download on CurseForge",
				url: "https://legacy.curseforge.com/minecraft/mc-mods/beef-blade"
			},
			{
				type: "github",
				label: "View the GitHub repository",
				url: "https://github.com/Khazoda/beef-and-blade",
				separator: true
			}
		]
	},
	{
		id: "dwayne",
		name: "Dwayne 'The Block' Johnson",
		platformIcon: dwayne_project_icon,
		description: [
			"Have you ever wanted to place The Block's head in your world? This mod is the solution.",
			"Adds dwayne's head as an item, a block, stairs, walls, plant pots and even flowers.",
			"There are some magical interactions with the blocks that are up to you to discover."
		],
		links: [
			{ type: "modrinth", label: "Download on Modrinth", url: "https://modrinth.com/mod/dwayne" },
			{
				type: "curseforge",
				label: "Download on CurseForge",
				url: "https://legacy.curseforge.com/minecraft/mc-mods/dwayne-the-block-johnson"
			},
			{
				type: "github",
				label: "View the GitHub repository",
				url: "https://github.com/Khazoda/dwayne-the-block-johnson",
				separator: true
			}
		]
	}
];

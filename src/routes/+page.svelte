<script lang="ts">
	// Site Exclusive Icons
	import plushables_icon from '$lib/media/site_icons/plushables_icon.webp';
	import basicweapons_icon from '$lib/media/site_icons/basicweapons_icon.webp';
	import bronze_icon from '$lib/media/site_icons/bronze_icon.webp';
	import breakerplacer_icon from '$lib/media/site_icons/breakerplacer_icon.webp';
	import basicstorage_icon from '$lib/media/site_icons/basicstorage_icon.webp';
	import beef_icon from '$lib/media/site_icons/beef_icon.webp';
	import dwayne_icon from '$lib/media/site_icons/dwayne_icon.webp';
	import hookaduck_icon from '$lib/media/site_icons/hookaduck_icon.webp';
	import kreebles_icon from '$lib/media/site_icons/kreebles_icon.webp';
	import plastar_icon from '$lib/media/site_icons/plastar_icon.webp';

	// Project Icons (Same as Modrinth/Curseforge)
	import plushables_project_icon from '$lib/media/project_icons/plushables_project_icon.webp';
	import basicweapons_project_icon from '$lib/media/project_icons/basicweapons_project_icon.webp';
	import bronze_project_icon from '$lib/media/project_icons/bronze_project_icon.webp';
	import breakerplacer_project_icon from '$lib/media/project_icons/breakerplacer_project_icon.webp';
	import basicstorage_project_icon from '$lib/media/project_icons/basicstorage_project_icon.webp';
	import beef_project_icon from '$lib/media/project_icons/beef_project_icon.webp';
	import dwayne_project_icon from '$lib/media/project_icons/dwayne_project_icon.webp';
	import hookaduck_project_icon from '$lib/media/project_icons/hookaduck_project_icon.webp';
	import kreebles_project_icon from '$lib/media/project_icons/kreebles_project_icon.webp';
	import plastar_project_icon from '$lib/media/project_icons/plastar_project_icon.webp';

	// Project Feature Images
	import plushables_feature from '$lib/media/animated/plushables_feature.webm';
	import kreebles_feature from '$lib/media/animated/kreebles_feature.png';

	import profile_icon from '$lib/media/profile_icon.webp';

	import btn_press_sound from '$lib/sound/click.mp3';

	import Modal from '../components/Modal.svelte';
	import IconoirBluesky from 'virtual:icons/simple-icons/bluesky';
	import IconoirDiscord from 'virtual:icons/simple-icons/discord';
	import SimpleIconsModrinth from 'virtual:icons/simple-icons/modrinth';
	import SimpleIconsCurseforge from 'virtual:icons/simple-icons/curseforge';
	import SimpleIconsGithub from 'virtual:icons/simple-icons/github';
	import SimpleIconsYoutube from 'virtual:icons/simple-icons/youtube';
	import SimpleIconsBookstack from 'virtual:icons/simple-icons/bookstack';
	import IconoirCollageFrame from 'virtual:icons/iconoir/collage-frame';
	import IconoirViewGrid from 'virtual:icons/iconoir/view-grid';

	import PlushablesColoured from 'components/PlushablesColoured.svelte';

	import { onMount } from 'svelte';
	import { replaceState } from '$app/navigation';
	import { page } from '$app/stores';
	import IconoirSoundHigh from 'virtual:icons/iconoir/sound-high';
	import IconoirSoundOff from 'virtual:icons/iconoir/sound-off';
	import PixelArticonsUsers from 'virtual:icons/pixelarticons/users';

	import ImportantButton from 'src/components/materialpack/ImportantButton.svelte';
	import FluentNew16Filled from '~icons/fluent/new-16-filled';
	import { SHOW_NEW_FEATURE_BANNER } from 'src/config/general-config';

	var showModal: boolean[] = Array(100).fill(false);
	var isVersionSheetHovered = false;
	$: currentlyHovered = 'Plushables';
	const hashToModalID: Record<string, number> = {
		'#plushables': 0,
		'#basicweapons': 1,
		'#bronze': 2,
		'#breakerplacer': 3,
		'#basic-storage': 4,
		'#plastar': 95,
		'#kreebles': 96,
		'#hookaduck': 97,
		'#beef-and-blade': 98,
		'#dwayne': 99
	};
	const modalIDToHash = Object.fromEntries(
		Object.entries(hashToModalID).map(([hash, id]) => [id, hash])
	);

	const showDialog = (modalID: number) => {
		if (!showModal) return;
		showModal[modalID] = true;
		document.getElementsByTagName('body')[0].style.overscrollBehavior = 'none';

		// Add the hash to the URL when the modal is opened
		const hash = modalIDToHash[modalID];
		if (hash) {
			replaceState($page.url.origin + hash, {});
		}
	};

	let audioEnabled = true;

	onMount(() => {
		const storedPreference = localStorage.getItem('audioEnabled');
		if (storedPreference !== null) {
			audioEnabled = storedPreference === 'true';
		}
		// setTimeout in order to delay and allow document root to be hydrated
		setTimeout(() => {
			const hash = $page.url.hash;
			if (hash && hashToModalID[hash] !== undefined) {
				const modalID = hashToModalID[hash];
				showDialog(modalID);
			}
		}, 0);
	});

	function toggleAudio() {
		audioEnabled = !audioEnabled;
		localStorage.setItem('audioEnabled', audioEnabled.toString());
	}

	function playClickSound(node: HTMLElement) {
		const handleClick = () => {
			if (audioEnabled) {
				const audio = document.getElementById('click-sound') as HTMLAudioElement;
				audio.volume = 0.4;
				audio?.play();
			}
		};
		node.addEventListener('click', handleClick);
		return {
			destroy: () => node.removeEventListener('click', handleClick)
		};
	}
</script>

<!-- #region HTML-->
<svelte:head>
	<meta http-equiv="X-UA-Compatible" content="ie=edge" />
	<link rel="stylesheet" href="index.css" />
	<title>Khazoda's Mods</title>
</svelte:head>
<div class="page-container">
	<div
		class="top-left-container flex-col"
		style={SHOW_NEW_FEATURE_BANNER ? 'display: flex' : 'display: none'}>
		<ImportantButton
			icon={FluentNew16Filled}
			label="NEW"
			onClick={() => {
				document.location.href = '/basicweapons/materialpacks';
			}}
			color="green"
			backdropCorner="top-left"
			type="button" />
		<span>Material Pack Creator</span>
	</div>
	<div class="top-right-container">
		<audio id="click-sound">
			<source src={btn_press_sound} type="audio/mpeg" />
			Your browser does not support the audio element.
		</audio>
		<button class="square-btn" on:click={toggleAudio} title="Toggle audio" type="button">
			{#if audioEnabled}
				<IconoirSoundHigh />
			{:else}
				<IconoirSoundOff />
			{/if}
		</button>
		<a
			href="/versions"
			class="square-btn"
			title="Version Sheet"
			on:mouseenter={() => (isVersionSheetHovered = true)}
			on:mouseleave={() => (isVersionSheetHovered = false)}
			on:focusin={() => (isVersionSheetHovered = true)}
			on:focusout={() => (isVersionSheetHovered = false)}>
			{#if isVersionSheetHovered}
				<IconoirViewGrid />
			{:else}
				<IconoirCollageFrame />
			{/if}
		</a>
	</div>
	<h1 class="big-title fade-in-on-load">
		<img src={profile_icon} alt="" width="128" /> Khazoda's Mods
	</h1>
	<div class="center-container">
		<span class="hovered-name">{currentlyHovered}</span>
		<ul class="projects-container">
			<li
				on:mouseover={() => (currentlyHovered = 'Plushables')}
				on:focus={() => (currentlyHovered = 'Plushables')}
				on:mouseenter={() => (currentlyHovered = 'Plushables')}
				on:focus|capture={() => (currentlyHovered = 'Plushables')}>
				<button
					on:click={() => {
						showDialog(0);
					}}
					use:playClickSound
					type="button"
					title="Plushables"
					tabindex="0">
					<img
						src={plushables_icon}
						alt="Plushables"
						width="512"
						draggable="false"
						class="ms-edge-imgfix" />
				</button>
			</li>
			<li
				on:mouseover={() => (currentlyHovered = 'Basic Weapons')}
				on:focus={() => (currentlyHovered = 'Basic Weapons')}
				on:mouseenter={() => (currentlyHovered = 'Basic Weapons')}
				on:focus|capture={() => (currentlyHovered = 'Basic Weapons')}>
				<button
					on:click={() => showDialog(1)}
					use:playClickSound
					type="button"
					title="Basic Weapons"
					tabindex="0">
					<img
						src={basicweapons_icon}
						alt="Basic Weapons"
						width="512"
						draggable="false"
						class="ms-edge-imgfix" />
				</button>
			</li>
			<li
				on:mouseover={() => (currentlyHovered = 'Bronze')}
				on:focus={() => (currentlyHovered = 'Bronze')}
				on:mouseenter={() => (currentlyHovered = 'Bronze')}
				on:focus|capture={() => (currentlyHovered = 'Bronze')}>
				<button
					on:click={() => showDialog(2)}
					use:playClickSound
					type="button"
					title="Bronze"
					tabindex="0">
					<img
						src={bronze_icon}
						alt="Bronze"
						width="512"
						draggable="false"
						class="ms-edge-imgfix" />
				</button>
			</li>
			<li
				on:mouseover={() => (currentlyHovered = 'Block Breaker & Block Placer')}
				on:focus={() => (currentlyHovered = 'Block Breaker & Block Placer')}
				on:mouseenter={() => (currentlyHovered = 'Block Breaker & Block Placer')}
				on:focus|capture={() => (currentlyHovered = 'Block Breaker & Block Placer')}>
				<button
					on:click={() => showDialog(3)}
					use:playClickSound
					type="button"
					title="Block Breaker & Block Placer"
					tabindex="0">
					<img
						src={breakerplacer_icon}
						alt="Block Breaker & Block Placer"
						width="512"
						draggable="false"
						class="ms-edge-imgfix" />
				</button>
			</li>
			<li
				on:mouseover={() => (currentlyHovered = 'Basic Storage')}
				on:focus={() => (currentlyHovered = 'Basic Storage')}
				on:mouseenter={() => (currentlyHovered = 'Basic Storage')}
				on:focus|capture={() => (currentlyHovered = 'Basic Storage')}>
				<button
					on:click={() => showDialog(4)}
					use:playClickSound
					type="button"
					title="Basic Storage"
					tabindex="0">
					<img
						src={basicstorage_icon}
						alt="Basic Storage"
						width="512"
						draggable="false"
						class="ms-edge-imgfix" />
				</button>
			</li>
		</ul>
	</div>

	<div class="edge-mini-wrapper">
		<div class="collaborations-container">
			<span>collaborations</span>
			<div>
				<button
					on:click={() => showDialog(95)}
					on:mouseover={() => (currentlyHovered = 'Mecha Soldier PLASTAR')}
					on:focus={() => (currentlyHovered = 'Mecha Soldier PLASTAR')}
					on:mouseenter={() => (currentlyHovered = 'Mecha Soldier PLASTAR')}
					on:focus|capture={() => (currentlyHovered = 'Mecha Soldier PLASTAR')}
					use:playClickSound
					type="button"
					title="Mecha Soldier PLASTAR"
					tabindex="0">
					<img
						src={plastar_icon}
						alt="Mecha Soldier PLASTAR"
						width="32"
						draggable="false"
						class="ms-edge-imgfix" />
				</button>
				<button
					on:click={() => showDialog(97)}
					on:mouseover={() => (currentlyHovered = 'Hook a Duck')}
					on:focus={() => (currentlyHovered = 'Hook a Duck')}
					on:mouseenter={() => (currentlyHovered = 'Hook a Duck')}
					on:focus|capture={() => (currentlyHovered = 'Hook a Duck')}
					use:playClickSound
					type="button"
					title="Hook a Duck"
					tabindex="0">
					<img
						src={hookaduck_icon}
						alt="Hook a Duck"
						width="32"
						draggable="false"
						class="ms-edge-imgfix" />
				</button>
			</div>
		</div>
		<div class="mini-mods-container">
			<span>mini mods</span>
			<div>
				<button
					on:click={() => showDialog(96)}
					on:mouseover={() => (currentlyHovered = 'Kreebles')}
					on:focus={() => (currentlyHovered = 'Kreebles')}
					on:mouseenter={() => (currentlyHovered = 'Kreebles')}
					on:focus|capture={() => (currentlyHovered = 'Kreebles')}
					use:playClickSound
					type="button"
					title="Kreebles"
					tabindex="0">
					<img
						src={kreebles_icon}
						alt="Kreebles"
						width="32"
						draggable="false"
						class="ms-edge-imgfix" />
				</button>
				<button
					on:click={() => showDialog(98)}
					on:mouseover={() => (currentlyHovered = 'Beef & Blade')}
					on:focus={() => (currentlyHovered = 'Beef & Blade')}
					on:mouseenter={() => (currentlyHovered = 'Beef & Blade')}
					on:focus|capture={() => (currentlyHovered = 'Beef & Blade')}
					use:playClickSound
					type="button"
					title="Beef & Blade"
					tabindex="0">
					<img
						src={beef_icon}
						alt="Beef & Blade"
						width="32"
						draggable="false"
						class="ms-edge-imgfix" />
				</button>
				<button
					on:click={() => showDialog(99)}
					on:mouseover={() => (currentlyHovered = 'Dwayne "The Block" Johnson')}
					on:focus={() => (currentlyHovered = 'Dwayne "The Block" Johnson')}
					on:mouseenter={() => (currentlyHovered = 'Dwayne "The Block" Johnson')}
					on:focus|capture={() => (currentlyHovered = 'Dwayne "The Block" Johnson')}
					use:playClickSound
					type="button"
					title="Dwayne 'The Block' Johnson"
					tabindex="0">
					<img
						src={dwayne_icon}
						alt="Dwayne 'The Block' Johnson"
						width="32"
						draggable="false"
						class="ms-edge-imgfix" />
				</button>
			</div>
		</div>
	</div>
	<footer>
		<span class="socials-container">
			<a
				href="https://bsky.app/profile/khazoda.com"
				aria-label="Khazoda on Bluesky"
				title="Khazoda on Bluesky"><IconoirBluesky /></a>
			<a
				href="https://discord.com/invite/vEZUkSxwR9"
				aria-label="Get support on Discord"
				title="Get support on Discord"
				target="_blank"><IconoirDiscord /></a>
		</span>
		<span class="copyright">&copy; <a href="https://khazoda.com">khazoda.com</a> 2024</span>
	</footer>
</div>
<!--#region Plushables Modal -->
<Modal bind:showModal modalID={0}>
	<h2 slot="header" class="header-slot">
		<span>
			<img
				class="project-logo"
				src={plushables_project_icon}
				alt="logo for the currently opened project"
				width="32"
				draggable="false" />
			<PlushablesColoured />
		</span>
		<img
			alt="latest minecraft version"
			src="https://img.shields.io/modrinth/game-versions/plushables?style=flat&label=&color=%2311B848" />
	</h2>

	<div slot="description" class="definition-list">
		<ul>
			<li>Plushables adds over 45 new plushies to Minecraft.</li>
			<li>
				From cats to dogs to small mushroom people, wizards and mammoths - there's a plushie for
				everyone.
			</li>
			<li>
				Plushables aims to bring fresh new designs into the game rather than recreating existing
				Minecraft mobs.
			</li>
			<li>
				Along with Plushables' original designs you will find plushies based on a variety of other
				mods.
			</li>
			<li>Some plushies have custom sounds and particle effects!</li>
		</ul>
	</div>

	<div class="info-slot" slot="info">
		<span class="modal-link modrinth">
			<SimpleIconsModrinth />
			<a href="https://modrinth.com/mod/plushables">Download on Modrinth</a>
		</span>
		<span class="modal-link curseforge">
			<SimpleIconsCurseforge />
			<a href="https://legacy.curseforge.com/minecraft/mc-mods/plushables">
				Download on CurseForge
			</a>
		</span>
		<span class="modal-link youtube separator-top">
			<SimpleIconsYoutube />
			<a href="https://www.youtube.com/@khazoda/videos">Watch Showcase</a>
		</span>
		<span class="modal-link github separator-top">
			<SimpleIconsGithub />
			<a href="https://github.com/Khazoda/Plushables">View the GitHub repository</a>
		</span>
	</div>
	<div class="feature-slot" slot="feature">
		<video src={plushables_feature} autoplay loop muted playsinline></video>
	</div>
</Modal>

<!--#region Basic Weapons Modal -->
<Modal bind:showModal modalID={1}>
	<h2 slot="header" class="header-slot">
		<span>
			<img
				class="project-logo"
				src={basicweapons_project_icon}
				alt="logo for the currently opened project"
				width="32"
				draggable="false" />
			Basic Weapons
		</span>
		<img
			alt="latest minecraft version"
			src="https://img.shields.io/modrinth/game-versions/basicweapons?style=flat&label=&color=%2311B848" />
	</h2>

	<div slot="description" class="definition-list">
		<ul>
			<li>Basic Weapons adds 6 new vanilla-esque weapon types to Minecraft.</li>
			<li>Each weapon has a distinctly different combat style.</li>
			<li>
				Integration with the <a href="https://modrinth.com/mod/better-combat">Better Combat</a> and
				<a href="https://khazoda.com#bronze">Bronze</a> mods lets Basic Weapons really shine.
			</li>
			<li>
				Sword & axe melee combat is too repetitive - treat yourself to some other options with Basic
				Weapons!
			</li>
		</ul>
	</div>

	<div class="info-slot" slot="info">
		<span class="modal-link modrinth">
			<SimpleIconsModrinth />
			<a href="https://modrinth.com/mod/basicweapons">Download on Modrinth</a>
		</span>
		<span class="modal-link curseforge">
			<SimpleIconsCurseforge />
			<a href="https://legacy.curseforge.com/minecraft/mc-mods/basicweapons">
				Download on CurseForge
			</a>
		</span>
		<span class="modal-link github separator-top">
			<SimpleIconsGithub />
			<a href="https://github.com/Khazoda/basicweapons">View the GitHub repository</a>
		</span>
		<span class="modal-link wiki">
			<SimpleIconsBookstack />
			<a href="https://basicweapons.khazoda.com/en/latest/">Visit the Wiki</a>
		</span>
	</div>
</Modal>

<!-- #region Bronze Modal -->
<Modal bind:showModal modalID={2}>
	<h2 slot="header" class="header-slot">
		<span>
			<img
				class="project-logo"
				src={bronze_project_icon}
				alt="logo for the currently opened project"
				width="32"
				draggable="false" />
			Bronze
		</span>
		<img
			alt="latest minecraft version"
			src="https://img.shields.io/modrinth/game-versions/bronze?style=flat&label=&color=%2311B848" />
	</h2>

	<div slot="description" class="definition-list">
		<ul>
			<li>Bronze adds two new materials; Tin and Bronze.</li>
			<li>Bronze can be turned into new armor, weaponry, tools and blocks.</li>
			<li>
				The bronze tier is slightly better than iron across the board, though significantly worse
				than diamond.
			</li>
			<li>
				Bronze is intended to be a material expansion that fits neatly into vanilla gameplay and
				progression.
			</li>
		</ul>
	</div>

	<div class="info-slot" slot="info">
		<span class="modal-link modrinth">
			<SimpleIconsModrinth />
			<a href="https://modrinth.com/mod/bronze">Download on Modrinth</a>
		</span>
		<span class="modal-link curseforge">
			<SimpleIconsCurseforge />
			<a href="https://legacy.curseforge.com/minecraft/mc-mods/bronze-mod">
				Download on CurseForge
			</a>
		</span>
		<span class="modal-link youtube separator-top">
			<SimpleIconsYoutube />
			<a href="https://www.youtube.com/@khazoda/videos">Watch Showcase</a>
		</span>
		<span class="modal-link github separator-top">
			<SimpleIconsGithub />
			<a href="https://github.com/Khazoda/bronze">View the GitHub repository</a>
		</span>
	</div>
</Modal>

<!-- #region Block Breaker & Block Placer -->
<Modal bind:showModal modalID={3}>
	<h2 slot="header" class="header-slot">
		<span>
			<img
				class="project-logo"
				src={breakerplacer_project_icon}
				alt="logo for the currently opened project"
				width="32"
				draggable="false" />
			Block Breaker & Block Placer
		</span>
		<img
			alt="latest minecraft version"
			src="https://img.shields.io/modrinth/game-versions/breakerplacer?style=flat&label=&color=%2311B848" />
	</h2>

	<div slot="description" class="definition-list">
		<ul>
			<li>Block Breaker & Block Placer is a content mod that adds two new blocks.</li>
			<li>The Breaker breaks a block in front of it when powered by a redstone pulse.</li>
			<li>The Placer places a block in front of it when powered by a redstone pulse.</li>
			<li>Considerations have been made in regards to gameplay balance for the Breaker</li>
		</ul>
	</div>

	<div class="info-slot" slot="info">
		<span class="modal-link modrinth">
			<SimpleIconsModrinth />
			<a href="https://modrinth.com/mod/breakerplacer">Download on Modrinth</a>
		</span>
		<span class="modal-link curseforge">
			<SimpleIconsCurseforge />
			<a href="https://legacy.curseforge.com/minecraft/mc-mods/breakerplacer">
				Download on CurseForge
			</a>
		</span>
		<span class="modal-link youtube separator-top">
			<SimpleIconsYoutube />
			<a href="https://www.youtube.com/@khazoda/videos">Watch Showcase</a>
		</span>
		<span class="modal-link github separator-top">
			<SimpleIconsGithub />
			<a href="https://github.com/Khazoda/block-breaker-placer">View the GitHub repository</a>
		</span>
	</div>
</Modal>

<!-- #region Basic Storage Modal -->
<Modal bind:showModal modalID={4}>
	<h2 slot="header" class="header-slot">
		<span>
			<img
				class="project-logo"
				src={basicstorage_project_icon}
				alt="logo for the currently opened project"
				width="32"
				draggable="false" />
			Basic Storage
		</span>
		<img
			alt="latest minecraft version"
			src="https://img.shields.io/modrinth/game-versions/basic-storage?style=flat&label=&color=%2311B848" />
	</h2>

	<div slot="description" class="definition-list">
		<ul>
			<li>Basic Storage adds one block - the crate.</li>
			<li>
				Crates fulfil a nieche in Minecraft's storage blocks that chests, barrels, shulker boxes and
				bundles don't.
			</li>
			<li>Interaction with crates happens directly, rather then in a GUI.</li>
			<li>
				Crates can hold up to 1 billion items of a single type, and retain their contents when
				broken.
			</li>
		</ul>
	</div>

	<div class="info-slot" slot="info">
		<span class="modal-link modrinth">
			<SimpleIconsModrinth />
			<a href="https://modrinth.com/mod/basic-storage">Download on Modrinth</a>
		</span>
		<span class="modal-link curseforge">
			<SimpleIconsCurseforge />
			<a href="https://legacy.curseforge.com/minecraft/mc-mods/basic-storage">
				Download on CurseForge
			</a>
		</span>
		<span class="modal-link youtube separator-top">
			<SimpleIconsYoutube />
			<a href="https://www.youtube.com/@khazoda/videos">Watch Showcase</a>
		</span>
		<span class="modal-link github separator-top">
			<SimpleIconsGithub />
			<a href="https://github.com/Khazoda/basic-storage">View the GitHub repository</a>
		</span>
		<span class="modal-link wiki">
			<SimpleIconsBookstack />
			<a href="https://modded.wiki/w/Mod:Basic_Storage">Visit the Wiki</a>
		</span>
	</div>
</Modal>

<!--#region PLASTAR Modal -->
<Modal bind:showModal modalID={95}>
	<h2 slot="header" class="header-slot">
		<span>
			<img
				class="project-logo"
				src={plastar_project_icon}
				alt="logo for the currently opened project"
				width="32"
				draggable="false" />
			Mecha Soldier PLASTAR
		</span>
		<img
			alt="latest minecraft version"
			src="https://img.shields.io/modrinth/game-versions/plastar?style=flat&label=&color=%2311B848" />
	</h2>

	<div slot="description" class="definition-list">
		<ul>
			<li>This mod was made for Modfest 1.21 in October 2024</li>
			<li>Tree resin can be turned into modular mecha</li>
			<li>These mecha can fight for you and perform various tasks.</li>
			<p class="collabtext">
				<PixelArticonsUsers />
				This project was a collaboration with
				<a href="https://modrinth.com/user/MattiDragon">MattiDragon</a>,
				<a href="https://modrinth.com/user/Kneelawk">Kneelawk</a>,
				<a href="https://modrinth.com/user/LemmaEOF">LemmaEOF</a>,
				<a href="https://modrinth.com/user/Pug">Pug</a> and
				<a href="https://modrinth.com/user/snakefangox">snakefangox</a>.
			</p>
		</ul>
	</div>

	<div class="info-slot" slot="info">
		<span class="modal-link modrinth">
			<SimpleIconsModrinth />
			<a href="https://modrinth.com/mod/plastar">Download on Modrinth</a>
		</span>
		<span class="modal-link github separator-top">
			<SimpleIconsGithub />
			<a href="https://github.com/Kneelawk/Mecha-Soldier-PLASTAR">View the GitHub repository</a>
		</span>
	</div>
</Modal>

<!--#region Kreebles Modal -->
<Modal bind:showModal modalID={96}>
	<h2 slot="header" class="header-slot">
		<span>
			<img
				class="project-logo"
				src={kreebles_project_icon}
				alt="logo for the currently opened project"
				width="32"
				draggable="false" />
			Kreebles
		</span>
		<img
			alt="latest minecraft version"
			src="https://img.shields.io/modrinth/game-versions/kreebles?style=flat&label=&color=%2311B848" />
	</h2>

	<div slot="description" class="definition-list">
		<ul>
			<li>This mod was made for SpookyJam 2024</li>
			<li>Mining stone & deepslate can sometimes yield more than you bargained for.</li>
			<li>Kreebles jump out of broken rocks and attack any prey they can see.</li>
			<li>
				Bearing the dastardly talisman, a rare drop from kreebles, will make them freeze in fear.
			</li>
		</ul>
	</div>

	<div class="info-slot" slot="info">
		<span class="modal-link modrinth">
			<SimpleIconsModrinth />
			<a href="https://modrinth.com/mod/kreebles">Download on Modrinth</a>
		</span>
		<span class="modal-link curseforge">
			<SimpleIconsCurseforge />
			<a href="https://legacy.curseforge.com/minecraft/mc-mods/kreebles">
				Download on CurseForge
			</a>
		</span>
		<span class="modal-link youtube separator-top">
			<SimpleIconsYoutube />
			<a href="https://youtube.com/shorts/SvPh7RlwnbA?feature=shared">Watch Teaser</a>
		</span>
		<span class="modal-link youtube">
			<SimpleIconsYoutube />
			<a href="https://www.youtube.com/watch?v=0YIWTT6_AQk">Watch Showcase</a>
		</span>
		<span class="modal-link github separator-top">
			<SimpleIconsGithub />
			<a href="https://github.com/Khazoda/kreebles">View the GitHub repository</a>
		</span>
	</div>

	<div class="feature-slot" slot="feature">
		<img src={kreebles_feature} alt="Kreebles Feature" />
	</div>
</Modal>

<!--#region Hook a Duck Modal -->
<Modal bind:showModal modalID={97}>
	<h2 slot="header" class="header-slot">
		<span>
			<img
				class="project-logo"
				src={hookaduck_project_icon}
				alt="logo for the currently opened project"
				width="32"
				draggable="false" />
			Hook a Duck
		</span>
		<img
			alt="latest minecraft version"
			src="https://img.shields.io/modrinth/game-versions/hookaduck?style=flat&label=&color=%2311B848" />
	</h2>

	<div slot="description" class="definition-list">
		<ul>
			<li>This mod was made for Modfest: Carnival in 2024</li>
			<li>Colourful ducks spawn in the rivers of your world.</li>
			<li>Hook them up with a fishing rod to receive tickets and prizes!</li>
			<li>
				For the best experience, try this mod out with the <a
					href="https://modrinth.com/modpack/modfest-carnival">Modfest Carnival</a> modpack
			</li>
			<p class="collabtext">
				<PixelArticonsUsers />
				This project was a collaboration with
				<a href="https://modrinth.com/user/Dabloon">Dabloon</a>.
			</p>
		</ul>
	</div>

	<div class="info-slot" slot="info">
		<span class="modal-link modrinth">
			<SimpleIconsModrinth />
			<a href="https://modrinth.com/mod/hookaduck">Download on Modrinth</a>
		</span>
		<span class="modal-link github separator-top">
			<SimpleIconsGithub />
			<a href="https://github.com/Khazoda/Hook-a-Duck">View the GitHub repository</a>
		</span>
	</div>
</Modal>

<!-- #region Beef & Blade Modal -->
<Modal bind:showModal modalID={98}>
	<h2 slot="header" class="header-slot">
		<span>
			<img
				class="project-logo"
				src={beef_project_icon}
				alt="logo for the currently opened project"
				width="32"
				draggable="false" />
			Beef & Blade
		</span>
		<img
			alt="latest minecraft version"
			src="https://img.shields.io/modrinth/game-versions/beef-and-blade?style=flat&label=&color=%2311B848" />
	</h2>

	<div slot="description" class="definition-list">
		<ul>
			<li>
				Beef & Blade is a serverside datapack that lets you prioritize raw beef or leather from cow
				drops
			</li>
			<li>Using a sword will yield leather drops</li>
			<li>Using an axe will yield raw beef drops</li>
		</ul>
	</div>

	<div class="info-slot" slot="info">
		<span class="modal-link modrinth">
			<SimpleIconsModrinth />
			<a href="https://modrinth.com/mod/beef-and-blade">Download on Modrinth</a>
		</span>
		<span class="modal-link curseforge">
			<SimpleIconsCurseforge />
			<a href="https://legacy.curseforge.com/minecraft/mc-mods/beef-blade">
				Download on CurseForge
			</a>
		</span>
		<span class="modal-link github separator-top">
			<SimpleIconsGithub />
			<a href="https://github.com/Khazoda/beef-and-blade">View the GitHub repository</a>
		</span>
	</div>
</Modal>

<!--#region Dwayne The Block Johnson Modal -->
<Modal bind:showModal modalID={99}>
	<h2 slot="header" class="header-slot">
		<span>
			<img
				class="project-logo"
				src={dwayne_project_icon}
				alt="logo for the currently opened project"
				width="32"
				draggable="false" />
			Dwayne 'The Block' Johnson
		</span>
		<img
			alt="latest minecraft version"
			src="https://img.shields.io/modrinth/game-versions/dwayne?style=flat&label=&color=%2311B848" />
	</h2>

	<div slot="description" class="definition-list">
		<ul>
			<li>
				Have you ever wanted to place The Block's head in your world? This mod is the solution.
			</li>
			<li>Adds dwayne's head as an item, a block, stairs, walls, plant pots and even flowers.</li>
			<li>There are some magical interactions with the blocks that are up to you to discover.</li>
		</ul>
	</div>

	<div class="info-slot" slot="info">
		<span class="modal-link modrinth">
			<SimpleIconsModrinth />
			<a href="https://modrinth.com/mod/dwayne">Download on Modrinth</a>
		</span>
		<span class="modal-link curseforge">
			<SimpleIconsCurseforge />
			<a href="https://legacy.curseforge.com/minecraft/mc-mods/dwayne-the-block-johnson">
				Download on CurseForge
			</a>
		</span>
		<span class="modal-link github separator-top">
			<SimpleIconsGithub />
			<a href="https://github.com/Khazoda/dwayne-the-block-johnson">View the GitHub repository</a>
		</span>
	</div>
</Modal>

<!-- #region CSS-->
<style lang="scss">
	:root {
		--color-text-primary: #e2e2e2;
		--color-text-secondary: #aaaaaa;
		--color-background-dark: #2c2c2c;
		--color-background-darker: #141414;
		--color-link: rgb(128, 215, 255);
		--color-link-muted: rgb(149, 187, 204);
		--color-link-modrinth: rgb(128, 255, 160);
		--color-link-curseforge: rgb(255, 158, 94);
		--color-link-generic: rgb(197, 209, 222);
		--color-link-youtube: rgb(255, 92, 113);
	}
	.page-container {
		position: static;
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: center;
	}
	// Mobile
	@media screen and (max-width: 1000px) {
		.page-container {
			align-items: flex-start;
		}
	}
	//#region Page Title
	.big-title {
		font-size: 4rem;
		letter-spacing: 0.25rem;
		color: var(--color-text-primary);
		font-family: Lexend, Quicksand, Calibri;
		font-weight: 350;
		margin-top: 5rem;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		gap: 0.125rem;
		width: 100%;
		img {
			opacity: 1;
			width: 10rem;
		}
	}
	// Special cases for 1600x900 PC screens
	@media screen and (max-height: 850px) {
		.big-title {
			margin-top: 0.25rem;
		}
	}
	@media screen and (max-height: 600px) {
		.big-title {
			color: var(--color-text-secondary);
		}
	}
	// Mobile
	@media screen and (max-width: 1000px) {
		.big-title {
			font-size: 1.75rem;
			margin-top: 0.5rem;
			img {
				max-width: 64px;
			}
		}
	}

	@media screen and (max-width: 1000px) and (max-height: 660px) {
		.big-title,
		footer {
			visibility: hidden;
			opacity: 0;
		}
	}

	//#region Center Container
	.center-container {
		position: fixed;
		inset: 0;
		bottom: auto;
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.hovered-name {
		position: relative;
		top: 0rem;
		font-size: larger;
		background: var(--color-background-dark);
		padding: 0.25rem 2rem;
		border-radius: 1rem;
		opacity: 0;
		transition: opacity 0.25s ease-out;
		user-select: none;
	}
	// Mobile
	@media screen and (max-width: 1000px) {
		.hovered-name {
			display: none;
		}
	}

	@media screen and (max-width: 1000px) and (max-height: 1000px) {
		.center-container {
			padding-top: 20vh;
		}
	}
	@media screen and (max-width: 1000px) and (max-height: 750px) {
		.center-container {
			padding-top: 0;
		}
	}

	.center-container:has(ul.projects-container:hover) .hovered-name,
	.center-container:has(ul.projects-container:focus-within) .hovered-name,
	.page-container:has(.edge-mini-wrapper button:hover) .hovered-name,
	.page-container:has(.edge-mini-wrapper button:focus-within) .hovered-name {
		opacity: 1;
	}

	ul.projects-container {
		position: relative;
		width: 256px;
		height: 256px;
		list-style-type: none;
		margin: 0;
		padding: 0;
	}
	// Mobile
	@media screen and (max-width: 1000px) {
		ul.projects-container {
			width: 192px;
			height: 192px;
		}
	}

	.projects-container li {
		user-select: none;
		position: absolute;
		inset: 0;
		animation: float infinite 5s cubic-bezier(0.25, 0.1, 0.25, 1);
		will-change: transform, filter;
	}
	.projects-container button {
		transition:
			scale 0.15s ease-out,
			box-shadow 0.2s ease-out;
		background: none;
		color: inherit;
		border: none;
		padding: 0;
		font: inherit;
		cursor: pointer;
		outline: none;

		&:hover {
			scale: 1.05;
		}

		&:focus-visible {
			scale: 1.05;
			filter: drop-shadow(0 0 10px var(--color-background-dark)) brightness(1.1);
			transform: scale(1.05);
		}

		&:active {
			scale: 0.95;
		}
	}

	.projects-container {
		li {
			transition: transform 0.4s ease-out;
		}
		@for $i from 1 through 5 {
			li:nth-child(#{$i}) {
				$x: nth((-400px, -200px, 0px, 200px, 400px), $i);
				$y: nth((34px, -13px, 4px, -19px, 17px), $i);
				$rotate: nth((-10deg, -4deg, 3deg, -3deg, 6deg), $i);
				$delay: nth((100ms, 0ms, 40ms, 135ms, 80ms), $i);
				$duration: nth((6s, 4.5s, 5.2s, 5.8s, 4.8s), $i);

				transform: translateX($x) translateY($y) rotate($rotate);
				animation-delay: $delay;
				animation-duration: $duration;
			}
		}
		@media screen and (max-width: 1000px) {
			@for $i from 1 through 5 {
				li:nth-child(#{$i}) {
					$x: if($i % 2 == 0, 80px, -80px);
					$y: nth((-175px, -175px, 0px, 0px, 175px), $i);
					$rotate: nth((-10deg, -4deg, 2deg, -3deg, 6deg), $i);
					$delay: nth((100ms, 0ms, 40ms, 135ms, 80ms), $i);
					$duration: nth((6s, 4.5s, 5.2s, 5.8s, 4.8s), $i);

					transform: translateX($x) translateY($y) rotate($rotate);
					animation-delay: $delay;
					animation-duration: $duration;
				}
			}
		}
	}
	@keyframes float {
		0% {
			filter: drop-shadow(0px 10px 5px rgba(0, 0, 0, 0));
			translate: 0px 0px;
		}
		50% {
			filter: drop-shadow(0px 3px 1px rgba(0, 0, 0, 1));
			translate: 0px 20px;
		}
		100% {
			filter: drop-shadow(0px 10px 5px rgba(0, 0, 0, 0));
			translate: 0px 0px;
		}
	}

	footer {
		font-size: x-large;
		color: var(--color-text-secondary);
		z-index: 2;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		a {
			color: inherit;
			transition: color 0.1s ease-out;

			&:hover {
				color: hsl(0deg, 0%, 50%);
			}
		}
		span.socials-container {
			display: inline-flex;
			font-size: 1.25rem;
			gap: 0.5rem;
		}
		span.copyright {
			font-size: small;
			font-family: monospace;
		}
	}
	// Mobile
	@media screen and (max-width: 1000px) {
		footer {
			width: auto;
		}
	}

	//#region Modal Styles
	.header-slot {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		line-height: 2rem;
		gap: 0.5rem;
		text-wrap: pretty;
		img {
			max-width: 100%;
			height: auto;
		}
		span {
			display: inline-flex;
			align-items: flex-start;
			gap: 0.5rem;
		}
	}
	ul {
		padding-left: 1.5rem;
	}
	.info-slot {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		margin: 1rem 0;
	}

	.feature-slot {
		max-width: 325px;
		margin-top: 1rem;
		display: inline-flex;
		background-color: #141414;
		border-radius: 10px;
		border: 1px solid rgba(255, 255, 255, 0.05);
		padding: 12px;
		box-shadow:
			inset 0 2px 4px rgba(0, 0, 0, 0.3),
			inset 0 -1px 1px rgba(255, 255, 255, 0.05);
		position: relative;
		overflow: hidden;
		&::before {
			content: '';
			position: absolute;
			top: -2px;
			left: -2px;
			right: -2px;
			bottom: -2px;
			background-image: linear-gradient(to right, rgba(255, 255, 255, 0.05) 1px, transparent 1px),
				linear-gradient(to bottom, rgba(255, 255, 255, 0.05) 1px, transparent 1px);
			background-size: 17.5px 17.5px; /* 350px / 20 = 17.5px */
			background-position: 0 0;
			pointer-events: none;
			border-radius: 10px; /* Slightly larger than the container */
		}
		&::after {
			content: '';
			position: absolute;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			background: linear-gradient(
				to bottom,
				rgba(255, 255, 255, 0.02) 0%,
				rgba(0, 0, 0, 0.02) 100%
			);
			border-radius: 8px;
		}
		img,
		video {
			border-radius: 8px;
			width: 100%;
			object-fit: scale-down;
			position: relative;
			z-index: 1;
			filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3));
		}
	}

	@media screen and (max-width: 1000px) {
		.modal-link.wiki {
			margin-bottom: 2rem;
		}
	}
	a {
		color: var(--color-link);
		text-decoration: none;
		&:hover {
			text-decoration: underline;
		}
	}
	.modal-link {
		display: flex;
		flex-direction: row;
		align-items: center;
		gap: 0.5rem;
		color: var(--color-link);
		text-decoration: none;
		line-height: 1.5rem;
		font-size: large;

		&.separator-top {
			padding-top: 1rem;
			margin-top: 0.5rem;
			border-top: 2px solid var(--color-background-dark);
		}
		&.modrinth {
			color: var(--color-link-modrinth);
		}
		&.curseforge {
			color: var(--color-link-curseforge);
		}
		&.github {
			color: var(--color-link-generic);
		}
		&.wiki {
			color: var(--color-link-generic);
		}
		&.youtube {
			color: var(--color-link-youtube);
		}
		a {
			color: inherit;
			text-decoration: inherit;
			&:hover {
				text-decoration: underline;
			}
		}
	}

	//#region Other Styles
	.top-left-container {
		position: fixed;
		top: 1rem;
		left: 1rem;
		z-index: 1000;
		align-items: flex-start;
		gap: 0.5rem;
		padding: 0.5rem;
		color: rgb(32, 222, 255);
		font-size: 0.8rem;
		font-weight: 800;
		font-family: Quicksand, sans-serif;

		img {
			height: 3rem;
			width: auto;
			margin-bottom: auto;
		}
	}

	@keyframes pulse {
		0% {
			opacity: 1;
		}
		50% {
			opacity: 0.7;
		}
		100% {
			opacity: 1;
		}
	}

	// Mobile styles
	@media screen and (max-width: 1000px) {
		.top-left-container {
			display: none;
		}
	}

	.top-right-container {
		position: fixed;
		top: 1rem;
		right: 1rem;
		z-index: 1000;
		display: flex;
		flex-direction: row;
		gap: 0.5rem;
	}
	.square-btn {
		background: none;
		border: none;
		padding: 0;
		margin: 0;
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: center;
		color: var(--color-text-secondary);
		font-size: 1.3rem;
		padding: 0.4rem;
		background-color: rgba(44, 44, 44, 0.7);
		border-radius: 25%;
		transition: background-color 0.2s ease-out;

		&:hover {
			background-color: var(--color-background-dark);
		}
	}

	// Mobile styles
	@media screen and (max-width: 1000px) {
		.audio-toggle {
			top: 0.5rem;
			right: 0.5rem;
			font-size: 1.1rem;
		}
	}

	//#region Edge Mini Section
	.edge-mini-wrapper {
		position: fixed;
		display: flex;
		flex-direction: column;
		align-items: flex-end;
		justify-content: flex-end;
		bottom: 0.5rem;
		right: 0.5rem;
		z-index: 99;
		border: 2px solid var(--color-background-dark);
		border-radius: 0.5rem;
		padding: 0.5rem;
		gap: 0.5rem;

		& > div {
			display: flex;
			flex-flow: column wrap;
			align-items: flex-end;

			div {
				width: 100%;
				display: inline-flex;
				justify-content: flex-end;
			}
			span {
				color: var(--color-text-secondary);
				font-family: Lexend, Quicksand, Calibri;
				margin-bottom: 0.25rem;
			}
			button {
				background: none;
				border: none;
				padding: 0.25rem;
				margin: 0 0.125rem;
				cursor: pointer;
				transition:
					transform 0.2s ease,
					box-shadow 0.2s ease-out;

				&:hover {
					transform: scale(1.1);
				}

				&:focus-visible {
					transform: scale(1.1);
					border: 2px var(--color-background-dark);
				}

				img {
					display: block;
				}
			}
		}
	}

	.collabtext {
		color: var(--color-text-secondary);
		a {
			color: var(--color-link-muted);
		}

		:global(svg) {
			vertical-align: bottom;
			margin-right: 0.15rem;
		}
	}

	.page-container {
		background: transparent;
	}
</style>

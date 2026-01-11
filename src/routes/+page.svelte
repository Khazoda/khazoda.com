<script lang="ts">
	// Site Exclusive Icons
	import web_large_plushables from "$lib/media/mod_icons/web_large_plushables.webp";
	import web_large_basicweapons from "$lib/media/mod_icons/web_large_basicweapons.webp";
	import web_large_bronze from "$lib/media/mod_icons/web_large_bronze.webp";
	import web_large_basicstorage from "$lib/media/mod_icons/web_large_basicstorage.webp";
	import web_large_breakerplacer from "$lib/media/mod_icons/web_large_breakerplacer.webp";
	import web_large_heirlooms from "$lib/media/mod_icons/web_large_heirlooms.webp";

	import beef_icon from "$lib/media/mod_icons/beef_project_icon_simple.webp";
	import dwayne_icon from "$lib/media/mod_icons/dwayne_project_icon_simple.webp";
	import hookaduck_icon from "$lib/media/mod_icons/hookaduck_project_icon_simple.webp";
	import kreebles_icon from "$lib/media/mod_icons/kreebles_project_icon_simple.webp";
	import plastar_icon from "$lib/media/mod_icons/plastar_project_icon_simple.webp";
	import helpfulcampfires_icon from "$lib/media/mod_icons/helpfulcampfires_project_icon_simple.webp";

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
	import creator_logo from "$lib/materialpack/media/creator_logo.webp";

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

	import profile_icon from "$lib/media/profile_icon.webp";
	import materialpack_link_logo from "$lib/media/materialpack-link-logo.webp";

	import btn_press_sound from "$lib/sound/click.mp3";
	import audio_activated_sound from "$lib/sound/audio_activated.mp3";

	import Modal from "../components/Modal.svelte";
	import IconoirBluesky from "virtual:icons/simple-icons/bluesky";
	import IconoirDiscord from "virtual:icons/simple-icons/discord";
	import SimpleIconsModrinth from "virtual:icons/simple-icons/modrinth";
	import SimpleIconsCurseforge from "virtual:icons/simple-icons/curseforge";
	import SimpleIconsGithub from "virtual:icons/simple-icons/github";
	import SimpleIconsYoutube from "virtual:icons/simple-icons/youtube";
	import SimpleIconsBookstack from "virtual:icons/simple-icons/bookstack";
	import IconoirCollageFrame from "virtual:icons/iconoir/collage-frame";
	import IconoirViewGrid from "virtual:icons/iconoir/view-grid";
	import IconoirPlanetSat from "virtual:icons/iconoir/planet-sat";
	import IconoirLensPlus from "virtual:icons/iconoir/lens-plus";
	import HugeiconsMining01 from "virtual:icons/hugeicons/mining-01";
	import HugeiconsBlockchain01 from "virtual:icons/hugeicons/blockchain-01";
	import HugeiconsMonocle01 from "virtual:icons/hugeicons/monocle-01";
	import PixelarticonsSortNumeric from "~icons/pixelarticons/sort-numeric";
	import PixelarticonsHumanHandsup from "virtual:icons/pixelarticons/human-handsup";
	import PixelarticonsGamepad from "~icons/pixelarticons/gamepad";
	import PixelarticonsSliders2 from "virtual:icons/pixelarticons/sliders-2";
	import PixelarticonsDice from "virtual:icons/pixelarticons/dice";
	import HugeiconsDiagonalScrollPoint01 from "virtual:icons/hugeicons/diagonal-scroll-point-01";
	import PixelArticonsUsers from "virtual:icons/pixelarticons/users";
	import PixelarticonsCameraFace from "virtual:icons/pixelarticons/camera-face";

	import PlushablesColoured from "components/PlushablesColoured.svelte";
	import { onMount } from "svelte";
	import { replaceState, goto } from "$app/navigation";
	import { page } from "$app/stores";

	import ImportantButton from "src/components/materialpack/ImportantButton.svelte";
	import FluentNew16Filled from "~icons/fluent/new-16-filled";
	import { SHOW_NEW_FEATURE_BANNER } from "src/config/general-config";
	import NewFeatureWidget from "src/components/NewFeatureWidget.svelte";
	import { fade, fly } from "svelte/transition";
	import { cubicInOut, cubicOut } from "svelte/easing";
	import CenterModal from "src/components/CenterModal.svelte";
	import VideoPlayer from "src/components/VideoPlayer.svelte";

	var showModal: boolean[] = Array(1000).fill(false);
	$: currentlyHovered = "";
	const hashToModalID: Record<string, number> = {
		"#plushables": 0,
		"#basicweapons": 1,
		"#bronze": 2,
		"#basicstorage": 3,
		"#breakerplacer": 4,
		"#helpfulcampfires": 93,
		"#heirlooms": 5,
		"#plastar": 95,
		"#kreebles": 96,
		"#hookaduck": 97,
		"#beefandblade": 98,
		"#dwayne": 99,
		"#modjam-mods": 997,
		"#collaborations": 998,
		"#other-mods": 999,
		"#settings": 1000
	};
	const modalIDToHash = Object.fromEntries(Object.entries(hashToModalID).map(([hash, id]) => [id, hash]));

	const showDialog = (modalID: number) => {
		if (!showModal) return;
		showModal[modalID] = true;
		document.getElementsByTagName("body")[0].style.overscrollBehavior = "none";

		// Add the hash to the URL when the modal is opened
		const hash = modalIDToHash[modalID];
		if (hash) {
			replaceState($page.url.origin + hash, {});
		}
	};

	let audioEnabled = true;
	enum RegisteredAudio {
		Click = "click-sound",
		AudioActivated = "audio-activated-sound"
	}

	onMount(() => {
		const storedPreference = localStorage.getItem("audioEnabled");
		if (storedPreference !== null) {
			audioEnabled = storedPreference === "true";
		}
		// Add event listeners
		window.addEventListener("keydown", handleKeydown);

		// setTimeout in order to delay and allow document root to be hydrated
		setTimeout(() => {
			const hash = $page.url.hash;
			if (hash && hashToModalID[hash] !== undefined) {
				const modalID = hashToModalID[hash];
				showDialog(modalID);
			}
		}, 0);

		// Event listener cleanup
		return () => {
			window.removeEventListener("keydown", handleKeydown);
		};
	});

	function handleHover(node: HTMLElement, params: [string, boolean] = ["", false]) {
		const [label, playClickSound] = params;
		const handleEnter = () => (currentlyHovered = label);
		const handleLeave = () => (currentlyHovered = "");

		node.addEventListener("mouseover", handleEnter);
		node.addEventListener("focus", handleEnter);
		node.addEventListener("mouseenter", handleEnter);
		node.addEventListener("focusin", handleEnter);
		node.addEventListener("mouseleave", handleLeave);
		node.addEventListener("focusout", handleLeave);

		if (playClickSound) {
			playAudio(node, RegisteredAudio.Click);
		}

		return {
			destroy() {
				node.removeEventListener("mouseover", handleEnter);
				node.removeEventListener("focus", handleEnter);
				node.removeEventListener("mouseenter", handleEnter);
				node.removeEventListener("focusin", handleEnter);
				node.removeEventListener("mouseleave", handleLeave);
				node.removeEventListener("focusout", handleLeave);
			}
		};
	}

	function toggleAudioEnabled(node: HTMLElement) {
		localStorage.setItem("audioEnabled", audioEnabled.toString());
	}

	function playAudio(node: HTMLElement, audioName?: RegisteredAudio) {
		const handleClick = () => {
			if (audioEnabled) {
				// Play Default Click Sound
				if (!audioName) {
					const audio = document.getElementById("click-sound") as HTMLAudioElement;
					audio.volume = 0.4;
					audio?.play();
				} else {
					// Play Specified Audio
					const audio = document.getElementById(audioName) as HTMLAudioElement;
					audio.volume = 0.4;
					audio?.play();
				}
			}
		};
		node.addEventListener("click", handleClick);
		return {
			destroy: () => node.removeEventListener("click", handleClick)
		};
	}

	// Secret pokemon page navigation
	let konamiCode = [
		"ArrowUp",
		"ArrowUp",
		"ArrowDown",
		"ArrowDown",
		"ArrowLeft",
		"ArrowRight",
		"ArrowLeft",
		"ArrowRight",
		"b",
		"a"
	];
	let konamiIndex = 0;
	function handleKeydown(event: KeyboardEvent) {
		if (event.key !== konamiCode[konamiIndex]) {
			konamiIndex = 0;
			return;
		}
		konamiIndex++;
		if (konamiIndex === konamiCode.length) {
			konamiIndex = 0;
			sessionStorage.setItem("secret_pokemon", "1");
			goto("/_pokemon", {
				replaceState: true,
				noScroll: true
			});
		}
	}
</script>

<!-- #region HTML-->
<svelte:head>
	<meta http-equiv="X-UA-Compatible" content="ie=edge" />
	<title>Khazoda's Mods</title>
</svelte:head>
<div class="page-container">
	<!-- <NewFeatureWidget
		title="Material Pack Creator"
		showBadge={true}
		icon={creator_logo}
		href="/basicweapons/materialpacks">
		Build your own material packs for Basic Weapons!
	</NewFeatureWidget> -->

	<audio id="click-sound" preload="none">
		<source src={btn_press_sound} type="audio/mpeg" />
		Your browser does not support the audio element.
	</audio>
	<audio id="audio-activated-sound" preload="none">
		<source src={audio_activated_sound} type="audio/mpeg" />
		Your browser does not support the audio element.
	</audio>

	<div class="island-section">
		{#if currentlyHovered !== ""}
			<div transition:fly={{ y: -10, duration: 100, easing: cubicInOut }} class="dynamic-label">
				<span>{currentlyHovered}</span>
			</div>
		{/if}
		<!-- #region Island -->
		<div class="island">
			<span class="island-content generic-island-flex-container">
				<div class="island-left generic-island-flex-container">
					<span class="element circquare-left inert" use:handleHover={["Thanks for visiting! 😎", false]}>
						<img src={profile_icon} alt="Khazoda" width="64" draggable="false" /></span>
				</div>
				<!-- Separator -->
				<div class="vertical-spacer"></div>
				<!-- Separator -->
				<div class="island-center generic-island-flex-container">
					<div class="island-center-left generic-island-flex-container">
						<span class="element squircle">
							<a
								href="/basicweapons/materialpacks"
								use:handleHover={["Material Pack Creator", false]}
								aria-label="Material Pack Creator">
								<img
									src={materialpack_link_logo}
									alt="Creator Logo"
									width="52"
									draggable="false"
									class="no-resample" /></a>
						</span>
					</div>
					<div class="island-center-right generic-island-flex-container">
						<span class="element squircle">
							<button
								use:handleHover={["Mod Jam Mods", true]}
								on:click={() => showDialog(997)}
								aria-label="Mod Jam Mods">
								<PixelarticonsDice width="42" height="42" />
							</button>
						</span>
						<span class="element squircle">
							<button
								use:handleHover={["Collaborations", true]}
								on:click={() => showDialog(998)}
								aria-label="Collaborations">
								<PixelarticonsCameraFace width="42" height="42" />
							</button>
						</span>
						<span class="element squircle">
							<button use:handleHover={["Other Mods", true]} on:click={() => showDialog(999)} aria-label="Other Mods">
								<PixelarticonsGamepad width="42" height="42" />
							</button>
						</span>
						<div class="vertical-spacer"></div>
						<span class="element squircle">
							<a
								href="/versions"
								use:handleHover={["Version Information Table", false]}
								aria-label="Version Information Table">
								<PixelarticonsSortNumeric width="42" height="42" />
							</a>
						</span>
					</div>
				</div>
				<!-- Separator -->
				<div class="vertical-spacer"></div>
				<!-- Separator -->
				<div class="island-right generic-island-flex-container">
					<span class="element circquare-right settings-button">
						<button
							on:click={() => showDialog(1000)}
							aria-label="Settings"
							use:handleHover={["🔧 Change Preferences", true]}>
							<PixelarticonsSliders2 width="32" height="32" />
						</button>
					</span>
				</div>
			</span>
		</div>
	</div>
	<!-- #region Main Projects -->
	<ul class="projects-section">
		<li>
			<button
				use:handleHover={["Plushables", true]}
				on:click={() => showDialog(0)}
				type="button"
				title="Plushables"
				tabindex="0">
				<img src={web_large_plushables} alt="Plushables" width="512" draggable="false" class="ms-edge-imgfix" />
			</button>
		</li>
		<li>
			<button
				use:handleHover={["Basic Weapons", true]}
				on:click={() => showDialog(1)}
				type="button"
				title="Basic Weapons"
				tabindex="0">
				<img src={web_large_basicweapons} alt="Basic Weapons" width="512" draggable="false" class="ms-edge-imgfix" />
			</button>
		</li>
		<li>
			<button
				on:click={() => showDialog(2)}
				use:handleHover={["Bronze", true]}
				type="button"
				title="Bronze"
				tabindex="0">
				<img src={web_large_bronze} alt="Bronze" width="512" draggable="false" class="ms-edge-imgfix" />
			</button>
		</li>
		<li>
			<button
				on:click={() => showDialog(3)}
				use:handleHover={["Basic Storage", true]}
				type="button"
				title="Basic Storage"
				tabindex="0">
				<img src={web_large_basicstorage} alt="Basic Storage" width="512" draggable="false" class="ms-edge-imgfix" />
			</button>
		</li>
		<li>
			<button
				on:click={() => showDialog(4)}
				use:handleHover={["Block Breaker & Block Placer", true]}
				type="button"
				title="Block Breaker & Block Placer"
				tabindex="0">
				<img
					src={web_large_breakerplacer}
					alt="Block Breaker & Block Placer"
					width="512"
					draggable="false"
					class="ms-edge-imgfix" />
			</button>
		</li>
		<li>
			<button
				on:click={() => showDialog(5)}
				use:handleHover={["Heirlooms", true]}
				type="button"
				title="Heirlooms"
				tabindex="0">
				<img src={web_large_heirlooms} alt="Heirlooms" width="512" draggable="false" class="ms-edge-imgfix" />
			</button>
		</li>
	</ul>

	<footer class="footer-section">
		<span class="socials-container">
			<a
				href="https://bsky.app/profile/khazoda.com"
				aria-label="Khazoda on Bluesky"
				title="Khazoda on Bluesky"
				class="bluesky"><IconoirBluesky width="24" height="24" /></a>
			<a
				href="https://discord.com/invite/vEZUkSxwR9"
				aria-label="Get support on Discord"
				title="Get support on Discord"
				target="_blank"
				class="discord"><IconoirDiscord width="24" height="24" /></a>
		</span>
		<span class="copyright"
			>&copy; <a href="https://khazoda.com">khazoda.com</a> {new Date().getFullYear() || 2025}</span>
	</footer>
</div>
<!--#region Plushables Modal -->
<Modal bind:showModal modalID={0} learnMoreURL="/plushables">
	<h2 slot="header" class="header-slot">
		<img
			src={title_plushables}
			alt="logo for the currently opened project"
			loading="lazy"
			decoding="async"
			draggable="false" />
	</h2>

	<div slot="description" class="mod-description-points">
		<ul>
			<li>Plushables adds over 45 new plushies to Minecraft.</li>
			<li>From cats to dogs to small mushroom people, wizards and mammoths - there's a plushie for everyone.</li>
			<li>Plushables aims to bring fresh new designs into the game rather than recreating existing Minecraft mobs.</li>
			<li>Along with Plushables' original designs you will find plushies based on a variety of other mods.</li>
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
			<a href="https://legacy.curseforge.com/minecraft/mc-mods/plushables"> Download on CurseForge </a>
		</span>
		<span class="modal-link youtube separator-top disabled">
			<SimpleIconsYoutube />
			<a href="https://www.youtube.com/@khazoda/videos">Watch Showcase</a>
		</span>
		<span class="modal-link github separator-top">
			<SimpleIconsGithub />
			<a href="https://github.com/Khazoda/Plushables">View the GitHub repository</a>
		</span>
	</div>
	<div class="feature-slot" slot="feature">
		<VideoPlayer src={plushables_feature} visible={showModal[0]} disableMuteButton />
	</div>
</Modal>

<!--#region Basic Weapons Modal -->
<Modal bind:showModal modalID={1} learnMoreURL="/basicweapons">
	<h2 slot="header" class="header-slot">
		<img
			src={title_basicweapons}
			alt="logo for the currently opened project"
			loading="lazy"
			decoding="async"
			draggable="false" />
	</h2>

	<div slot="description" class="mod-description-points">
		<ul>
			<li>Basic Weapons adds 6 new vanilla-esque weapon types to Minecraft.</li>
			<li>Each weapon has a distinctly different combat style.</li>
			<li>
				Integration with the <a href="https://modrinth.com/mod/better-combat">Better Combat</a> and
				<a href="https://khazoda.com#bronze">Bronze</a> mods lets Basic Weapons really shine.
			</li>
			<li>Sword & axe melee combat is too repetitive - treat yourself to some other options with Basic Weapons!</li>
		</ul>
	</div>

	<div class="info-slot" slot="info">
		<span class="modal-link modrinth">
			<SimpleIconsModrinth />
			<a href="https://modrinth.com/mod/basicweapons">Download on Modrinth</a>
		</span>
		<span class="modal-link curseforge">
			<SimpleIconsCurseforge />
			<a href="https://legacy.curseforge.com/minecraft/mc-mods/basicweapons"> Download on CurseForge </a>
		</span>
		<span class="modal-link youtube separator-top disabled">
			<SimpleIconsYoutube />
			<a href="https://www.youtube.com/@khazoda/videos">Watch Showcase</a>
		</span>
		<span class="modal-link github separator-top">
			<SimpleIconsGithub />
			<a href="https://github.com/Khazoda/basic-weapons">View the GitHub repository</a>
		</span>
		<span class="modal-link wiki">
			<SimpleIconsBookstack />
			<a href="https://basicweapons.khazoda.com/en/latest/">Visit the Wiki</a>
		</span>
	</div>
	<div slot="feature">
		<h3>Material Packs</h3>
		<p>Your Basic Weapons experience can be evolved through material packs.</p>
		<p>
			These packs add new weapons to your game and are super easy to make! Explore the public list or try your hand at
			making your own:
		</p>
		<br />
		<span class="modal-link info">
			<IconoirPlanetSat />
			<a href="/basicweapons/materialpacks/list">View All Material Packs</a>
		</span>
		<span class="modal-link info margin-top-2">
			<IconoirLensPlus />
			<a href="/basicweapons/materialpacks/create">Create Your Own</a>
		</span>
	</div>
</Modal>

<!-- #region Bronze Modal -->
<Modal bind:showModal modalID={2} learnMoreURL="/bronze">
	<h2 slot="header" class="header-slot">
		<img
			src={title_bronze}
			alt="logo for the currently opened project"
			loading="lazy"
			decoding="async"
			draggable="false" />
	</h2>

	<div slot="description" class="mod-description-points">
		<ul>
			<li>Bronze adds two new materials; Tin and Bronze.</li>
			<li>Bronze can be turned into new armor, weaponry, tools and blocks.</li>
			<li>The bronze tier is slightly better than iron across the board, though significantly worse than diamond.</li>
			<li>Bronze is intended to be a material expansion that fits neatly into vanilla gameplay and progression.</li>
		</ul>
	</div>

	<div class="info-slot" slot="info">
		<span class="modal-link modrinth">
			<SimpleIconsModrinth />
			<a href="https://modrinth.com/mod/bronze">Download on Modrinth</a>
		</span>
		<span class="modal-link curseforge">
			<SimpleIconsCurseforge />
			<a href="https://legacy.curseforge.com/minecraft/mc-mods/bronze-mod"> Download on CurseForge </a>
		</span>
		<span class="modal-link youtube separator-top disabled">
			<SimpleIconsYoutube />
			<a href="https://www.youtube.com/@khazoda/videos">Watch Showcase</a>
		</span>
		<span class="modal-link github separator-top">
			<SimpleIconsGithub />
			<a href="https://github.com/Khazoda/bronze">View the GitHub repository</a>
		</span>
	</div>
</Modal>

<!-- #region Basic Storage Modal -->
<Modal bind:showModal modalID={3} learnMoreURL="/basicstorage">
	<h2 slot="header" class="header-slot">
		<img
			src={title_basicstorage}
			alt="logo for the currently opened project"
			loading="lazy"
			decoding="async"
			draggable="false" />
	</h2>

	<div slot="description" class="mod-description-points">
		<ul>
			<li>Basic Storage adds one block - the crate.</li>
			<li>
				Crates fulfil a nieche in Minecraft's storage blocks that chests, barrels, shulker boxes and bundles don't.
			</li>
			<li>Interaction with crates happens directly, rather then in a GUI.</li>
			<li>Crates can hold up to 1 billion items of a single type, and retain their contents when broken.</li>
		</ul>
	</div>

	<div class="info-slot" slot="info">
		<span class="modal-link modrinth">
			<SimpleIconsModrinth />
			<a href="https://modrinth.com/mod/basicstorage">Download on Modrinth</a>
		</span>
		<span class="modal-link curseforge">
			<SimpleIconsCurseforge />
			<a href="https://legacy.curseforge.com/minecraft/mc-mods/basic-storage"> Download on CurseForge </a>
		</span>
		<span class="modal-link youtube separator-top disabled">
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

<!-- #region Block Breaker & Block Placer -->
<Modal bind:showModal modalID={4} learnMoreURL="/breakerplacer">
	<h2 slot="header" class="header-slot">
		<img
			src={title_breakerplacer}
			alt="logo for the currently opened project"
			loading="lazy"
			decoding="async"
			draggable="false" />
	</h2>

	<div slot="description" class="mod-description-points">
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
			<a href="https://legacy.curseforge.com/minecraft/mc-mods/breakerplacer"> Download on CurseForge </a>
		</span>
		<span class="modal-link youtube separator-top disabled">
			<SimpleIconsYoutube />
			<a href="https://www.youtube.com/@khazoda/videos">Watch Showcase</a>
		</span>
		<span class="modal-link github separator-top">
			<SimpleIconsGithub />
			<a href="https://github.com/Khazoda/block-breaker-placer">View the GitHub repository</a>
		</span>
	</div>
</Modal>

<!--#region Heirlooms Modal -->
<Modal bind:showModal modalID={5} learnMoreURL="/heirlooms">
	<h2 slot="header" class="header-slot">
		<img
			src={title_heirlooms}
			alt="logo for the currently opened project"
			loading="lazy"
			decoding="async"
			draggable="false" />
	</h2>

	<div slot="description" class="mod-description-points">
		<ul>
			<li>This mod was made for the 2025 CurseForge ModJam</li>
			<li>Crafting unstackable items affixes them with the date and the player's name</li>
			<li>Look back at the history of your items and feel a greater sense of pride and ownership</li>
		</ul>
	</div>

	<div class="info-slot" slot="info">
		<span class="modal-link modrinth">
			<SimpleIconsModrinth />
			<a href="https://modrinth.com/mod/heirlooms">Download on Modrinth</a>
		</span>
		<span class="modal-link curseforge">
			<SimpleIconsCurseforge />
			<a href="https://legacy.curseforge.com/minecraft/mc-mods/heirlooms"> Download on CurseForge </a>
		</span>
		<span class="modal-link youtube separator-top disabled">
			<SimpleIconsYoutube />
			<a href="https://www.youtube.com/@khazoda/videos">Watch Showcase</a>
		</span>
		<span class="modal-link github separator-top">
			<SimpleIconsGithub />
			<a href="https://github.com/Khazoda/heirlooms">View the GitHub repository</a>
		</span>
	</div>

	<div class="feature-slot" slot="feature">
		<VideoPlayer src={heirlooms_feature} disableMuteButton visible={showModal[94]} />
	</div>
</Modal>

<!--#region Helpful Campfires Modal -->
<Modal bind:showModal modalID={93} returnToURL="/#other-mods">
	<h2 slot="header" class="header-slot">
			<img
				class="project-logo"
				src={helpfulcampfires_project_icon}
				alt="logo for the currently opened project"
				width="32"
				height="32"
				loading="lazy"
				decoding="async"
				draggable="false" />
			Helpful Campfires
	</h2>

	<div slot="description" class="mod-description-points">
		<ul>
			<li>This mod was made for SpookyJam 2025</li>
			<li>Minecraft's campfires now give buffs in an area</li>
			<li>Normal campfires give players a regeneration effect</li>
			<li>Soul campfires give players a 2 block high jump boost</li>
			<li>
				Additionally, a new stump chair block lets you sit around a campfire with your friends, whether they're players
				or animals
			</li>
		</ul>
	</div>

	<div class="info-slot" slot="info">
		<span class="modal-link modrinth">
			<SimpleIconsModrinth />
			<a href="https://modrinth.com/mod/helpfulcampfires">Download on Modrinth</a>
		</span>
		<span class="modal-link curseforge">
			<SimpleIconsCurseforge />
			<a href="https://legacy.curseforge.com/minecraft/mc-mods/helpfulcampfires"> Download on CurseForge </a>
		</span>
		<span class="modal-link youtube separator-top disabled">
			<SimpleIconsYoutube />
			<a href="https://youtube.com/shorts/6ty8oi36AoQ?si=SHc_ngt0WaAd6-tj">Watch Showcase</a>
		</span>
		<span class="modal-link github separator-top">
			<SimpleIconsGithub />
			<a href="https://github.com/Khazoda/helpful-campfires">View the GitHub repository</a>
		</span>
	</div>

	<div class="feature-slot" slot="feature">
		<VideoPlayer src={helpfulcampfires_feature} visible={showModal[93]} />
	</div>
</Modal>

<!--#region PLASTAR Modal -->
<Modal bind:showModal modalID={95} returnToURL="/#other-mods">
	<h2 slot="header" class="header-slot">
			<img
				class="project-logo"
				src={plastar_project_icon}
				alt="logo for the currently opened project"
				width="32"
				height="32"
				loading="lazy"
				decoding="async"
				draggable="false" />
			Mecha Soldier PLASTAR
	</h2>

	<div slot="description" class="mod-description-points">
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
<Modal bind:showModal modalID={96} returnToURL="/#other-mods">
	<h2 slot="header" class="header-slot">
			<img
				class="project-logo"
				src={kreebles_project_icon}
				alt="logo for the currently opened project"
				width="32"
				height="32"
				loading="lazy"
				decoding="async"
				draggable="false" />
			Kreebles
	</h2>

	<div slot="description" class="mod-description-points">
		<ul>
			<li>This mod was made for SpookyJam 2024</li>
			<li>Mining stone & deepslate can sometimes yield more than you bargained for.</li>
			<li>Kreebles jump out of broken rocks and attack any prey they can see.</li>
			<li>Bearing the dastardly talisman, a rare drop from kreebles, will make them freeze in fear.</li>
		</ul>
	</div>

	<div class="info-slot" slot="info">
		<span class="modal-link modrinth">
			<SimpleIconsModrinth />
			<a href="https://modrinth.com/mod/kreebles">Download on Modrinth</a>
		</span>
		<span class="modal-link curseforge">
			<SimpleIconsCurseforge />
			<a href="https://legacy.curseforge.com/minecraft/mc-mods/kreebles"> Download on CurseForge </a>
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
		<VideoPlayer src={kreebles_feature} visible={showModal[96]} disableMuteButton />
	</div>
</Modal>

<!--#region Hook a Duck Modal -->
<Modal bind:showModal modalID={97} returnToURL="/#other-mods">
	<h2 slot="header" class="header-slot">
			<img
				class="project-logo"
				src={hookaduck_project_icon}
				alt="logo for the currently opened project"
				width="32"
				height="32"
				loading="lazy"
				decoding="async"
				draggable="false" />
			Hook a Duck
	</h2>

	<div slot="description" class="mod-description-points">
		<ul>
			<li>This mod was made for Modfest: Carnival in 2024</li>
			<li>Colourful ducks spawn in the rivers of your world.</li>
			<li>Hook them up with a fishing rod to receive tickets and prizes!</li>
			<li>
				For the best experience, try this mod out with the <a href="https://modrinth.com/modpack/modfest-carnival"
					>Modfest Carnival</a> modpack
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
<Modal bind:showModal modalID={98} returnToURL="/#other-mods">
	<h2 slot="header" class="header-slot">
			<img
				class="project-logo"
				src={beef_project_icon}
				alt="logo for the currently opened project"
				width="32"
				height="32"
				loading="lazy"
				decoding="async"
				draggable="false" />
			Beef & Blade
	</h2>

	<div slot="description" class="mod-description-points">
		<ul>
			<li>Beef & Blade is a serverside datapack that lets you prioritize raw beef or leather from cow drops</li>
			<li>Using a sword will yield leather drops</li>
			<li>Using an axe will yield raw beef drops</li>
		</ul>
	</div>

	<div class="info-slot" slot="info">
		<span class="modal-link modrinth">
			<SimpleIconsModrinth />
			<a href="https://modrinth.com/mod/beefandblade">Download on Modrinth</a>
		</span>
		<span class="modal-link curseforge">
			<SimpleIconsCurseforge />
			<a href="https://legacy.curseforge.com/minecraft/mc-mods/beef-blade"> Download on CurseForge </a>
		</span>
		<span class="modal-link github separator-top">
			<SimpleIconsGithub />
			<a href="https://github.com/Khazoda/beef-and-blade">View the GitHub repository</a>
		</span>
	</div>
</Modal>

<!--#region Dwayne The Block Johnson Modal -->
<Modal bind:showModal modalID={99} returnToURL="/#other-mods">
	<h2 slot="header" class="header-slot">
			<img
				class="project-logo"
				src={dwayne_project_icon}
				alt="logo for the currently opened project"
				width="32"
				height="32"
				loading="lazy"
				decoding="async"
				draggable="false" />
			Dwayne 'The Block' Johnson
	</h2>

	<div slot="description" class="mod-description-points">
		<ul>
			<li>Have you ever wanted to place The Block's head in your world? This mod is the solution.</li>
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
			<a href="https://legacy.curseforge.com/minecraft/mc-mods/dwayne-the-block-johnson"> Download on CurseForge </a>
		</span>
		<span class="modal-link github separator-top">
			<SimpleIconsGithub />
			<a href="https://github.com/Khazoda/dwayne-the-block-johnson">View the GitHub repository</a>
		</span>
	</div>
</Modal>

<!--#region ModJam Mods Modal-->
<CenterModal bind:showModal modalID={997} returnToURL="/">
	<h2 slot="header" class="header-slot" style="margin-top: 0;">
		<span>Mod Jam Mods</span>
	</h2>

	<div slot="description">
		<div class="section">
			<div class="mod-grid">
				<button on:click={() => showDialog(96)} use:playAudio type="button" title="Kreebles">
					<img src={kreebles_icon} alt="Kreebles" draggable="false" />
					<span class="mod-label">Kreebles</span>
				</button>
				<button on:click={() => showDialog(93)} use:playAudio type="button" title="Helpful Campfires">
					<img src={helpfulcampfires_icon} alt="Helpful Campfires" draggable="false" />
					<span class="mod-label">Helpful Campfires</span>
				</button>
			</div>
		</div>
	</div>
</CenterModal>

<!--#region Collaborations Modal -->
<CenterModal bind:showModal modalID={998} returnToURL="/">
	<h2 slot="header" class="header-slot" style="margin-top: 0;">
		<span>Collaborations</span>
	</h2>

	<div slot="description">
		<div class="section">
			<div class="mod-grid">
				<button on:click={() => showDialog(95)} use:playAudio type="button" title="Mecha Soldier PLASTAR">
					<img src={plastar_icon} alt="Mecha Soldier PLASTAR" draggable="false" />
					<span class="mod-label">PLASTAR</span>
				</button>
				<button on:click={() => showDialog(97)} use:playAudio type="button" title="Hook a Duck">
					<img src={hookaduck_icon} alt="Hook a Duck" draggable="false" />
					<span class="mod-label">Hook a Duck</span>
				</button>
			</div>
		</div>
	</div>
</CenterModal>

<!-- #region Other Mods Modal -->
<CenterModal bind:showModal modalID={999} returnToURL="/">
	<h2 slot="header" class="header-slot" style="margin-top: 0;">
		<span>Other Mods</span>
	</h2>

	<div slot="description">
		<div class="section">
			<div class="mod-grid">
				<button on:click={() => showDialog(98)} use:playAudio type="button" title="Beef & Blade">
					<img src={beef_icon} alt="Beef & Blade" draggable="false" />
					<span class="mod-label">Beef & Blade</span>
				</button>
				<button on:click={() => showDialog(99)} use:playAudio type="button" title="Dwayne 'The Block' Johnson">
					<img src={dwayne_icon} alt="Dwayne 'The Block' Johnson" draggable="false" />
					<span class="mod-label">Dwayne</span>
				</button>
			</div>
		</div>
	</div>
</CenterModal>

<!-- #region Settings Modal -->
<CenterModal bind:showModal modalID={1000} returnToURL="/">
	<h2 slot="header" class="header-slot" style="margin-top: 0;">
		<span>User Preferences</span>
	</h2>

	<div slot="description" class="settings-modal">
		<div class="section">
			<span class="section-title">Audio</span>
			<div class="audio-section">
				<label for="audio-volume">Play Sounds</label>
				<input
					type="checkbox"
					id="audio-volume"
					bind:checked={audioEnabled}
					on:change={e => toggleAudioEnabled(e.currentTarget)} />
			</div>
		</div>

		<div class="section bottom-section">
			<button
				style="min-width: 150px; display: flex; align-items: center; justify-content: center;"
				on:click={e => {
					localStorage.clear();
					window.location.reload();
				}}
				on:mouseenter={e => (e.currentTarget.textContent = "Are you Sure?")}
				on:mouseleave={e => (e.currentTarget.textContent = "Reset Preferences")}>Reset Preferences</button>
		</div>
	</div>
</CenterModal>

<!-- #region CSS-->
<style lang="scss">
	:root {
		--color-text-primary: #e2e2e2;
		--color-text-secondary: #aaaaaa;
		--color-background-dark: #2c2c2c;
		--color-background-darker: #141414;
		--color-island-background-outer: #2b2b2b;
		--color-island-background-inner: #454545;
		--color-link: rgb(128, 215, 255);
		--color-link-muted: rgb(149, 187, 204);
		--color-link-modrinth: rgb(128, 255, 160);
		--color-link-curseforge: rgb(255, 158, 94);
		--color-link-generic: rgb(197, 209, 222);
		--color-link-youtube: rgb(255, 92, 113);
	}

	:global(html) {
		scrollbar-gutter: unset;
	}

	.page-container {
		display: flex;
		position: static;
		flex-direction: column;
		align-items: center;
		justify-content: space-between;
		width: 100%;
		height: auto;
		min-height: calc(100dvh - 16px);
	}

	//#region Island
	.island-section {
		contain: layout size;
		display: flex;
		position: relative;
		flex-direction: column;
		align-items: center;
		justify-content: flex-start;
		width: 100%;
		height: 128px;
		min-height: 128px;
		padding: 1rem;
		gap: 0.5rem;

		@media screen and (max-width: 575px) {
			contain: none;
			z-index: 1000;
			position: fixed;
			top: 50%;
			right: 0;
			right: env(safe-area-inset-right, 0);
			align-items: flex-end;
			width: 96px;
			height: auto;
			/* Dynamic viewport height calculations*/
			max-height: calc(100vh - 2rem);
			max-height: calc(100dvh - env(safe-area-inset-top, 0) - env(safe-area-inset-bottom, 0));
			padding: 8px;
			transform: translateY(-50%);
		}

		.island {
			z-index: 1;
			width: min(100%, 700px);
			height: 80px;
			padding: 8px;
			border-radius: 80px;
			background-color: var(--color-island-background-outer);
			box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.3);

			@media screen and (max-width: 575px) {
				position: relative;
				width: 80px;
				/* Dynamic viewport height calculations*/
				height: min(calc(100vh - 4rem), 700px);
				height: min(calc(100dvh - env(safe-area-inset-top, 0) - env(safe-area-inset-bottom, 0) - 2rem), 700px);
				min-height: 200px;
			}

			.generic-island-flex-container {
				display: flex;
				flex-direction: row;
				align-items: center;
				justify-content: center;
				gap: 16px;

				@media screen and (max-width: 575px) {
					flex-direction: column;
					gap: 8px;
				}
			}
			.island-content {
				width: 100%;
				height: 100%;
				padding: 0 6px;
				border-radius: 72px;
				background: var(--color-island-background-inner);

				@media screen and (max-width: 575px) {
					flex-direction: column;
					height: 100%;
					padding: 8px 0 8px 0;
					overflow: hidden;
				}

				.island-left {
					flex: 0 0 auto;
					justify-content: flex-start;
					span:not(.inert) {
						border: 2px solid rgb(35, 35, 35);
					}
					span::after {
						background: linear-gradient(145deg, rgba(255, 255, 255, 0.8), transparent 50%);
					}
				}

				.island-center {
					flex: 1 1 auto;
					justify-content: space-between;

					.island-center-left {
						flex: 0 0 auto;
						gap: 8px;
						.element {
							outline: 2px solid rgb(35, 35, 35);
						}
					}
					.island-center-right {
						flex: 0 0 auto;
						max-width: 250px;
						overflow-x: auto;
						gap: 8px;
					}
				}

				.island-right {
					flex: 0 0 auto;
					justify-content: flex-end;
					span::after {
						background: linear-gradient(145deg, rgba(150, 150, 150, 0.5), transparent 50%);
					}
				}

				.vertical-spacer {
					width: 3px;
					height: 20px;
					background: var(--color-background-dark);
					pointer-events: none;

					@media screen and (max-width: 575px) {
						width: 20px;
						height: 3px;
					}
				}

				.element {
					display: flex;
					position: relative;
					flex-shrink: 0;
					align-items: center;
					justify-content: center;
					width: 52px;
					height: 52px;
					overflow: hidden;
					background: linear-gradient(145deg, rgba(40, 40, 40, 0.9), rgba(28, 28, 28, 0.9));
					box-shadow:
						0 2px 4px rgba(0, 0, 0, 0.2),
						inset 0 1px 1px rgba(255, 255, 255, 0.1),
						inset 0 -1px 1px rgba(0, 0, 0, 0.1);
					transition:
						background 0.2s ease,
						box-shadow 0.2s ease,
						transform 0.2s ease;

					&::after {
						position: absolute;
						width: 150%;
						height: 150%;
						inset: -25%;
						transform: translateX(-100%);
						background: linear-gradient(145deg, rgba(255, 255, 255, 0.3), transparent 50%);
						content: "";
						pointer-events: none;
						transition: transform 0.4s cubic-bezier(0.23, 1, 0.32, 1);
					}

					&:hover {
						transform: translateY(-1px);
						background: linear-gradient(145deg, rgba(45, 45, 45, 0.9), rgba(32, 32, 32, 0.9));
						box-shadow:
							0 4px 8px rgba(0, 0, 0, 0.3),
							inset 0 1px 1px rgba(255, 255, 255, 0.15),
							inset 0 -1px 1px rgba(0, 0, 0, 0.1);
						cursor: pointer;
					}

					a:focus {
						outline: none;
					}
					&:focus-within {
						outline: none;
					}
					&:has(a:focus-visible),
					&:has(button:focus-visible) {
						outline: solid 2px rgba(100, 200, 255, 0.8);
					}
					&:hover::after,
					&:focus-within::after {
						transform: translateX(100%);
					}
					&:active {
						background: linear-gradient(145deg, rgba(35, 35, 35, 0.9), rgba(25, 25, 25, 0.9));
						box-shadow:
							0 1px 2px rgba(0, 0, 0, 0.2),
							inset 0 1px 1px rgba(255, 255, 255, 0.05),
							inset 0 -1px 1px rgba(0, 0, 0, 0.1);
					}
					a,
					button {
						all: unset;
						display: flex;
						align-items: center;
						justify-content: center;
						width: 100%;
						height: 100%;
					}
					&.settings-button {
						border: 1px solid rgb(50, 50, 50);
						background: none;
					}

					&.circquare-left {
						border-radius: 100% 8px 8px 100%;
						@media screen and (max-width: 575px) {
							border-radius: 100% 100% 8px 8px;
						}
					}
					&.circquare-right {
						border-radius: 8px 100% 100% 8px;
						@media screen and (max-width: 575px) {
							border-radius: 8px 8px 100% 100%;
						}
					}
				}

				.element.inert {
					background: none;
					box-shadow: none;
					cursor: default;
					pointer-events: visibleStroke;
					&:hover {
						transform: none;
						box-shadow: none;
					}
					&::after {
						display: none;
						content: none;
					}
				}
			}
		}

		.dynamic-label {
			z-index: 0;
			position: absolute;
			inset: auto;
			bottom: -0.5rem;
			padding: 1rem 1.5rem 0.5rem 1.5rem;
			border-radius: 0 0 12px 12px;
			background: var(--color-background-dark);
			box-shadow: 0px 0px 6px 4px rgb(28, 28, 28);

			@media screen and (max-width: 575px) {
				display: none;
			}
		}
	}

	//#region Projects
	.projects-section {
		display: flex;
		row-gap: 2rem;
		flex-wrap: wrap;
		justify-content: center;
		min-width: 192px;
		padding: 2rem;

		/* Ensure 3 items per row on desktop */
		@media screen and (min-width: 576px) {
			max-width: calc(3 * 256px + 4rem);
		}
		margin-inline: auto;

		@media screen and (max-width: 575px) {
			flex-direction: column;
			max-width: 100%;
			padding: 2rem calc(2rem + 96px) 2rem 2rem;
		}

		li {
			display: flex;
			position: relative;
			justify-content: center;
			list-style: none;

			@media screen and (min-width: 576px) {
				flex: 1 1 256px;
				min-width: 256px;
				max-width: calc(100% / 3);
			}

			&:nth-child(1) {
				--float-duration: 3.2s;
				--float-delay: 0s;
				top: 1rem;
			}
			&:nth-child(2) {
				--float-duration: 2.8s;
				--float-delay: 0.3s;
				top: -1rem;
			}
			&:nth-child(3) {
				--float-duration: 3.4s;
				--float-delay: 0.7s;
				top: 1rem;
			}
			&:nth-child(4) {
				--float-duration: 3s;
				--float-delay: 0.1s;
				top: -1rem;
			}
			&:nth-child(5) {
				--float-duration: 3.6s;
				--float-delay: 0.5s;
				top: 1rem;
			}

			&::after {
				z-index: -1;
				position: absolute;
				bottom: -10px;
				left: 50%;
				width: 80%;
				height: 35px;
				transform: translateX(-50%);
				border-radius: 50%;
				background: radial-gradient(ellipse at center, rgba(5, 5, 5, 0.25) 0%, rgba(5, 5, 5, 0) 90%);
				content: "";
				animation: shadowPulse var(--float-duration, 3s) ease-in-out infinite;
				animation-delay: var(--float-delay, 0s);
				opacity: 0;
			}

			&:hover::after {
				animation-play-state: paused;
			}
		}

		button {
			position: relative;
			margin: 0;
			padding: 0;
			border: none;
			background: none;
			animation: float var(--float-duration, 3s) ease-in-out infinite;
			animation-delay: var(--float-delay, 0s);
			cursor: pointer;
			transition: scale 0.2s cubic-bezier(0.165, 0.84, 0.44, 1);
			will-change: transform, scale;

			&:hover {
				scale: 1.05;
				animation-play-state: paused;
			}

			&:active {
				scale: 0.95;
			}
			@media screen and (max-width: 575px) {
				animation: none;
			}
		}

		img {
			width: 256px;
			height: 256px;
			border-radius: 24px;

			@media screen and (max-width: 575px) {
				width: 192px;
				height: 192px;
			}
		}

		@keyframes float {
			0% {
				transform: translateY(0);
			}
			50% {
				transform: translateY(10px);
			}
			100% {
				transform: translateY(0);
			}
		}

		@keyframes shadowPulse {
			0% {
				transform: translateX(-50%) scale(1);
				opacity: 0.1;
			}
			50% {
				transform: translateX(-50%) scale(0.95);
				opacity: 1;
			}
			100% {
				transform: translateX(-50%) scale(1);
				opacity: 0.1;
			}
		}
	}

	//#region Footer
	.footer-section {
		display: flex;
		flex-direction: column;
		justify-content: flex-end;
		height: 128px;
		gap: 0.5rem;
		a {
			color: unset;
		}
		.socials-container {
			display: flex;
			flex-direction: row;
			justify-content: center;
			gap: 1rem;
			color: rgb(125, 125, 125);
			a {
				display: inline-flex;
				align-items: center;
				justify-content: center;
				padding: 0.5rem;
				border-radius: 8px;
				background: #2a2a2a;
				&:hover {
					background: #3a3a3a;
					text-decoration: none;
					&.bluesky {
						color: #0085ff;
					}
					&.discord {
						color: #5865f2;
					}
				}
			}
		}
		.copyright {
			color: rgb(75, 75, 75);
		}
	}

	//#region Modal Styles
	.header-slot {
		display: inline-flex;
		position: relative;

		flex-direction: row;
		flex-wrap:nowrap;
		align-items: center;
		justify-content: center;
		height: 2rem;
		width: 100%;
		margin-top: 0;
		gap: 0.5rem;
		line-height: 2rem;
		text-wrap: pretty;
		img {
			max-width: 100%;
			max-height: 70px;
			height: auto;
			width: auto;
			object-fit: contain;
		}
		.mod-description-link-button {
			box-sizing: content-box;
			display: flex;
			position: absolute;
			top: 1.5rem;
			left: 1.5rem;
			align-items: center;
			justify-content: center;
			aspect-ratio: 1;
			width: 40px;
			height: 40px;
			margin: 0;
			margin-left: auto;
			padding: 0;
			border: none;
			border-radius: 0.5rem;
			background: #383838;
			color: #ffffff;
			font-size: x-large;
			line-height: 1;
			&:hover {
				background: #484848;
			}
			@media screen and (max-width: 1000px) {
				right: 1.5rem;
				left: unset;
			}
		}
	}
	ul {
		padding-left: 1.5rem;
	}
	.info-slot {
		display: flex;
		flex-direction: column;
		margin: 1rem 0;
		gap: 0.5rem;
	}

	.mod-description-points {
		ul {
			margin: 0;
		}

	}

	.feature-slot {
		display: inline-flex;
		position: relative;
		max-width: 500px;
		margin-top: 1rem;
		padding: 12px;
		overflow: hidden;
		border: 1px solid rgba(255, 255, 255, 0.05);
		border-radius: 10px;
		background-color: #141414;
		box-shadow:
			inset 0 2px 4px rgba(0, 0, 0, 0.3),
			inset 0 -1px 1px rgba(255, 255, 255, 0.05);
		&::before {
			position: absolute;
			top: -2px;
			right: -2px;
			bottom: -2px;
			left: -2px;
			border-radius: 10px; /* Slightly larger than the container */
			background-image:
				linear-gradient(to right, rgba(255, 255, 255, 0.05) 1px, transparent 1px),
				linear-gradient(to bottom, rgba(255, 255, 255, 0.05) 1px, transparent 1px);
			background-position: 0 0;
			background-size: 17.5px 17.5px; /* 350px / 20 = 17.5px */
			content: "";
			pointer-events: none;
		}
		&::after {
			position: absolute;
			top: 0;
			right: 0;
			bottom: 0;
			left: 0;
			border-radius: 8px;
			background: linear-gradient(to bottom, rgba(255, 255, 255, 0.02) 0%, rgba(0, 0, 0, 0.02) 100%);
			content: "";
		}
		img,
		video {
			z-index: 1;
			position: relative;
			width: 100%;
			object-fit: scale-down;
			border-radius: 8px;
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
		font-size: large;
		line-height: 1.5rem;
		text-decoration: none;

		&.separator-top {
			margin-top: 0.5rem;
			padding-top: 1rem;
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
			&.disabled {
				display: none;
				color: var(--color-text-secondary);
				pointer-events: none;
			}
		}
		a {
			color: inherit;
			text-decoration: inherit;
			&:hover {
				text-decoration: underline;
			}
		}
	}
	.settings-modal {
		font-family: Lexend, system-ui;

		.audio-section {
			display: flex;
			flex-direction: row;
			align-items: center;
			gap: 0.5rem;

			label {
				cursor: pointer;
			}

			input[type="checkbox"] {
				appearance: none;
				position: relative;
				width: 40px;
				height: 24px;
				border-radius: 4px;
				background: var(--color-background-dark);
				cursor: pointer;
				transition: 0.2s;

				&:checked {
					background: rgb(30, 171, 84);
				}

				&::before {
					position: absolute;
					top: 4px;
					left: 4px;
					width: 16px;
					height: 16px;
					border-radius: 2px;
					background: var(--color-text-primary);
					content: "";
					transition: 0.2s;
				}

				&:checked::before {
					left: 20px;
				}
			}
		}
		.bottom-section {
			margin: 0;
			margin-top: auto;
			button {
				all: unset;
				padding: 0.75rem 1.5rem;
				border-radius: 8px;
				background: rgb(200, 50, 50);
				color: var(--color-text-primary);
				cursor: pointer;
				transition: transform 0.1s;

				&:hover {
					transform: translateY(-1px);
					background: rgb(220, 60, 60);
				}

				&:active {
					transform: translateY(1px);
					background: rgb(180, 40, 40);
				}
			}
		}
	}

	//#region Other Styles
	.top-left-container {
		z-index: 1000;
		position: fixed;
		top: 1rem;
		left: 1rem;
		align-items: flex-start;
		padding: 0.5rem;
		gap: 0.5rem;
		color: rgb(32, 222, 255);
		font-weight: 800;
		font-size: 0.8rem;
		font-family: Quicksand, sans-serif;

		img {
			width: auto;
			height: 3rem;
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
		display: flex;
		z-index: 1000;
		position: fixed;
		top: 1rem;
		right: 1rem;
		flex-direction: row;
		gap: 0.5rem;
	}
	.square-btn {
		display: flex;
		align-items: center;
		justify-content: center;
		margin: 0;
		padding: 0;
		padding: 0.4rem;
		border: none;
		border-radius: 25%;
		background: none;
		background-color: rgba(44, 44, 44, 0.7);
		color: var(--color-text-secondary);
		font-size: 1.3rem;
		cursor: pointer;
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

	//#region Other Mods Modal
	.section {
		margin: 3rem 0;

		&:first-child {
			margin-top: 1.5rem;
		}

		.section-title {
			display: block;
			margin-bottom: 1rem;
			color: var(--color-text-secondary);
			font-weight: 500;
			font-size: 0.9rem;
			font-family: Lexend, system-ui;
			letter-spacing: 0.05em;
			text-transform: uppercase;
		}

		.mod-grid {
			display: flex;
			gap: 1rem;

			button {
				display: flex;
				position: relative;
				flex-direction: column;
				align-items: center;
				justify-content: center;
				aspect-ratio: 1;
				max-width: 128px;
				padding: 0.5rem;
				border: none;
				border-radius: 12px;
				background: linear-gradient(to bottom, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.02));
				box-shadow:
					0 2px 4px rgba(0, 0, 0, 0.2),
					inset 0 1px rgba(255, 255, 255, 0.1);
				transition: all 0.2s ease;

				img {
					width: 100%;
					height: 100%;
					object-fit: contain;
					border-radius: 7px;
					transition: transform 0.2s ease;
				}

				.mod-label {
					position: absolute;
					bottom: -1.25rem;
					margin-top: 0.5rem;
					color: var(--color-text-secondary);
					font-size: 0.8rem;
					font-family: Lexend, system-ui;
					letter-spacing: 0.02em;
					opacity: 0.8;
					pointer-events: none;
					transition: opacity 0.2s ease;
				}

				&:hover {
					background: linear-gradient(to bottom, rgba(255, 255, 255, 0.07), rgba(255, 255, 255, 0.03));

					img {
						transform: scale(1.1);
					}

					.mod-label {
						color: var(--color-text-primary);
						opacity: 1;
					}
				}

				&:active {
					transform: translateY(1px);
					box-shadow:
						0 1px 2px rgba(0, 0, 0, 0.2),
						inset 0 1px rgba(255, 255, 255, 0.1);
				}
			}
		}
	}
</style>

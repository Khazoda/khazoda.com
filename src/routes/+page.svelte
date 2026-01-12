<script lang="ts">
	// Site Exclusive Icons
	import beef_icon from "$lib/media/mod_icons/beef_project_icon_simple.webp";
	import dwayne_icon from "$lib/media/mod_icons/dwayne_project_icon_simple.webp";
	import hookaduck_icon from "$lib/media/mod_icons/hookaduck_project_icon_simple.webp";
	import kreebles_icon from "$lib/media/mod_icons/kreebles_project_icon_simple.webp";
	import plastar_icon from "$lib/media/mod_icons/plastar_project_icon_simple.webp";
	import helpfulcampfires_icon from "$lib/media/mod_icons/helpfulcampfires_project_icon_simple.webp";

	import hytale_icon from "$lib/media/island_icons/hytale_icon.webp";
	import more_mods_icon from "$lib/media/island_icons/more_mods_icon.webp";
	import version_icon from "$lib/media/island_icons/version_icon.webp";

	import { mainProjects, otherMods } from "./project_modals";

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
	import IconoirPlanetSat from "virtual:icons/iconoir/planet-sat";
	import IconoirLensPlus from "virtual:icons/iconoir/lens-plus";
	import PixelarticonsSliders2 from "virtual:icons/pixelarticons/sliders-2";
	import PixelArticonsUsers from "virtual:icons/pixelarticons/users";

	import { onMount } from "svelte";
	import { replaceState, goto } from "$app/navigation";
	import { page } from "$app/stores";

	import { fly } from "svelte/transition";
	import { cubicInOut } from "svelte/easing";
	import CenterModal from "src/components/CenterModal.svelte";
	import VideoPlayer from "src/components/VideoPlayer.svelte";

	let activeModal: string | null = null;
	$: currentlyHovered = "";

	const validHashes = [
		"plushables",
		"basicweapons",
		"bronze",
		"basicstorage",
		"breakerplacer",
		"helpfulcampfires",
		"heirlooms",
		"plastar",
		"kreebles",
		"hookaduck",
		"beefandblade",
		"dwayne",
		"settings",
		"more-mods",
		"hytale-mods"
	];

	const showDialog = (modalID: string) => {
		activeModal = modalID;
		document.getElementsByTagName("body")[0].style.overscrollBehavior = "none";

		// Add the hash to the URL when the modal is opened
		if (validHashes.includes(modalID)) {
			replaceState($page.url.origin + "#" + modalID, {});
		}
	};

	let audioEnabled = true;
	let hintsEnabled = true;
	enum RegisteredAudio {
		Click = "click-sound",
		AudioActivated = "audio-activated-sound"
	}

	onMount(() => {
		const storedPreference = localStorage.getItem("audioEnabled");
		if (storedPreference !== null) {
			audioEnabled = storedPreference === "true";
		}

		const storedHintsPreference = localStorage.getItem("hintsEnabled");
		if (storedHintsPreference !== null) {
			hintsEnabled = storedHintsPreference === "true";
		}
		// Add event listeners
		window.addEventListener("keydown", handleKeydown);

		// setTimeout in order to delay and allow document root to be hydrated
		setTimeout(() => {
			const hash = $page.url.hash.replace("#", "");
			if (hash && validHashes.includes(hash)) {
				showDialog(hash);
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

	function toggleHintsEnabled(node: HTMLElement) {
		localStorage.setItem("hintsEnabled", hintsEnabled.toString());
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

<!-- HTML -->
<svelte:head>
	<meta http-equiv="X-UA-Compatible" content="ie=edge" />
	<title>Khazoda's Mods</title>
</svelte:head>
<div class="page-container">
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
						<span class="element squircle hytale-color-background">
							<button
								use:handleHover={["Swap to Hytale Mods", true]}
								on:click={() => showDialog("hytale-mods")}
								aria-label="Swap to Hytale Mods">
								<img src={hytale_icon} alt="Hytale Mods" width="42" draggable="false" />
							</button>
						</span>
						<div class="vertical-spacer"></div>
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
								use:handleHover={["More Mods", true]}
								on:click={() => showDialog("more-mods")}
								aria-label="More Mods">
								<img src={more_mods_icon} alt="More Mods" width="42" draggable="false" />
							</button>
						</span>
						<div class="vertical-spacer"></div>
						<span class="element squircle">
							<a
								href="/versions"
								use:handleHover={["Version Information Table", false]}
								aria-label="Version Information Table">
								<img src={version_icon} alt="Version Information Table" width="42" draggable="false" />
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
							on:click={() => showDialog("settings")}
							aria-label="Settings"
							use:handleHover={["🔧 Change Preferences", true]}>
							<PixelarticonsSliders2 width="32" height="32" />
						</button>
					</span>
				</div>
			</span>
		</div>
	</div>
	<!-- Main Projects -->
	<ul class="projects-section">
		{#each mainProjects as project}
			<li>
				<button
					use:handleHover={[project.name, true]}
					on:click={() => showDialog(project.id)}
					type="button"
					title={project.name}
					tabindex="0">
					<img src={project.image} alt={project.name} width="512" draggable="false" class="ms-edge-imgfix" />
				</button>
			</li>
		{/each}
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
{#each mainProjects as project}
	<Modal
		bind:activeModal
		{hintsEnabled}
		modalID={project.id}
		learnMoreURL={project.learnMoreURL}
		modIcon={project.platformIcon}
		bskyURL={project.bskyURL}>
		<h2 slot="header" class="header-slot">
			<img src={project.titleImage} alt={project.name} loading="lazy" decoding="async" draggable="false" />
		</h2>

		<div slot="description">
			<div class="mod-description-points">
				<ul>
					{#each project.description as point}
						<li>{point}</li>
					{/each}
				</ul>
			</div>
			{#if project.featureSection}
				<div class="structured-feature-section">
					<h3>{project.featureSection.title}</h3>
					{#each project.featureSection.description as line}
						<p>{line}</p>
					{/each}
					<br />
					{#each project.featureSection.links as link}
						<span class="modal-link info {link.separator ? 'margin-top-2' : ''}">
							{#if link.type === "planet"}<IconoirPlanetSat />
							{:else if link.type === "lens"}<IconoirLensPlus />
							{/if}
							<a href={link.url}>{link.label}</a>
						</span>
					{/each}
				</div>
			{/if}
		</div>

		<div slot="info" class="info-slot">
			{#each project.links as link}
				<span class="modal-link {link.type} {link.separator ? 'separator-top' : ''} {link.disabled ? 'disabled' : ''}">
					{#if link.type === "modrinth"}<SimpleIconsModrinth />
					{:else if link.type === "curseforge"}<SimpleIconsCurseforge />
					{:else if link.type === "youtube"}<SimpleIconsYoutube />
					{:else if link.type === "github"}<SimpleIconsGithub />
					{:else if link.type === "wiki"}<SimpleIconsBookstack />
					{/if}
					<a href={link.url}>{link.label}</a>
				</span>
			{/each}
		</div>

		<div slot="feature" class={project.featureVideo ? "feature-slot" : ""}>
			{#if project.featureVideo}
				<VideoPlayer src={project.featureVideo} visible={activeModal === project.id} disableMuteButton />
			{/if}
		</div>
	</Modal>
{/each}

{#each otherMods as project}
	<Modal bind:activeModal {hintsEnabled} modalID={project.id} returnToURL="/#more-mods" modIcon={project.platformIcon}>
		<h2 slot="header" class="header-slot">
			<img
				class="project-logo"
				src={project.platformIcon}
				alt={project.name}
				width="32"
				height="32"
				loading="lazy"
				decoding="async"
				draggable="false" />
			{project.name}
		</h2>

		<div slot="description">
			<div class="mod-description-points">
				<ul>
					{#each project.description as point}
						<li>{point}</li>
					{/each}
					{#if project.collabText}
						<p class="collabtext">
							<PixelArticonsUsers />
							This project was a collaboration with
							{#each project.collabLinks || [] as collab, i}
								<a href={collab.url}>{collab.name}</a>{i < (project.collabLinks?.length || 0) - 1 ? ", " : ""}
							{/each}.
						</p>
					{/if}
				</ul>
			</div>
			{#if project.featureSection}
				<div class="structured-feature-section">
					<h3>{project.featureSection.title}</h3>
					{#each project.featureSection.description as line}
						<p>{line}</p>
					{/each}
					<br />
					{#each project.featureSection.links as link}
						<span class="modal-link info {link.separator ? 'margin-top-2' : ''}">
							{#if link.type === "planet"}<IconoirPlanetSat />
							{:else if link.type === "lens"}<IconoirLensPlus />
							{/if}
							<a href={link.url}>{link.label}</a>
						</span>
					{/each}
				</div>
			{/if}
		</div>

		<div slot="info" class="info-slot">
			{#each project.links as link}
				<span class="modal-link {link.type} {link.separator ? 'separator-top' : ''} {link.disabled ? 'disabled' : ''}">
					{#if link.type === "modrinth"}<SimpleIconsModrinth />
					{:else if link.type === "curseforge"}<SimpleIconsCurseforge />
					{:else if link.type === "youtube"}<SimpleIconsYoutube />
					{:else if link.type === "github"}<SimpleIconsGithub />
					{:else if link.type === "wiki"}<SimpleIconsBookstack />
					{/if}
					<a href={link.url}>{link.label}</a>
				</span>
			{/each}
		</div>

		<div slot="feature" class={project.featureVideo ? "feature-slot" : ""}>
			{#if project.featureVideo}
				<VideoPlayer src={project.featureVideo} visible={activeModal === project.id} disableMuteButton />
			{/if}
		</div>
	</Modal>
{/each}

<!-- More Mods Modal -->
<CenterModal bind:activeModal modalID="more-mods" returnToURL="/">
	<h2 slot="header" class="header-slot" style="margin-top: 0;">
		<span>More Mods</span>
	</h2>

	<div slot="description">
		<div class="section">
			<h3>Mod Jam Mods</h3>
			<div class="mod-grid">
				<button on:click={() => showDialog("kreebles")} use:playAudio type="button" title="Kreebles">
					<img src={kreebles_icon} alt="Kreebles" draggable="false" />
					<span class="mod-label">Kreebles</span>
				</button>
				<button on:click={() => showDialog("helpfulcampfires")} use:playAudio type="button" title="Helpful Campfires">
					<img src={helpfulcampfires_icon} alt="Helpful Campfires" draggable="false" />
					<span class="mod-label">Helpful Campfires</span>
				</button>
			</div>
		</div>

		<div class="section">
			<h3>Collaborations</h3>
			<div class="mod-grid">
				<button on:click={() => showDialog("plastar")} use:playAudio type="button" title="Mecha Soldier PLASTAR">
					<img src={plastar_icon} alt="Mecha Soldier PLASTAR" draggable="false" />
					<span class="mod-label">PLASTAR</span>
				</button>
				<button on:click={() => showDialog("hookaduck")} use:playAudio type="button" title="Hook a Duck">
					<img src={hookaduck_icon} alt="Hook a Duck" draggable="false" />
					<span class="mod-label">Hook a Duck</span>
				</button>
			</div>
		</div>

		<div class="section">
			<h3>Other Mods</h3>
			<div class="mod-grid">
				<button on:click={() => showDialog("beefandblade")} use:playAudio type="button" title="Beef & Blade">
					<img src={beef_icon} alt="Beef & Blade" draggable="false" />
					<span class="mod-label">Beef & Blade</span>
				</button>
				<button on:click={() => showDialog("dwayne")} use:playAudio type="button" title="Dwayne 'The Block' Johnson">
					<img src={dwayne_icon} alt="Dwayne 'The Block' Johnson" draggable="false" />
					<span class="mod-label">Dwayne</span>
				</button>
			</div>
		</div>
	</div>
</CenterModal>

<!-- Settings Modal -->
<CenterModal bind:activeModal modalID="settings" returnToURL="/">
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

		<div class="section">
			<span class="section-title">Visual</span>
			<div class="audio-section">
				<label for="hints-toggle">Swipe Hints</label>
				<input
					type="checkbox"
					id="hints-toggle"
					bind:checked={hintsEnabled}
					on:change={e => toggleHintsEnabled(e.currentTarget)} />
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

<!-- CSS -->
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
				gap: 12px;

				@media screen and (max-width: 575px) {
					flex-direction: column;
					gap: 12px;
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
						gap: 12px;
						.element {
							outline: 2px solid rgb(35, 35, 35);
						}
					}
					.island-center-right {
						flex: 0 0 auto;
						max-width: 300px;
						overflow-x: auto;
						gap: 12px;
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
					width: 2px;
					height: 16px;
					border-radius: 2px;
					background: rgba(0, 0, 0, 0.25);
					pointer-events: none;

					@media screen and (max-width: 575px) {
						width: 16px;
						height: 2px;
					}
				}

				.element {
					&.hytale-color-background:hover {
						background: linear-gradient(45deg,#131B27,#284459, #163E24);
					}
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
		flex-wrap: nowrap;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 2rem;
		margin-top: 0;
		gap: 0.5rem;
		line-height: 2rem;
		text-wrap: pretty;
		img {
			width: auto;
			max-width: 100%;
			height: auto;
			max-height: 70px;
			object-fit: contain;
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
		flex-direction: column;
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
	}

	.structured-feature-section {
		display: flex;
		flex-direction: column;
		margin-top: 2rem;
		h3 {
			margin: 0;
			margin-bottom: 0.5rem;
			font-family: Lexend, system-ui;
		}
		p {
			margin: 0;
			color: var(--color-text-secondary);
			font-size: 0.95rem;
			line-height: 1.4;
		}
	}

	@media screen and (max-width: 1000px) {
		.modal-link.wiki {
			margin-bottom: 2rem;
		}
	}
	.margin-top-2 {
		margin-top: 1rem;
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

	@media screen and (max-width: 1000px) {
		.audio-toggle {
			top: 0.5rem;
			right: 0.5rem;
			font-size: 1.1rem;
		}
	}

	.section {
		margin: 3rem 0;

		h3 {
			margin-bottom: 1rem;
		}
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

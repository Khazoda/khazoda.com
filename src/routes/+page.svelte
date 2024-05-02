<script lang="ts">
	import { useSound } from 'svelte-sound';

	import plushables_icon from '$lib/img/plushables_icon.png';
	import basicweapons_icon from '$lib/img/basicweapons_icon.png';
	import bronze_icon from '$lib/img/bronze_icon.png';
	import beef_icon from '$lib/img/beef_icon.png';
	import dwayne_icon from '$lib/img/dwayne_icon.png';

	import profile_icon from '$lib/img/profile.png';

	import btn_press_sound from '$lib/sound/click.mp3';

	import Modal from '../components/Modal.svelte';
	import IconoirTwitter from 'virtual:icons/iconoir/twitter';
	import SimpleIconsModrinth from 'virtual:icons/simple-icons/modrinth';
	import SimpleIconsCurseforge from 'virtual:icons/simple-icons/curseforge';
	import SimpleIconsGithub from 'virtual:icons/simple-icons/github';
	import SimpleIconsYoutube from 'virtual:icons/simple-icons/youtube';
	import SimpleIconsBookstack from 'virtual:icons/simple-icons/bookstack';

	import PlushablesColoured from '../components/PlushablesColoured.svelte';
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';

	let showModal: boolean[] = [];
	$: currentlyHovered = 'Plushables';

	const setModalVisibility = (modalID: number, visible: boolean) => {
		showModal[modalID] = visible;
		document.getElementsByTagName('body')[0].style.overscrollBehavior = 'none';
	};

	// FIXME: Reverse comments on next two lines for production
	const btn_sound = (p0: HTMLButtonElement) => {};
	// const btn_sound = useSound(btn_press_sound, ['click'], { volume: 0.65 });
</script>

<head>
	<meta charset="UTF-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />
	<meta http-equiv="X-UA-Compatible" content="ie=edge" />
	<title>Khazoda's Mods</title>
</head>
<div class="page-container">
	<h1 class="big-title"><img src={profile_icon} alt="" width="128" /> Khazoda's Mods</h1>
	<div class="center-container">
		<span class="hovered-name">{currentlyHovered}</span>
		<ul class="projects-container">
			<li
				on:mouseover={() => (currentlyHovered = 'Plushables')}
				on:focus={() => (currentlyHovered = 'Plushables')}
			>
				<button on:click={() => setModalVisibility(0, true)} use:btn_sound type="button">
					<img src={plushables_icon} alt="" width="512" draggable="false" class="ms-edge-imgfix" />
				</button>
			</li>
			<li
				on:mouseover={() => (currentlyHovered = 'Basic Weapons')}
				on:focus={() => (currentlyHovered = 'Basic Weapons')}
			>
				<button on:click={() => setModalVisibility(1, true)} use:btn_sound type="button">
					<img
						src={basicweapons_icon}
						alt=""
						width="512"
						draggable="false"
						class="ms-edge-imgfix"
					/>
				</button>
			</li>
			<li on:mouseover={() => (currentlyHovered = '?')} on:focus={() => (currentlyHovered = '?')}>
				<button on:click={() => setModalVisibility(2, true)} use:btn_sound type="button">
					<img src={bronze_icon} alt="" width="512" draggable="false" class="ms-edge-imgfix" />
				</button>
			</li>
			<li
				on:mouseover={() => (currentlyHovered = 'Beef & Blade')}
				on:focus={() => (currentlyHovered = 'Beef & Blade')}
			>
				<button on:click={() => setModalVisibility(3, true)} use:btn_sound type="button">
					<img src={beef_icon} alt="" width="512" draggable="false" class="ms-edge-imgfix" />
				</button>
			</li>
			<li
				on:mouseover={() => (currentlyHovered = 'Dwayne "The Block" Johnson')}
				on:focus={() => (currentlyHovered = 'Dwayne "The Block" Johnson')}
			>
				<button on:click={() => setModalVisibility(4, true)} use:btn_sound type="button">
					<img src={dwayne_icon} alt="" width="512" draggable="false" class="ms-edge-imgfix" />
				</button>
			</li>
		</ul>
	</div>

	<footer>
		<a href="https://twitter.com/Khazoda"><IconoirTwitter /></a><span
			>&copy; <a href="https://khazoda.com">khazoda.com</a> 2024</span
		>
	</footer>
</div>
<!-- Plushables Modal -->
<Modal bind:showModal modalID={0}>
	<h2 slot="header" class="header-slot">
		Plushables
		<img
			alt="latest minecraft version"
			src="https://img.shields.io/modrinth/game-versions/plushables?style=flat&label=Latest%20Version&color=%2311B848"
		/>
	</h2>

	<div slot="description" class="definition-list">
		<ul>
			<li>Plushables adds over 40 new plushies to Minecraft.</li>
			<li>
				From cats to dogs to mushroom people, wizards and mammoths - there's a plushie for everyone.
			</li>
			<li>
				Plushables comes with its own unique crafting block and system - fully EMI & REI compatible.
			</li>
			<li>Some plushies have custom sounds, particle effects and even animations!</li>
		</ul>
		<p>
			Want the newest version of Plushables ASAP? Try <PlushablesColoured />
			<span style="font-style:italic;">Lite</span>
			- a leaner version of the mod that gets updated before the main one.
		</p>
	</div>

	<div class="info-slot" slot="info">
		<span class="modal-link modrinth">
			<SimpleIconsModrinth />
			<a href="https://modrinth.com/mod/plushables">Download on Modrinth</a>
			|
			<a href="https://modrinth.com/mod/plushables-lite"
				><span style="font-style: italic;">Lite</span></a
			>
		</span>
		<span class="modal-link curseforge">
			<SimpleIconsCurseforge />
			<a href="https://legacy.curseforge.com/minecraft/mc-mods/plushables">
				Download on CurseForge
			</a>
			|
			<a href="https://legacy.curseforge.com/minecraft/mc-mods/plushables-lite"
				><span style="font-style: italic;">Lite</span></a
			>
		</span>
		<span class="modal-link youtube">
			<SimpleIconsYoutube />
			<a href="https://www.youtube.com/@khazoda/videos">Watch a Showcase</a>
		</span>
		<br />
		<span class="modal-link github">
			<SimpleIconsGithub />
			<a href="https://github.com/Khazoda/Plushables">View the GitHub repository</a>
			|
			<a href="https://github.com/Khazoda/plushables-lite"
				><span style="font-style: italic;">Lite</span></a
			>
		</span>
		<span class="modal-link wiki">
			<SimpleIconsBookstack />
			<a href="https://plushables.khazoda.com/en/latest/">Visit the Wiki</a>
		</span>
	</div>
</Modal>

<!-- Basic Weapons Modal -->
<Modal bind:showModal modalID={1}>
	<h2 slot="header" class="header-slot">
		Basic Weapons
		<img
			alt="latest minecraft version"
			src="https://img.shields.io/modrinth/game-versions/basic-weapons?style=flat&label=Latest%20Version&color=%2311B848"
		/>
	</h2>

	<div slot="description" class="definition-list">
		<ul>
			<li>Basic Weapons adds 5 new vanilla-esque weapon types to Minecraft.</li>
			<li>Each weapon has a distinctly different combat style.</li>
			<li>
				Integration with the <a href="https://modrinth.com/mod/better-combat">Better Combat</a> mod lets
				Basic Weapons really shine.
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
			<a href="https://modrinth.com/mod/basic-weapons">Download on Modrinth</a>
		</span>
		<span class="modal-link curseforge">
			<SimpleIconsCurseforge />
			<a href="https://legacy.curseforge.com/minecraft/mc-mods/basic-weapons">
				Download on CurseForge
			</a>
		</span>
		<span class="modal-link youtube">
			<SimpleIconsYoutube />
			<a href="https://www.youtube.com/@khazoda/videos">Watch a Showcase</a>
		</span>
		<br />
		<span class="modal-link github">
			<SimpleIconsGithub />
			<a href="https://github.com/Khazoda/basic-weapons">View the GitHub repository</a>
		</span>
		<span class="modal-link wiki">
			<SimpleIconsBookstack />
			<a href="https://basicweapons.khazoda.com/en/latest/">Visit the Wiki</a>
		</span>
	</div>
</Modal>

<!-- Beef & Blade Modal -->
<Modal bind:showModal modalID={3}>
	<h2 slot="header" class="header-slot">
		Beef & Blade
		<img
			alt="latest minecraft version"
			src="https://img.shields.io/modrinth/game-versions/beef-and-blade?style=flat&label=Latest%20Version&color=%2311B848"
		/>
	</h2>

	<div slot="description" class="definition-list">
		<ul>
			<li>
				Beef & Blade is a serverside mod that lets you prioritize raw beef or leather from cow drops
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
		<span class="modal-link youtube">
			<SimpleIconsYoutube />
			<a href="https://www.youtube.com/@khazoda/videos">Watch a Showcase</a>
		</span>
		<br />
		<span class="modal-link github">
			<SimpleIconsGithub />
			<a href="https://github.com/Khazoda/beef-and-blade">View the GitHub repository</a>
		</span>
		<span class="modal-link wiki">
			<SimpleIconsBookstack />
			<a href="https://beef-and-blade.khazoda.com/en/latest/">Visit the Wiki</a>
		</span>
	</div>
</Modal>

<!-- Beef & Blade Modal -->
<Modal bind:showModal modalID={4}>
	<h2 slot="header" class="header-slot">
		Dwayne 'The Block' Johnson
		<img
			alt="latest minecraft version"
			src="https://img.shields.io/modrinth/game-versions/dwayne?style=flat&label=Latest%20Version&color=%2311B848"
		/>
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
		<span class="modal-link youtube">
			<SimpleIconsYoutube />
			<a href="https://www.youtube.com/@khazoda/videos">Watch a Showcase</a>
		</span>
		<br />
		<span class="modal-link github">
			<SimpleIconsGithub />
			<a href="https://github.com/Khazoda/dwayne-the-block-johnson">View the GitHub repository</a>
		</span>
		<span class="modal-link wiki">
			<SimpleIconsBookstack />
			<a href="https://dwayne-the-block-johnson.khazoda.com/en/latest/">Visit the Wiki</a>
		</span>
	</div>
</Modal>

<style lang="scss">
	.page-container {
		position: static;
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: center;
	}
	//#region Page Title
	.big-title {
		font-size: 5rem;
		letter-spacing: 0.25rem;
		color: rgb(226, 226, 226);
		font-weight: 800;
		margin-top: 10rem;
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 1rem;

		img {
			opacity: 1;
		}
	}
	// Mobile
	@media screen and (max-width: 1000px) {
		.big-title {
			font-size: 2rem;
			margin-top: 0;
			img {
				max-width: 64px;
			}
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
		top: -2rem;
		font-size: larger;
		background: #2c2c2c;
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
	.center-container:has(ul.projects-container:hover) .hovered-name {
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
		animation: float infinite 5s ease-in-out;
		will-change: transform;
	}
	.projects-container button {
		transition: scale 0.15s ease-out;
		background: none;
		color: inherit;
		border: none;
		padding: 0;
		font: inherit;
		cursor: pointer;
		outline: inherit;
		&:hover {
			scale: 1.05;
		}
		&:active {
			scale: 0.95;
		}
	}

	.projects-container {
		li {
			transition: transform 0.4s ease-out;
		}
		li:nth-child(1) {
			transform: translateX(-400px) translateY(34px) rotate(-10deg);
			animation-delay: 100ms;
			animation-duration: 6s;
		}
		li:nth-child(2) {
			transform: translateX(-200px) translateY(-13px) rotate(-4deg);
			animation-delay: 0ms;
			animation-duration: 4.5s;
		}
		li:nth-child(3) {
			transform: translateX(0px) translateY(4px) rotate(2deg);
			animation-delay: 40ms;
			animation-duration: 5.2s;
		}
		li:nth-child(4) {
			transform: translateX(200px) translateY(-19px) rotate(-3deg);
			animation-delay: 135ms;
			animation-duration: 5.8s;
		}
		li:nth-child(5) {
			transform: translateX(400px) translateY(17px) rotate(6deg);
			animation-delay: 80ms;
			animation-duration: 4.8s;
		}

		@media screen and (max-width: 1000px) {
			li:nth-child(1) {
				transform: translateX(-80px) translateY(-175px) rotate(-10deg);
				animation-delay: 100ms;
				animation-duration: 6s;
			}
			li:nth-child(2) {
				transform: translateX(80px) translateY(-175px) rotate(-4deg);
				animation-delay: 0ms;
				animation-duration: 4.5s;
			}
			li:nth-child(3) {
				transform: translateX(-80px) translateY(0px) rotate(2deg);
				animation-delay: 40ms;
				animation-duration: 5.2s;
			}
			li:nth-child(4) {
				transform: translateX(80px) translateY(0px) rotate(-3deg);
				animation-delay: 135ms;
				animation-duration: 5.8s;
			}
			li:nth-child(5) {
				transform: translateX(-80px) translateY(175px) rotate(6deg);
				animation-delay: 80ms;
				animation-duration: 4.8s;
			}
		}
	}

	@keyframes float {
		0% {
			filter: drop-shadow(0px 20px 10px #141414);
			translate: 0px 0px;
		}
		50% {
			filter: drop-shadow(0px 15px 3px #000000);
			translate: 0px 20px;
		}
		100% {
			filter: drop-shadow(0px 20px 10px #141414);
			translate: 0px 0px;
		}
	}

	footer {
		font-size: x-large;
		color: hsl(0deg, 0%, 25%);
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
		span {
			font-size: small;
			font-family: monospace;
		}
	}
	//#region Modal Styles
	.header-slot {
		display: flex;
		justify-content: space-between;
		align-items: end;
		line-height: 1.2;
		text-wrap: pretty;
		img {
			max-width: 100%;
			height: auto;
		}
	}
	ul {
		padding-left: 1.5rem;
	}
	.info-slot {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	@media screen and (max-width: 1000px) {
		.modal-link.wiki {
			margin-bottom: 2rem;
		}
	}
	a {
		color: rgb(128, 215, 255);
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
		color: rgb(128, 215, 255);
		text-decoration: none;
		line-height: 1.5rem;
		font-size: large;
		&.modrinth {
			color: rgb(128, 255, 160);
		}
		&.curseforge {
			color: rgb(255, 158, 94);
		}
		&.github {
			color: rgb(197, 209, 222);
		}
		&.wiki {
			color: rgb(197, 209, 222);
		}
		&.youtube {
			color: rgb(255, 92, 113);
		}
		a {
			color: inherit;
			text-decoration: inherit;
			&:hover {
				text-decoration: underline;
			}
		}
	}

	//#region Generic Styles
	.flex {
		display: flex;
		&.row {
			flex-direction: row;
		}
		&.col {
			flex-direction: column;
		}
		&.gap-md {
			gap: 0.25rem;
		}
	}
</style>

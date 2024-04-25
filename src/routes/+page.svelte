<script lang="ts">
	import plushables_icon from '$lib/img/plushables_icon.png';
	import basicweapons_icon from '$lib/img/basicweapons_icon.png';
	import beef_icon from '$lib/img/beef_icon.png';
	import dwayne_icon from '$lib/img/dwayne_icon.png';

	import profile_icon from '$lib/img/profile.png';

	import Modal from '../components/Modal.svelte';
	import IconoirTwitter from 'virtual:icons/iconoir/twitter';

	let showModal: boolean[] = [];
	$: currentlyHovered = 'Plushables';
</script>

<div class="page-container">
	<h1 class="big-title">Khazoda's Mods<img src={profile_icon} alt="" width="128" /></h1>
	<div class="center-container">
		<span class="hovered-name">{currentlyHovered}</span>
		<ul class="projects-container">
			<li
				on:mouseover={() => (currentlyHovered = 'Plushables')}
				on:focus={() => (currentlyHovered = 'Plushables')}
			>
				<button on:click={() => (showModal[0] = true)}>
					<img src={plushables_icon} alt="" width="512" draggable="false" />
				</button>
			</li>
			<li
				on:mouseover={() => (currentlyHovered = 'Basic Weapons')}
				on:focus={() => (currentlyHovered = 'Basic WEapons')}
			>
				<button on:click={() => (showModal[1] = true)}>
					<img src={basicweapons_icon} alt="" width="512" draggable="false" />
				</button>
			</li>
			<li
				on:mouseover={() => (currentlyHovered = 'Bronze')}
				on:focus={() => (currentlyHovered = 'Bronze')}
			>
				<button on:click={() => (showModal[2] = true)}>
					<img src={plushables_icon} alt="" width="512" draggable="false" />
				</button>
			</li>
			<li
				on:mouseover={() => (currentlyHovered = 'Beef & Blade')}
				on:focus={() => (currentlyHovered = 'Beef & Blade')}
			>
				<button on:click={() => (showModal[3] = true)}>
					<img src={beef_icon} alt="" width="512" draggable="false" />
				</button>
			</li>
			<li
				on:mouseover={() => (currentlyHovered = 'Dwayne "The Block" Johnson')}
				on:focus={() => (currentlyHovered = 'Dwayne "The Block" Johnson')}
			>
				<button on:click={() => (showModal[4] = true)}>
					<img src={dwayne_icon} alt="" width="512" draggable="false" />
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
	<h2 slot="header">Plushables</h2>

	<ol class="definition-list">
		<li>of or relating to modality in logic</li>
		<li>
			containing provisions as to the mode of procedure or the manner of taking effect —used of a
			contract or legacy
		</li>
		<li>of or relating to a musical mode</li>
		<li>of or relating to structure as opposed to substance</li>
		<li>
			of, relating to, or constituting a grammatical form or category characteristically indicating
			predication
		</li>
		<li>of or relating to a statistical mode</li>
	</ol>

	<a href="https://www.merriam-webster.com/dictionary/modal">Modrinth</a>
</Modal>

<!-- Basic Weapons Modal -->
<Modal bind:showModal modalID={1}>
	<h2 slot="header">Basic Weapons</h2>

	<ol class="definition-list">
		<li>of or relating to modality in logic</li>
		<li>
			containing provisions as to the mode of procedure or the manner of taking effect —used of a
			contract or legacy
		</li>
		<li>of or relating to a musical mode</li>
		<li>of or relating to structure as opposed to substance</li>
		<li>
			of, relating to, or constituting a grammatical form or category characteristically indicating
			predication
		</li>
		<li>of or relating to a statistical mode</li>
	</ol>

	<a href="https://www.merriam-webster.com/dictionary/modal">Modrinth</a>
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
	.big-title {
		font-size: 5rem;
		letter-spacing: 0.25rem;
		color: rgb(226, 226, 226);
		font-weight: 800;
		margin-top: 10rem;
		img {
			position: absolute;
			left: 50%;
			top: 2.5rem;
			transform: translateX(-50%);
			z-index: -1;
			opacity: 0.5;
		}
	}
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
		transition: opacity 0.1s ease;
	}
	.center-container:has(ul.projects-container:hover) .hovered-name {
		opacity: 1;
	}

	.projects-container {
		position: relative;
		width: 256px;
		height: 256px;
		list-style-type: none;
		margin: 0;
		padding: 0;
	}

	.projects-container li {
		user-select: none;
		position: absolute;
		inset: 0;
		animation: float infinite 5s ease-in-out;
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
	}

	.projects-container {
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
</style>

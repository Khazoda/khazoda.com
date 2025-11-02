<script lang="ts">
	import HugeiconsArchive02 from "virtual:icons/hugeicons/archive-02";
	import CenterModal from "src/components/CenterModal.svelte";
	import { closeDialog } from "src/components/CenterModal.svelte";

	import HugeiconsDownload04 from "virtual:icons/hugeicons/download-04";

	type DownloadOption = {
		url: string;
		displayName: string;
	};

	export let downloadOptions: Record<string, DownloadOption>;

	let showModal: boolean[] = Array(1).fill(false);

	function downloadFile(key: string) {
		const link = document.createElement("a");
		link.href = downloadOptions[key].url;
		link.download = downloadOptions[key].url.split("/").pop() || "";
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	}
</script>

<button class="download-examples-btn" on:click={() => (showModal[0] = true)} type="button">
	<HugeiconsArchive02 width="32" height="32" />
</button>

<CenterModal bind:showModal modalID={0}>
	<div slot="description" class="modal-content">
		<slot>
			<h2>Download Example Textures</h2>
			<p>
				Feel free to use these as a starting point for your own weapon textures. Other good examples can be found on the <a
					target="_blank"
					href="https://github.com/Khazoda/basic-weapons/tree/latest-stable/common/src/main/resources/assets/basicweapons/textures/item"
					>GitHub repository</a
				>.
			</p>
		</slot>
		<div class="modal-actions left-aligned">
			{#each Object.entries(downloadOptions) as [key, option]}
				<button class="download-btn {key}" on:click={() => downloadFile(key)}>
					<HugeiconsDownload04 width="20" height="20" />
					{option.displayName}
				</button>
			{/each}
		</div>
	</div>
</CenterModal>

<style lang="scss">
	.download-examples-btn {
		display: inline-flex;
		position: absolute;
		left: -3rem;
		top: 1rem;
		align-items: center;


		justify-content: center;
		width: fit-content;
		padding: 0.5rem;
		border: 2px solid #1c1c1c;
		border-right: none;
		border-radius: 6px 0 0 6px;

		background: #333333;
		color: #ffffff;
		cursor: pointer;
		transition: all 0.1s ease;
		z-index: -1;

		&:hover {
			background: rgba(255, 255, 255, 0.1);
		}
	}

	.modal-content h2 {
		margin: 0;
	}

	.modal-actions {
		display: flex;
		justify-content: center;
		margin-top: 2rem;
		gap: 1rem;

		&.left-aligned {
			justify-content: flex-start;
		}
	}

	.download-btn {
		display: flex;
		align-items: center;
		padding: 0.5rem 1rem;
		gap: 0.25rem;
		border: none;
		border-radius: 4px;
		background: #4444ff;
		color: white;
		font-weight: 600;
		cursor: pointer;
		transition: all 0.2s ease;

		&:hover {
			background: #2222ff;
		}

		&.metallic {
			background: #3d6469;
			&:hover {
				background: #2c828d;
			}
		}

		&.non-metallic {
			background: #617744;
			&:hover {
				background: #679629;
			}
		}
	}
</style>

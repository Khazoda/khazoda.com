<script lang="ts">
	import HugeiconsArchive02 from 'virtual:icons/hugeicons/archive-02';
	import CenterModal from 'src/components/CenterModal.svelte';
	import { closeDialog } from 'src/components/CenterModal.svelte';

	import HugeiconsDownload04 from 'virtual:icons/hugeicons/download-04';

	type DownloadOption = {
		url: string;
		displayName: string;
	};

	export let downloadOptions: Record<string, DownloadOption>;

	let showModal: boolean[] = Array(1).fill(false);

	function downloadFile(key: string) {
		const link = document.createElement('a');
		link.href = downloadOptions[key].url;
		link.download = downloadOptions[key].url.split('/').pop() || '';
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	}
</script>

<button class="download-examples-btn" on:click={() => (showModal[0] = true)} type="button">
	<HugeiconsArchive02 width="24" height="24" />
</button>

<CenterModal bind:showModal modalID={0}>
	<div slot="description" class="modal-content">
		<slot>
			<h2>Download Example Textures</h2>
			<p>
				Feel free to use these as a starting point for your own weapon textures. Other good examples
				can be found on the <a
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
		justify-content: center;
		align-items: center;

		background: none;
		border: none;
		color: #ffffff;
		cursor: pointer;
		padding: 0.5rem;
		border-radius: 8px;
		transition: all 0.2s ease;

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
		padding: 0.5rem 1rem;
		border-radius: 4px;
		font-weight: 600;
		cursor: pointer;
		transition: all 0.2s ease;
		border: none;
		background: #4444ff;
		color: white;
		display: flex;
		align-items: center;
		gap: 0.25rem;

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

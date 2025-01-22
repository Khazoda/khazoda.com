import JSZip from 'jszip';
import type { MaterialPack } from '../types/materialpackTypes';

class MaterialPackBuilder {
	private materialPack: MaterialPack;
	private zip: JSZip;

	constructor(materialPack: MaterialPack) {
		this.materialPack = materialPack;
		this.zip = new JSZip();
	}

	async build(): Promise<Blob> {
		await this.generateDataPack();
		await this.generateResourcePack();
		return this.zip.generateAsync({ type: 'blob' });
	}
}

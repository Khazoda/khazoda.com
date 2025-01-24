// Get total localStorage usage in bytes
export function getLocalStorageSize(): number {
	let total = 0;
	for (let key in localStorage) {
		if (localStorage.hasOwnProperty(key)) {
			total += (localStorage[key].length + key.length) * 2; // UTF-16 uses 2 bytes per character
		}
	}
	return total;
}

// Get remaining storage space in bytes
export function getRemainingStorage(): number {
	// MAssuming 5MB as localStorage limit
	const MAX_STORAGE = 5 * 1024 * 1024; // 5MB
	return MAX_STORAGE - getLocalStorageSize();
}

// Check if user isapproaching storage limit
export function isApproachingStorageLimit(): boolean {
	const WARNING_THRESHOLD = 1 * 1024 * 1024; // 1MB
	return getRemainingStorage() < WARNING_THRESHOLD;
}

// Check if we've exceeded storage quota
export function checkStorageQuota(dataToAdd: string = ''): { hasSpace: boolean; error?: string } {
	try {
		const testKey = '_quota_test_' + Math.random();
		localStorage.setItem(testKey, dataToAdd);
		localStorage.removeItem(testKey);
		return { hasSpace: true };
	} catch (e) {
		return {
			hasSpace: false,
			error:
				'Available storage space exceeded. Please export and remove some material packs or textures to free up space.'
		};
	}
}

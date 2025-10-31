import {
	MAX_LOCAL_STORAGE_SIZE,
	STORAGE_WARNING_THRESHOLD,
	STORAGE_ERROR_MESSAGE
} from 'src/config/material-pack-creator';

export function getLocalStorageSize(): number {
	let total = 0;
	for (let key in localStorage) {
		if (localStorage.hasOwnProperty(key)) {
			total += (localStorage[key].length + key.length) * 2; // UTF-16 uses 2 bytes per character
		}
	}
	return total;
}

export function getRemainingStorage(): number {
	return MAX_LOCAL_STORAGE_SIZE - getLocalStorageSize();
}

export function isApproachingStorageLimit(): boolean {
	return getRemainingStorage() < STORAGE_WARNING_THRESHOLD;
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
			error: STORAGE_ERROR_MESSAGE
		};
	}
}

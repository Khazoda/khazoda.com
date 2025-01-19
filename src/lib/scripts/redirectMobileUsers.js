// Check if device is likely mobile based on aspect ratio and width
function isMobileDevice() {
	const aspectRatio = window.screen.width / window.screen.height;
	const isMobileRatio = aspectRatio < 0.75; // Most mobile devices have aspect ratios like 9:16, 9:19, etc.
	const isNarrowScreen = window.innerWidth < 650;

	return isMobileRatio && isNarrowScreen;
}

// Execute check when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
	if (isMobileDevice()) {
		// Get current page path for the alert message
		const currentPage = window.location.pathname;

		// Show alert about mobile restriction
		alert(`Mobile devices are not supported on ${currentPage}. Redirecting to homepage.`);

		// Redirect to homepage
		window.location.href = '/';
	}
});

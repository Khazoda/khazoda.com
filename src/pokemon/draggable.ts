export function draggable(node: HTMLElement, opts?: { onStart?: () => void }) {
	let x = 0,
		y = 0,
		startX = 0,
		startY = 0,
		dragging = false;

	function handleMousedown(event: MouseEvent) {
		opts?.onStart?.();
		const rect = node.getBoundingClientRect();
		// Use current style.left/top if set, otherwise use bounding rect
		x = parseInt(node.style.left, 10) || rect.left + window.scrollX;
		y = parseInt(node.style.top, 10) || rect.top + window.scrollY;
		startX = event.clientX - x;
		startY = event.clientY - y;
		dragging = true;
		document.addEventListener('mousemove', handleMousemove);
		document.addEventListener('mouseup', handleMouseup);
	}

	function handleMousemove(event: MouseEvent) {
		if (!dragging) return;
		x = event.clientX - startX;
		y = event.clientY - startY;
		node.style.left = `${x}px`;
		node.style.top = `${y}px`;
	}

	function handleMouseup() {
		dragging = false;
		document.removeEventListener('mousemove', handleMousemove);
		document.removeEventListener('mouseup', handleMouseup);
	}

	const header = node.querySelector('.window-header');
	if (header) {
		header.addEventListener('mousedown', handleMousedown as EventListener);
	}

	return {
		destroy() {
			if (header) {
				header.removeEventListener('mousedown', handleMousedown as EventListener);
			}
		}
	};
}

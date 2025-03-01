/// <reference types="vite/client" />

declare module '*.md' {
	const content: any;
	export default content;
}

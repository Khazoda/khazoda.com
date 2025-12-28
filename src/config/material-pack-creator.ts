// UI Settings
export const MIN_SCREEN_WIDTH = 1000;
export const TRANSITION_DURATION_MS = 300;

// Pack Icon Settings
export const PACK_ICON_RECOMMENDED_SIZE = 32;
export const PACK_ICON_MAX_SIZE = 256;
export const DEFAULT_PACK_ICON =
	'data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgBAMAAACBVGfHAAABgWlDQ1BzUkdCIElFQzYxOTY2LTIuMQAAKJF1kbtLA0EQh78kimKUCFGwsAiSWBnRCEEbi4hGQS1iBF9NcnkJeRx3CRJsBVtBQbTxVehfoK1gLQiKIoi1too2KudcEkgQM8vOfvvbmWF3FqzhtJLRGwYgk81roWDAtbC45Gp6xYITOx46I4quzsxNhKlrn/cSLXbrNWvVj/vX7LG4roClWXhUUbW88KTw9FpeNXlHuENJRWLCZ8J9mlxQ+M7Uo2V+MTlZ5m+TtXBoDKztwq5kDUdrWElpGWF5Oe5MuqBU7mO+pDWenZ+TtUdmNzohggRwMcU4Y/gZZES8Hy8++mVHnfyBUv4sOclVxKsU0VglSYo8faIWpHpc1oTocRlpimb///ZVTwz5ytVbA9D4bBjvHmjahp8tw/g6MoyfY7A9wWW2mp87hOEP0beqmvsAHBtwflXVortwsQldj2pEi5Qkm0xrIgFvp9C2CM4baFku96xyzskDhNflq65hbx96Jd6x8gtehWfiZr0+nQAAAAlwSFlzAAALEwAACxMBAJqcGAAAACFQTFRFAAAANzc3VlZWek4/i4uLqWJKrmVMvX5pw4p3y8vL////0LzRUAAAAAF0Uk5TAEDm2GYAAABnSURBVCjPY2AgDARRAFBAvLy8vLgcCgpBAh0dHc0dUAARQGiQAAs0KsGAikQgWEBzJhTMEiNTQNgQISBsSCVDaSIgSoZAIoaA1yoYgAogAhkikJaWlpwGBWCB0NDQ4FAoCMQWlYQAALdlmknY+BjuAAAAAElFTkSuQmCC';

// Storage Settings
export const MAX_LOCAL_STORAGE_SIZE = 5 * 1024 * 1024;
export const STORAGE_WARNING_THRESHOLD = 1 * 1024 * 1024;
export const STORAGE_ERROR_MESSAGE =
	'Available storage space exceeded. Please export and remove some material packs or textures to free up space.';

// Validation Limits
export const MATERIAL_NAME_MIN_LENGTH = 1;
export const MATERIAL_NAME_MAX_LENGTH = 32;
export const PACK_NAME_MIN_LENGTH = 1;
export const PACK_NAME_MAX_LENGTH = 32;
export const MOD_DEPENDENCY_MAX_LENGTH = 32;
export const NUMBER_MIN_VALUE = -100;
export const NUMBER_MAX_VALUE = 100;
export const DURABILITY_MIN = 1;
export const DURABILITY_MAX = 10000;
export const ENCHANTABILITY_MIN = 1;
export const ENCHANTABILITY_MAX = 100;

// Material Defaults
export const DEFAULT_DURABILITY = 100;
export const DEFAULT_MINING_SPEED = 4.0;
export const DEFAULT_ATTACK_DAMAGE_BONUS = 0;
export const DEFAULT_ATTACK_SPEED_BONUS = 0;
export const DEFAULT_REACH_BONUS = 0;
export const DEFAULT_ENCHANTABILITY = 10;
export const DEFAULT_RECIPE_TYPE = 'crafting' as const;
export const DEFAULT_HANDLE_INGREDIENT = 'minecraft:stick';
export const DEFAULT_REPAIR_INGREDIENT = 'minecraft:iron_ingot';

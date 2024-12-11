export type MinecraftVersion = {
    version: string;
    type: 'major' | 'minor' | 'superceded';
    releaseDate: string;
    versionGroup: string;
};

export type ModCompatibility = {
    modId: string;
    icon: string;
    name: string;
    supportedVersions: string[];
};

export type SortOrder = 'newest' | 'oldest' | 'major';
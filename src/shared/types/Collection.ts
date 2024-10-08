import type { MediaElement } from '@shared/types';

export type CollectionElement = MediaElement & {
    originalName: string;
    name: string;
};

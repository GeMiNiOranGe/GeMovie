import type { Media, MediaElementBase, MovieElement } from '@shared/types';

export type CollectionElement = MediaElementBase & {
    originalName: string;
    name: string;
};

export type Collection = {
    id: number;
    name: string;
    overview: string;
    posterPath: string | undefined;
    backdropPath: string | undefined;
    parts: (MovieElement & Media)[];
};

export type SimpleCollection = {
    id: number;
    name: string;
    posterPath?: string | undefined;
    backdropPath?: string | undefined;
};

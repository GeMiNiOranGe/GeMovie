import type {
    Media,
    MediaElementBase,
    MovieElement,
    Optional,
} from '@shared/types';

export type CollectionElement = MediaElementBase & {
    originalName: string;
    name: string;
};

export type Collection = {
    id: number;
    name: string;
    overview: string;
    posterPath: Optional<string>;
    backdropPath: Optional<string>;
    parts: (MovieElement & Media)[];
};

export type SimpleCollection = {
    id: number;
    name: string;
    posterPath: Optional<string>;
    backdropPath: Optional<string>;
};

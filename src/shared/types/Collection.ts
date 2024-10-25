import type { MediaElement } from '@shared/types';

export type CollectionElement = MediaElement & {
    originalName: string;
    name: string;
};

export type Part = {
    id: number;
    title: string;
    original_title: string;
    overview: string;
    poster_path: string | null;
    backdrop_path: string | null;
    media_type: string;
    adult: boolean;
    original_language: string;
    genre_ids: number[];
    popularity: number;
    release_date: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
};

export type Collection = {
    id: number;
    name: string;
    overview: string;
    poster_path: string | null;
    backdrop_path: string | null;
    parts: Part[];
};

export type SimpleCollection = {
    id: number;
    name: string;
    posterPath?: string | undefined;
    backdropPath?: string | undefined;
};

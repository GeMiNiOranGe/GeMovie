import type { Media, MovieElement, TvShowElement } from '@shared/types';

export type KnownFor = {
    id: number;
    title: string;
    original_title: string;
    overview: string;
    poster_path: string;
    media_type: string;
    genre_ids: number[];
    release_date: string;
    vote_average: number;
    vote_count: number;
};

export type KnownForElement = (TvShowElement | MovieElement) & Media;

export type PersonElement = {
    adult: boolean;
    gender: number;
    id: number;
    knownForDepartment: string;
    name: string;
    originalName: string;
    popularity: number;
    profilePath: string;
    knownFor: KnownForElement[];
};

export type Person = {
    id: number;
    name: string;
    popularity: number;
    biography: string;
    profile_path: string;
    adult: boolean;
    gender: number;
    known_for_department: string;
    known_for: KnownFor[];
};

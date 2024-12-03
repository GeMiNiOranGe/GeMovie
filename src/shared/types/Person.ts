import type { MediaElement, Optional } from '@shared/types';

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

export type PersonBase = {
    adult: boolean;
    gender: number;
    id: number;
    knownForDepartment: string;
    name: string;
    popularity: number;
    profilePath: Optional<string>;
};

export type PersonElementBase = PersonBase & {
    originalName: string;
};

export type PersonElement = PersonElementBase & {
    knownFor: MediaElement[];
};

export type CreditElement = PersonElementBase & {
    creditId: string;
};

export type Cast = CreditElement & {
    castId: number;
    character: string;
    order: number;
};

export type Crew = CreditElement & {
    department: string;
    job: string;
};

export type GuestStar = CreditElement & {
    character: string;
    order: number;
};

export type Credits = {
    id: number;
    cast: Cast[];
    crew: Crew[];
};

/*
export type Person = {
    adult: boolean;
    alsoKnownAs: string[];
    biography: string;
    birthday: Date;
    deathday: null;
    gender: number;
    homepage: string;
    id: number;
    imdbId: string;
    knownForDepartment: string;
    name: string;
    placeOfBirth: string;
    popularity: number;
    profilePath: string;
};
*/

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
    place_of_birth?: string;
    birthday?: string;
    deathday?: string;
    imdb_id?: string | null;
};

export type PersonImage = {
    file_path: string;
    width: number;
    height: number;
    aspect_ratio: number;
};

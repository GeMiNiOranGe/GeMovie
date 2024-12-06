import type {
    MediaElement,
    MovieElement,
    Optional,
    TvShowElement,
} from '@shared/types';

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

export type Crew = CreditElement & {
    department: string;
    job: string;
};

export type CastBase = CreditElement & {
    character: string;
    order: number;
};

export type Cast = CastBase & {
    castId: number;
};

export type Credits = {
    id: number;
    cast: Cast[];
    crew: Crew[];
};

export type TPerson = {
    adult: boolean;
    alsoKnownAs: string[];
    biography: string;
    birthday: Date;
    deathday: Date;
    gender: number;
    homepage: Optional<string>;
    id: number;
    imdbId: Optional<string>;
    knownForDepartment: string;
    name: string;
    placeOfBirth: string;
    popularity: number;
    profilePath: string;
    // movieCredits: Omit<MovieCredits, 'id'>;
    // tvCredits: Omit<TvCredits, 'id'>;
};

export type MovieCredits = {
    id: number;
    cast: MovieCreditsCast[];
    crew: MovieCreditsCrew[];
};

export type MovieCreditsCast = MovieElement &
    Omit<CastBase, keyof PersonElementBase>;

export type MovieCreditsCrew = MovieElement &
    Omit<Crew, keyof PersonElementBase>;

export type TvShowCredits = {
    id: number;
    cast: TvCreditsCast[];
    crew: TvCreditsCrew[];
};

export type TvCreditsCast = TvShowElement &
    Omit<CastBase, keyof PersonElementBase> & {
        episodeCount: number;
    };

export type TvCreditsCrew = TvShowElement & Omit<Crew, keyof PersonElementBase>;

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

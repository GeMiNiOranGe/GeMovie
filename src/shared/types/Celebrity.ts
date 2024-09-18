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

export type Celebrity = {
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

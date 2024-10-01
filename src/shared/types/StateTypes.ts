import type { Company, CompanyElement } from './Company';
import type { FeaturedMovie, Movie, MovieElement } from './Movie';
import type { FeaturedTvShow, TvShowElement } from './TvShow';
import type { Person, KnownFor } from './Person';
import type { CollectionElement } from './Collection';

export type SearchScreenState = {
    results: {
        movies?: MovieElement[] | undefined;
    };
    searchContent: string;
};

export type TvShowSearchResultsTopTabState = {
    tvShows?: TvShowElement[] | undefined;
};

export type CompanySearchResultsTopTabState = {
    companies?: CompanyElement[] | undefined;
};

export type MovieDetailScreenState = {
    movie?: Movie | undefined;
};

export type CollectionSearchResultsTopTabState = {
    collections?: CollectionElement[] | undefined;
};

export type ExpandableTextState = {
    isExpand: boolean;
};

export type CompanyDetailScreenState = {
    company?: Company | undefined;
    movies?: Movie[] | undefined;
    randomMovie?: Movie | undefined;
};

export type PersonDetailScreenState = {
    person?: Person | undefined;
    movies: KnownFor[];
};

export type HomeScreenState = {
    movies: FeaturedMovie[];
    people: Person[];
    upcomingMovies: any[];
    tvShow: FeaturedTvShow[];
    isLoading: boolean;
    backgroundImageIndex: number;
};

export type SlideshowState = {
    currentIndex: number;
    isAutoplay: boolean;
};

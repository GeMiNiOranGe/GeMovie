import { Movie, MovieElement } from '@shared/types';
import { toCompanyElement } from './CompanyConverter';
import {
    toBelongsToCollection,
    toProductionCountryElement,
    toSpokenLanguageElement,
} from './Converter';

export function toMovieElement(val: any): MovieElement {
    return {
        adult: val.adult,
        backdropPath: val.backdrop_path,
        genreIds: val.genre_ids,
        id: val.id,
        originalLanguage: val.original_language,
        originalTitle: val.original_title,
        overview: val.overview,
        popularity: val.popularity,
        posterPath: val.poster_path,
        releaseDate: new Date(val.release_date),
        title: val.title,
        video: val.video,
        voteAverage: val.vote_average,
        voteCount: val.vote_count,
    };
}

export function toMovie(val: any): Movie {
    return {
        adult: val.adult,
        backdropPath: val.backdrop_path ?? undefined,
        belongsToCollection: toBelongsToCollection(val.belongs_to_collection),
        budget: val.budget,
        genres: val.genres,
        homepage: val.homepage,
        id: val.id,
        imdbId: val.imdb_id ?? undefined,
        originCountry: val.origin_country,
        originalLanguage: val.original_language,
        originalTitle: val.original_title,
        overview: val.overview,
        popularity: val.popularity,
        posterPath: val.poster_path ?? undefined,
        productionCompanies: Array.from(val.production_companies).map(element =>
            toCompanyElement(element),
        ),
        productionCountries: Array.from(val.production_countries).map(element =>
            toProductionCountryElement(element),
        ),
        releaseDate: new Date(val.release_date),
        revenue: val.revenue,
        runtime: val.runtime,
        spokenLanguages: Array.from(val.spoken_languages).map(element =>
            toSpokenLanguageElement(element),
        ),
        status: val.status,
        tagline: val.tagline,
        title: val.title,
        video: val.video,
        voteAverage: val.vote_average,
        voteCount: val.vote_count,
    };
}

import { Movie, MovieElement } from '@shared/types';
import {
    toSimpleCollection,
    toCompanyElement,
    toLanguage,
} from '@shared/utils';

export function toMovieElement(val: any): MovieElement {
    return {
        adult: val.adult,
        backdropPath: val['backdrop_path'] ?? undefined,
        genreIds: val['genre_ids'],
        id: val.id,
        originalLanguage: val['original_language'],
        originalTitle: val['original_title'],
        overview: val.overview,
        popularity: val.popularity,
        posterPath: val['poster_path'] ?? undefined,
        releaseDate: new Date(val['release_date'] ?? undefined),
        title: val.title,
        video: val.video,
        voteAverage: val['vote_average'],
        voteCount: val['vote_count'],
    };
}

export function toMovie(val: any): Movie {
    return {
        adult: val.adult,
        backdropPath: val['backdrop_path'] ?? undefined,
        belongsToCollection: toSimpleCollection(val['belongs_to_collection']),
        budget: val.budget,
        genres: val.genres,
        homepage: val.homepage,
        id: val.id,
        imdbId: val['imdb_id'] ?? undefined,
        originCountry: val['origin_country'],
        originalLanguage: val['original_language'],
        originalTitle: val['original_title'],
        overview: val.overview,
        popularity: val.popularity,
        posterPath: val['poster_path'] ?? undefined,
        productionCompanies: Array.from(val['production_companies']).map(
            element => toCompanyElement(element),
        ),
        productionCountries: val['production_countries'],
        releaseDate: new Date(val['release_date'] ?? undefined),
        revenue: val.revenue,
        runtime: val.runtime,
        spokenLanguages: Array.from(val['spoken_languages']).map(element =>
            toLanguage(element),
        ),
        status: val.status,
        tagline: val.tagline,
        title: val.title,
        video: val.video,
        voteAverage: val['vote_average'],
        voteCount: val['vote_count'],
        keywords: {
            keywords: val.keywords.keywords,
        },
    };
}

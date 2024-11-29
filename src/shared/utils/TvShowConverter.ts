import type { TvShow, TvShowElement } from '@shared/types';
import {
    toCompanyElement,
    toLanguage,
    toProductionCountryElement,
} from '@shared/utils';

export function toTvShowElement(val: any): TvShowElement {
    return {
        adult: val.adult,
        backdropPath: val['backdrop_path'] ?? undefined,
        genreIds: val['genre_ids'],
        id: val.id,
        originCountry: val['origin_country'],
        originalLanguage: val['original_language'],
        originalName: val['original_name'],
        overview: val.overview,
        popularity: val.popularity,
        posterPath: val['poster_path'] ?? undefined,
        firstAirDate: new Date(val['first_air_date']),
        name: val.name,
        voteAverage: val['vote_average'],
        voteCount: val['vote_count'],
    };
}

export function toTvShow(val: any): TvShow {
    return {
        adult: val.adult,
        backdropPath: val['backdrop_path'] ?? undefined,
        genres: val.genres,
        id: val.id,
        originCountry: val['origin_country'],
        originalLanguage: val['original_language'],
        originalName: val['original_name'],
        overview: val.overview,
        popularity: val.popularity,
        posterPath: val['poster_path'] ?? undefined,
        firstAirDate: new Date(val['first_air_date']),
        name: val.name,
        voteAverage: val['vote_average'],
        voteCount: val['vote_count'],
        homepage: val.homepage,
        seasons: val.seasons || [],
        productionCompanies: Array.from(val['production_companies']).map(
            element => toCompanyElement(element),
        ),
        spokenLanguages: Array.from(val['spoken_languages']).map(element =>
            toLanguage(element),
        ),
        networks: (val.networks || []).map((network: any) => ({
            id: network.id,
            logoPath: network['logo_path'],
            name: network.name,
            originCountry: network['origin_country'],
        })),
        status: val.status,
        tagline: val.tagline,
        productionCountries: Array.from(val['production_countries']).map(
            element => toProductionCountryElement(element),
        ),
    };
}

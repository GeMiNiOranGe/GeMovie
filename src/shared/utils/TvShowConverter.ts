import type {
    CreatedBy,
    EpisodeToAir,
    NetworkElement,
    SeasonElement,
    TvShow,
    TvShowElement,
} from '@shared/types';
import { toCompanyElement, toLanguage } from '@shared/utils';

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
        createdBy: Array.from(val['created_by']).map(element =>
            toCreatedBy(element),
        ),
        episodeRunTime: val['episode_run_time'],
        firstAirDate: new Date(val['first_air_date']),
        genres: val.genres,
        homepage: val.homepage,
        id: val.id,
        inProduction: val['in_production'],
        languages: val.languages,
        lastAirDate: new Date(val['last_air_date']),
        lastEpisodeToAir: toEpisodeToAir(val['last_episode_to_air']),
        name: val.name,
        nextEpisodeToAir: val['next_episode_to_air']
            ? toEpisodeToAir(val['next_episode_to_air'])
            : undefined,
        networks: Array.from(val.networks).map(element =>
            toNetworkElement(element),
        ),
        numberOfEpisodes: val['number_of_episodes'],
        numberOfSeasons: val['number_of_seasons'],
        originCountry: val['origin_country'],
        originalLanguage: val['original_language'],
        originalName: val['original_name'],
        overview: val.overview,
        popularity: val.popularity,
        posterPath: val['poster_path'] ?? undefined,
        productionCompanies: Array.from(val['production_companies']).map(
            element => toCompanyElement(element),
        ),
        productionCountries: val['production_countries'],
        seasons: Array.from(val.seasons).map(element =>
            toSeasonElement(element),
        ),
        spokenLanguages: Array.from(val['spoken_languages']).map(element =>
            toLanguage(element),
        ),
        status: val.status,
        tagline: val.tagline,
        type: val.type,
        voteAverage: val['vote_average'],
        voteCount: val['vote_count'],
    };
}

export function toCreatedBy(val: any): CreatedBy {
    return {
        id: val.id,
        creditId: val['credit_id'],
        name: val.name,
        originalName: val['original_name'],
        gender: val.gender,
        profilePath: val['profile_path'] ?? undefined,
    };
}

export function toEpisodeToAir(val: any): EpisodeToAir {
    return {
        id: val.id,
        name: val.name,
        overview: val.overview,
        voteAverage: val['vote_average'],
        voteCount: val['vote_count'],
        airDate: new Date(val['air_date']),
        episodeNumber: val['episode_number'],
        episodeType: val['episode_type'],
        productionCode: val['production_code'],
        runtime: val.runtime,
        seasonNumber: val['season_number'],
        showId: val['show_id'],
        stillPath: val['still_path'] ?? undefined,
    };
}

export function toNetworkElement(val: any): NetworkElement {
    return {
        id: val.id,
        logoPath: val['logo_path'] ?? undefined,
        name: val.name,
        originCountry: val['origin_country'],
    };
}

export function toSeasonElement(val: any): SeasonElement {
    return {
        airDate: new Date(val['air_date']),
        episodeCount: val['episode_count'],
        id: val.id,
        name: val.name,
        overview: val.overview,
        posterPath: val['poster_path'] ?? undefined,
        seasonNumber: val['season_number'],
        voteAverage: val['vote_average'],
    };
}

import { Genre, TvShowElement } from '@shared/types';

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

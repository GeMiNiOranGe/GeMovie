/* eslint-disable camelcase */
import { Collection, CollectionElement, SimpleCollection } from '@shared/types';

export function toCollectionElement(val: any): CollectionElement {
    return {
        adult: val.adult,
        backdropPath: val['backdrop_path'] ?? undefined,
        id: val.id,
        name: val.name,
        originalLanguage: val['original_language'],
        originalName: val['original_name'],
        overview: val.overview,
        posterPath: val['poster_path'] ?? undefined,
    };
}

export function toCollection(val: any): Collection {
    return {
        id: val.id,
        name: val.name,
        overview: val.overview,
        poster_path: val['poster_path'] ?? null,
        backdrop_path: val['backdrop_path'] ?? null,
        parts: (val.parts || []).map((part: any) => ({
            id: part.id,
            title: part.title,
            original_title: part.original_title,
            overview: part.overview,
            poster_path: part['poster_path'] ?? null,
            backdrop_path: part['backdrop_path'] ?? null,
            media_type: part.media_type,
            adult: part.adult,
            original_language: part['original_language'],
            genre_ids: part['genre_ids'] || [],
            popularity: part.popularity,
            release_date: part.release_date,
            video: part.video,
            vote_average: part.vote_average,
            vote_count: part.vote_count,
        })),
    };
}

export function toSimpleCollection(val: any): SimpleCollection | undefined {
    if (!val) {
        return undefined;
    }

    return {
        id: val.id,
        name: val.name,
        posterPath: val['poster_path'],
        backdropPath: val['backdrop_path'],
    };
}

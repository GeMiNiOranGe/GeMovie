import { Collection, CollectionElement, SimpleCollection } from '@shared/types';
import { toMovieElement } from '@shared/utils';

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
        posterPath: val['poster_path'] ?? undefined,
        backdropPath: val['backdrop_path'] ?? undefined,
        parts: Array.from(val.parts).map(element => {
            return {
                mediaType: val['media_type'],
                ...toMovieElement(element),
            };
        }),
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

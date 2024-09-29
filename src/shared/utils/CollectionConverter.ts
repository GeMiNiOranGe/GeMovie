import { CollectionElement } from '@shared/types';

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

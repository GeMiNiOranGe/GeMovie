import {
    BelongsToCollection,
    GenreElement,
    ProductionCountryElement,
    SearchResponse,
    SpokenLanguageElement,
} from '@shared/types';

export function toSearchResponse<T>(val: any): SearchResponse<T> {
    return {
        page: val.page,
        results: val.results,
        totalPages: val.total_pages,
        totalResults: val.total_results,
    };
}

export function toBelongsToCollection(
    val: any,
): BelongsToCollection | undefined {
    if (!val) {
        return undefined;
    }

    return {
        id: val.id,
        name: val.name,
        posterPath: val.poster_path,
        backdropPath: val.backdrop_path,
    };
}

export function toGenreElement(val: any): GenreElement {
    return {
        id: val.id,
        name: val.name,
    };
}

export function toProductionCountryElement(val: any): ProductionCountryElement {
    return {
        iso_3166_1: val.iso_3166_1,
        name: val.name,
    };
}

export function toSpokenLanguageElement(val: any): SpokenLanguageElement {
    return {
        englishName: val.english_name,
        iso_639_1: val.iso_639_1,
        name: val.name,
    };
}

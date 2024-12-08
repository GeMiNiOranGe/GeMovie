import type {
    Cast,
    Credits,
    Crew,
    CastBase,
    PersonElement,
    PersonElementBase,
    TPerson,
    MovieCredits,
    MovieCreditsCast,
    MovieCreditsCrew,
    TvShowCredits,
    TvShowCreditsCast,
    TvShowCreditsCrew,
} from '@shared/types';
import { toMediaElement, toMovieElement, toTvShowElement } from '@shared/utils';

export function toPersonElement(val: any): PersonElement {
    return {
        adult: val.adult,
        gender: val.gender,
        id: val.id,
        knownForDepartment: val['known_for_department'],
        name: val.name,
        originalName: val['original_name'],
        popularity: val.popularity,
        profilePath: val['profile_path'] ?? undefined,
        knownFor: Array.from(val['known_for']).map(element =>
            toMediaElement(element),
        ),
    };
}

export function toPersonElementBase(val: any): PersonElementBase {
    return {
        adult: val.adult,
        gender: val.gender,
        id: val.id,
        knownForDepartment: val['known_for_department'],
        name: val.name,
        originalName: val['original_name'],
        popularity: val.popularity,
        profilePath: val['profile_path'] ?? undefined,
    };
}

export function toPerson(val: any): TPerson {
    return {
        adult: val.adult,
        alsoKnownAs: val['also_known_as'],
        biography: val.biography,
        birthday: new Date(val.birthday ?? undefined),
        deathday: new Date(val.deathday ?? undefined),
        gender: val.gender,
        homepage: val.homepage ?? undefined,
        id: val.id,
        imdbId: val['imdb_id'] ?? undefined,
        knownForDepartment: val['known_for_department'],
        name: val.name,
        placeOfBirth: val['place_of_birth'],
        popularity: val.popularity,
        profilePath: val['profile_path'] ?? undefined,
    };
}

export function toCredits(val: any): Credits {
    return {
        id: val.id,
        cast: Array.from(val.cast).map(element => toCast(element)),
        crew: Array.from(val.crew).map(element => toCrew(element)),
    };
}

export function toMovieCredits(val: any): MovieCredits {
    return {
        id: val.id,
        cast: Array.from(val.cast).map(element => toMovieCreditsCast(element)),
        crew: Array.from(val.crew).map(element => toMovieCreditsCrew(element)),
    };
}

export function toTvShowCredits(val: any): TvShowCredits {
    return {
        id: val.id,
        cast: Array.from(val.cast).map(element => toTvShowCreditsCast(element)),
        crew: Array.from(val.crew).map(element => toTvShowCreditsCrew(element)),
    };
}

export function toCast(val: any): Cast {
    return {
        adult: val.adult,
        gender: val.gender,
        id: val.id,
        knownForDepartment: val['known_for_department'],
        name: val.name,
        originalName: val['original_name'],
        popularity: val.popularity,
        profilePath: val['profile_path'] ?? undefined,
        castId: val['cast_id'],
        character: val.character,
        creditId: val['credit_id'],
        order: val.order,
    };
}

export function toMovieCreditsCast(val: any): MovieCreditsCast {
    return {
        ...toMovieElement(val),
        character: val.character,
        creditId: val['credit_id'],
        order: val.order,
    };
}

export function toTvShowCreditsCast(val: any): TvShowCreditsCast {
    return {
        ...toTvShowElement(val),
        character: val.character,
        creditId: val['credit_id'],
        order: val.order,
        episodeCount: val['episode_count'],
    };
}

export function toCrew(val: any): Crew {
    return {
        adult: val.adult,
        gender: val.gender,
        id: val.id,
        knownForDepartment: val['known_for_department'],
        name: val.name,
        originalName: val['original_name'],
        popularity: val.popularity,
        profilePath: val['profile_path'] ?? undefined,
        creditId: val['credit_id'],
        department: val.department,
        job: val.job,
    };
}

export function toMovieCreditsCrew(val: any): MovieCreditsCrew {
    return {
        ...toMovieElement(val),
        creditId: val['credit_id'],
        department: val.department,
        job: val.job,
    };
}

export function toTvShowCreditsCrew(val: any): TvShowCreditsCrew {
    return {
        ...toTvShowElement(val),
        creditId: val['credit_id'],
        department: val.department,
        job: val.job,
    };
}

export function toCastBase(val: any): CastBase {
    return {
        adult: val.adult,
        gender: val.gender,
        id: val.id,
        knownForDepartment: val['known_for_department'],
        name: val.name,
        originalName: val['original_name'],
        popularity: val.popularity,
        profilePath: val['profile_path'] ?? undefined,
        creditId: val['credit_id'],
        character: val.character,
        order: val.order,
    };
}

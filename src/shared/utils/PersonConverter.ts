import type { Cast, Credits, Crew, PersonElement } from '@shared/types';
import { toMediaElement } from '@shared/utils';

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

export function toCredits(val: any): Credits {
    return {
        id: val.id,
        cast: Array.from(val.cast).map(element => toCast(element)),
        crew: Array.from(val.crew).map(element => toCrew(element)),
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

import type { PersonElement } from '@shared/types';
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
        profilePath: val['profile_path'],
        knownFor: Array.from(val['known_for']).map(element =>
            toMediaElement(element),
        ),
    };
}

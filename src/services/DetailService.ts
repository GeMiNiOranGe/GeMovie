import { APIHandler, URLBuilder } from '@services';
import type { SearchType } from '@shared/types';

export default class DetailService {
    /**
     * Get detailed information about movies, tv series, people, companies, collections,...
     * @param id movie id, tv series id, person id,...
     * @param type movie, tv series, person, company, collection,...
     * @param transformFn `toMovie`, `toTvSeries`, `toPerson`, `toCompany`, `toCollection`,...
     */
    public static async getDetailAsync<T>(
        id: number,
        type: SearchType,
        transformFn: (json: any) => T,
    ): Promise<T> {
        const url = URLBuilder.buildDetailURL(type, id);
        const json = await APIHandler.fetchJSON(url);
        return transformFn(json);
    }
}

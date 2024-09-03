import { APIHandler, URLBuilder } from '@services';
import type { SearchType } from '@shared/types';

export default class DetailService {
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

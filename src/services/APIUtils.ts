import { APIHandler, PaginationResponseWrapper } from '@services';
import { toPaginationResponse } from '@shared/utils';
import type { ConvertFn, PaginationResponse } from '@shared/types';

export default class APIUtils {
    /**
     * Fetch paginated data and map it to a specific type.
     * @param url API endpoint
     * @param elementConvertFn Function to convert raw JSON to the target element type, e.g: `toMovieElement`, `toTvShowElement`, `toPersonElement`, `toCompanyElement`, `toCollectionElement`,...
     */
    public static async fetchPagination<E>(
        url: string,
        elementConvertFn: ConvertFn<E>,
    ): Promise<PaginationResponseWrapper<E>> {
        const json: any = await APIHandler.fetchJSON(url);
        const response: PaginationResponse<E> = toPaginationResponse(json);
        return new PaginationResponseWrapper(response, elementConvertFn);
    }

    /**
     * Fetch single one data and map it to a specific type.
     * @param url API endpoint
     * @param convertFn Function to convert raw JSON to the target type, e.g: `toMovie`, `toTvShow`, `toPerson`, `toCompany`, `toCollection`.
     */
    public static async fetchSingleOne<T>(
        url: string,
        convertFn: ConvertFn<T>,
    ): Promise<T> {
        const json: any = await APIHandler.fetchJSON(url);
        return convertFn(json);
    }
}

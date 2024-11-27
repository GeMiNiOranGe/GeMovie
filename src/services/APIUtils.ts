import { APIHandler, PaginationResponseWrapper } from '@services';
import { toPaginationResponse } from '@shared/utils';
import type {
    ElementConvertFn,
    PaginationResponse,
    TransformFn,
} from '@shared/types';

export default class APIUtils {
    /**
     * Fetch paginated data and map it to a specific type.
     * @param url API endpoint
     * @param elementConvertFn Function to convert raw JSON to the target element type, e.g: `toMovieElement`, `toTvShowElement`, `toPersonElement`, `toCompanyElement`, `toCollectionElement`,...
     */
    public static async fetchPagination<T>(
        url: string,
        elementConvertFn: ElementConvertFn<T>,
    ): Promise<PaginationResponseWrapper<T>> {
        const json: any = await APIHandler.fetchJSON(url);
        const response: PaginationResponse<T> = toPaginationResponse(json);
        return new PaginationResponseWrapper(response, elementConvertFn);
    }

    /**
     * Fetch single one data and map it to a specific type.
     * @param url API endpoint
     * @param transformFn Function to convert raw JSON to the target type, e.g: `toMovie`, `toTvShow`, `toPerson`, `toCompany`, `toCollection`.
     */
    public static async fetchSingleOne<T>(
        url: string,
        transformFn: TransformFn<T>,
    ): Promise<T> {
        const json: any = await APIHandler.fetchJSON(url);
        return transformFn(json);
    }
}

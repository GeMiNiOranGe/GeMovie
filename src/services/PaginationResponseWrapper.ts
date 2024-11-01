import { PaginationResponse } from '@shared/types';

class PaginationResponseWrapper<T> {
    private searchResponse: PaginationResponse<T>;
    private elementConvertFn: (element: any) => T;

    public constructor(
        response: PaginationResponse<T>,
        elementConvertFn: (val: any) => T,
    ) {
        this.searchResponse = response;
        this.elementConvertFn = elementConvertFn;
    }

    public getPage(): number {
        return this.searchResponse.page;
    }

    public getResults(): T[] {
        return this.searchResponse.results.map(element =>
            this.elementConvertFn(element),
        );
    }

    public getTotalPages(): number {
        return this.searchResponse.totalPages;
    }

    public getTotalResults(): number {
        return this.searchResponse.totalResults;
    }
}

export default PaginationResponseWrapper;

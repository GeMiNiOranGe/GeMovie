import type { ConvertFn, PaginationResponse } from '@shared/types';

class PaginationResponseWrapper<E> {
    private searchResponse: PaginationResponse<E>;
    private elementConvertFn: ConvertFn<E>;

    public constructor(
        response: PaginationResponse<E>,
        elementConvertFn: ConvertFn<E>,
    ) {
        this.searchResponse = response;
        this.elementConvertFn = elementConvertFn;
    }

    public getPage(): number {
        return this.searchResponse.page;
    }

    public getResults(): E[] {
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

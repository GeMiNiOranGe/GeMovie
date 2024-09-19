import { SearchResponse } from '@shared/types';

class SearchResponseWrapper<T> {
    private searchResponse: SearchResponse<T>;
    private elementConvertFn: (element: any) => T;

    public constructor(
        searchResponse: SearchResponse<T>,
        elementConvertFn: (val: any) => T,
    ) {
        this.searchResponse = searchResponse;
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

export default SearchResponseWrapper;

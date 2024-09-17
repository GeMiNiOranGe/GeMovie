import { SearchResponse } from '@shared/types';

class SearchResponseWrapper<T> {
    private _searchResponse: SearchResponse<T>;
    private convertFn: (element: any) => T;

    public constructor(
        searchResponse: SearchResponse<T>,
        convertFn: (val: any) => T,
    ) {
        this._searchResponse = searchResponse;
        this.convertFn = convertFn;
    }

    public getPage(): number {
        return this._searchResponse.page;
    }

    public getResults(): T[] {
        return this._searchResponse.results.map(element =>
            this.convertFn(element),
        );
    }

    public getTotalPages(): number {
        return this._searchResponse.totalPages;
    }
    public getTotalResults(): number {
        return this._searchResponse.totalResults;
    }
}

export default SearchResponseWrapper;

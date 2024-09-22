import type { PersonElement } from '@shared/types';
import { SearchResponseWrapper, SearchService } from '@services';
import { toPersonElement } from '@shared/utils';

export default class PersonService {
    /**
     * Search for people by their name and also known as names.
     * @param text content you want to search
     */
    public static async searchAsync(
        text: string,
    ): Promise<SearchResponseWrapper<PersonElement>> {
        const params = new URLSearchParams({
            query: text,
        });
        return await SearchService.searchAsync(
            'person',
            params,
            toPersonElement,
        );
    }
}

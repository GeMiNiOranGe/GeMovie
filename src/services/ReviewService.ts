import type { Review } from '@shared/types';
import { APIUtils, URLBuilder } from '@services';
import { toReview } from '@shared/utils';

export default class ReviewService {
    public static async getDetailAsync(id: string): Promise<Review> {
        const url = URLBuilder.buildDetailURL('review', id);
        return await APIUtils.fetchSingleOne(url, toReview);
    }
}

import { DetailService } from '@services';
import { Review } from '@shared/types';
import { toReview } from '@shared/utils';

export default class ReviewService {
    public static async getDetailAsync(id: string): Promise<Review> {
        return await DetailService.getDetailAsync(id, 'review', toReview);
    }
}

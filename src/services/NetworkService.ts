import { APIUtils, URLBuilder } from '@services';
import { Network } from '@shared/types';
import { toNetwork } from '@shared/utils';

export default class NetworkService {
    /**
     * Get the details of a network.
     * @param id network id
     */
    public static async getDetailAsync(id: number): Promise<Network> {
        const url = URLBuilder.buildDetailURL('network', id);
        return await APIUtils.fetchSingleOne(url, toNetwork);
    }
}

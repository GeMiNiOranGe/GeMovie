import {
    type PaginationResponseWrapper,
    APIUtils,
    URLBuilder,
} from '@services';
import { upcomingVideoDays } from '@shared/constants';
import type { Episode, Season, TvShow, TvShowElement } from '@shared/types';
import {
    getISODateRangeFromToday,
    toEpisode,
    toSeason,
    toTvShow,
    toTvShowElement,
} from '@shared/utils';

export default class TvShowService {
    /**
     * Search for TV shows by their original, translated and also known as names.
     * @param text content you want to search
     * @param page page number
     */
    public static async searchAsync(
        text: string,
        page: number = 1,
    ): Promise<PaginationResponseWrapper<TvShowElement>> {
        const params = new URLSearchParams({
            query: text,
            page: `${page}`,
        });
        const url = URLBuilder.buildSearchURL('tv', params);
        return await APIUtils.fetchPagination(url, toTvShowElement);
    }

    /**
     * Get the details of a TV show.
     * @param id tv show id
     */
    public static async getDetailAsync(id: number): Promise<TvShow> {
        const url = URLBuilder.buildDetailURL('tv', id, 'keywords');
        return await APIUtils.fetchSingleOne(url, toTvShow);
    }

    /**
     * Get the details of a TV season.
     * @param id tv show id
     * @param seasonNumber season number
     */
    public static async getSeasonDetailAsync(
        id: number,
        seasonNumber: number,
    ): Promise<Season> {
        const url = URLBuilder.buildSeasonDetailURL(id, seasonNumber);
        return await APIUtils.fetchSingleOne(url, toSeason);
    }

    /**
     * Get the details of a TV season.
     * @param id tv show id
     * @param seasonNumber season number
     * @param episodeNumber episode number
     */
    public static async getEpisodeDetailAsync(
        id: number,
        seasonNumber: number,
        episodeNumber: number,
    ): Promise<Episode> {
        const url = URLBuilder.buildEpisodeDetailURL(
            id,
            seasonNumber,
            episodeNumber,
        );
        return await APIUtils.fetchSingleOne(url, toEpisode);
    }

    /**
     * Get a list of TV shows that air in the next 28 days by genre.
     * @param genreIds genre ids
     * @param page page number
     */
    public static async getOnTheAirByGenreAsync(
        genreIds: string,
        page: number = 1,
    ): Promise<PaginationResponseWrapper<TvShowElement>> {
        const [currentDate, nextDate] =
            getISODateRangeFromToday(upcomingVideoDays);

        const params = new URLSearchParams({
            'first_air_date.gte': currentDate,
            'first_air_date.lte': nextDate,
            with_genres: genreIds,
            page: `${page}`,
        });
        const url = URLBuilder.buildDiscoverURL('tv', params);

        return await APIUtils.fetchPagination(url, toTvShowElement);
    }
}

import unionBy from 'lodash/unionBy';

import { APIHandler, URLBuilder } from '@services';
import type { Genre } from '@shared/types';

export default class GenreService {
    private _hasFetched: boolean = false;
    private _hasMovieGenresFetched: boolean = false;
    private _hasTvShowGenresFetched: boolean = false;
    private _genres: Genre[] = [];
    private _movieGenres: Genre[] = [];
    private _tvShowGenres: Genre[] = [];
    private static _instance: GenreService;

    private constructor() {}

    public static get instance(): GenreService {
        return (GenreService._instance ??= new GenreService());
    }

    private static set instance(v: GenreService) {
        GenreService._instance = v;
    }

    public async fetchMovieGenres(): Promise<Genre[]> {
        if (this._hasMovieGenresFetched) {
            return this._movieGenres;
        }

        try {
            const url = URLBuilder.buildGenreListURL('movie');
            const json = await APIHandler.fetchJSON(url);
            this._movieGenres = json.genres;
            this._hasMovieGenresFetched = true;
        } catch (error: unknown) {
            console.error('Error fetching movie genres:', error);
        }
        return this._movieGenres;
    }

    public async fetchTvShowGenres(): Promise<Genre[]> {
        if (this._hasTvShowGenresFetched) {
            return this._tvShowGenres;
        }

        try {
            const url = URLBuilder.buildGenreListURL('tv');
            const json = await APIHandler.fetchJSON(url);
            this._tvShowGenres = json.genres;
            this._hasTvShowGenresFetched = true;
        } catch (error: unknown) {
            console.error('Error fetching tv series genres:', error);
        }
        return this._tvShowGenres;
    }

    public async fetchGenres(): Promise<Genre[]> {
        if (this._hasFetched) {
            return this._genres;
        }

        let [movieGenres, tvShowGenres] = await Promise.all([
            this.fetchMovieGenres(),
            this.fetchTvShowGenres(),
        ]);

        this._genres = unionBy(movieGenres, tvShowGenres, 'id');
        this._hasFetched = true;

        return this._genres;
    }

    public getMovieGenres(): Genre[] {
        return this._movieGenres;
    }

    public getTvShowGenres(): Genre[] {
        return this._tvShowGenres;
    }

    public getGenres(): Genre[] {
        return this._genres;
    }
}

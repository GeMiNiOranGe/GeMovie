import { ParamListBase } from '@react-navigation/native';
import {
    NativeStackNavigationProp,
    NativeStackScreenProps,
} from '@react-navigation/native-stack';
import {
    ColorValue,
    GestureResponderEvent,
    ListRenderItem,
} from 'react-native';

import type { MovieElement } from './Movie';
import type { CompanyElement } from './Company';
import type { TvShowElement } from './TvShow';
import type { CollectionElement } from './Collection';
import type { PersonElement } from './Person';

export type RootStackParamList = ParamListBase & {
    HomeScreen: undefined;
    SearchScreen: undefined;
    SearchSuggestionScreen: undefined;
    MovieDetailScreen: {
        movieId: number;
    };
    CompanyDetailScreen: {
        companyId: number;
    };
    PersonDetailScreen: {
        personId: number;
    };
    SeeAllScreen: undefined;
};

export type RootScreenProps<
    Screen extends keyof RootStackParamList = keyof RootStackParamList,
> = NativeStackScreenProps<RootStackParamList, Screen>;

export type RootTopTabProps = {
    navigation: NativeStackNavigationProp<ParamListBase>;
};

export type MovieSearchResultsTopTabProps = RootTopTabProps & {
    data: MovieElement[] | undefined;
};

export type TvShowSearchResultsTopTabProps = RootTopTabProps & {
    searchContent: string;
};

export type CompanySearchResultsTopTabProps = RootTopTabProps & {
    searchContent: string;
};

export type CollectionSearchResultsTopTabProps = RootTopTabProps & {
    searchContent: string;
};

export type MovieSearchCardProps = {
    item: MovieElement;
    index: number;
    listLength?: number | undefined;
    onPress?: ((event: GestureResponderEvent) => void) | undefined;
};

export type TvShowSearchCardProps = {
    item: TvShowElement;
    index: number;
    listLength?: number | undefined;
    onPress?: ((event: GestureResponderEvent) => void) | undefined;
};

export type CompanySearchCardProps = {
    item: CompanyElement;
    index: number;
    listLength?: number | undefined;
    onPress?: ((event: GestureResponderEvent) => void) | undefined;
};

export type CollectionSearchCardProps = {
    item: CollectionElement;
    index: number;
    listLength?: number | undefined;
    onPress?: ((event: GestureResponderEvent) => void) | undefined;
};

export type PersonSearchCardProps = {
    item: PersonElement;
    index: number;
    listLength?: number | undefined;
    onPress?: ((event: GestureResponderEvent) => void) | undefined;
};

export type LabelProps = {
    name?: string;
    value?: string | undefined;
    icon?: JSX.Element | undefined;
};

export type ExpandableTextProps = {
    text: string;
    numberOfLines: number;
};

export type IconProps = {
    size?: number | undefined;
    color?: ColorValue | number | undefined;
};

export type TabBarIconProps = {
    focused: boolean;
    color: string;
    size: number;
};

export type SearchResultsListProps<ItemT> = {
    data: ArrayLike<ItemT> | null | undefined;
    renderItem: ListRenderItem<ItemT> | null | undefined;
    isFooterLoading?: boolean | undefined;
    totalResults?: number | undefined;
    onEndReached?:
        | ((info: { distanceFromEnd: number }) => void)
        | null
        | undefined;
    keyExtractor?: ((item: ItemT, index: number) => string) | undefined;
};

export type SlideshowProps = {
    images: string[];
    titles: string[];
    releaseDates: string[];
    navigateToMovieDetail: (movieId: number) => void;
    movieIds: number[];
};

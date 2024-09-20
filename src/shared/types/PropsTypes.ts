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

import { MovieElement } from './Movie';
import { CompanyElement } from './Company';
import { TvShowElement } from './TvShow';

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
    CelebrityDetailScreen: {
        celebrityId: number;
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
    item: CompanyElement;
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
};

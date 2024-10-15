import type { ParamListBase } from '@react-navigation/native';
import type {
    NativeStackNavigationProp,
    NativeStackScreenProps,
} from '@react-navigation/native-stack';
import type {
    ColorValue,
    GestureResponderEvent,
    ListRenderItem,
    StyleProp,
    TextStyle,
    ViewStyle,
} from 'react-native';

import type { SearchElement, VideoElementBase } from '@shared/types';

export type RootStackParamList = ParamListBase & {
    HomeScreen: undefined;
    SearchScreen: undefined;
    SearchSuggestionScreen: undefined;
    TrendScreen: undefined;
    MovieDetailScreen: {
        movieId: number;
    };
    CompanyDetailScreen: {
        companyId: number;
    };
    PersonDetailScreen: {
        personId: number;
    };
    TvShowDetailScreen: {
        tvShowId: number;
    };
    CollectionDetailScreen: {
        collectionId: number;
    };
    SeeAllMovieScreen: undefined;
    SeeAllPersonScreen: undefined;
};

export type RootScreenProps<
    Screen extends keyof RootStackParamList = keyof RootStackParamList,
> = NativeStackScreenProps<RootStackParamList, Screen>;

export type SearchResultsTopTabBaseProps = {
    navigation: NativeStackNavigationProp<ParamListBase>;
    searchContent: string;
};

export type VideoSearchCardBaseProps<T extends VideoElementBase> =
    SearchCardProps<T>;

export type SearchCardProps<T extends SearchElement> = {
    item: T;
    index: number;
    listLength?: number | undefined;
    onPress?: ((event: GestureResponderEvent) => void) | undefined;
};

export type LabelProps = {
    style?: StyleProp<ViewStyle> | undefined;
    nameStyle?: StyleProp<TextStyle> | undefined;
    valueStyle?: StyleProp<TextStyle> | undefined;
    iconStyle?: StyleProp<ViewStyle> | undefined;
    name: string;
    value: string;
    icon?: JSX.Element | undefined;
};

export type LabelsProps = {
    style?: StyleProp<ViewStyle> | undefined;
    contentStyle?: StyleProp<ViewStyle> | undefined;
    distanceBetweenLabels?: number | undefined;
    data: LabelProps[];
};

export type ExpandableTextProps = {
    seeButtonPosition?: 'withText' | 'separate';
    text: string;
    numberOfLines?: number | undefined;
};

export type SectionProps = {
    style?: StyleProp<ViewStyle> | undefined;
    title: string;
    children?: React.ReactNode | undefined;
};

export type SectionLabelProps = {
    style?: StyleProp<ViewStyle> | undefined;
    name: string;
    value: string;
};

export type SectionItemProps = {
    style?: StyleProp<ViewStyle> | undefined;
    name: string;
    children?: React.ReactNode | undefined;
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
    listEmptyComponent?: React.JSX.Element | undefined;
    noResultsIcon?: React.JSX.Element | undefined;
    noResultsText?: string | undefined;
    noResultsSubtext?: string | undefined;
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

export type VideoProps = {
    type: 'movie' | 'tv' | 'collection';
    id: number | undefined;
};

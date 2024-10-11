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
    style?: StyleProp<ViewStyle>;
    nameStyle?: StyleProp<TextStyle>;
    valueStyle?: StyleProp<TextStyle>;
    iconStyle?: StyleProp<ViewStyle>;
    name: string;
    value: string;
    icon?: JSX.Element | undefined;
};

export type ExpandableTextProps = {
    text: string;
    numberOfLines?: number | undefined;
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
    movieId: number | undefined;
};

import type { ParamListBase } from '@react-navigation/native';
import type {
    NativeStackNavigationProp,
    NativeStackScreenProps,
} from '@react-navigation/native-stack';
import type {
    ColorValue,
    GestureResponderEvent,
    ImageResizeMode,
    ImageStyle,
    ListRenderItem,
    StyleProp,
    TextStyle,
    ViewStyle,
} from 'react-native';
import type { IconProps as IconsaxProps } from 'iconsax-react-native';

import type { CardElement, VideoElement, VideoType } from '@shared/types';
import { imageSize } from '@shared/constants';

export type RootStackParamList = ParamListBase & {
    HomeScreen: undefined;
    SearchScreen: undefined;
    SearchSuggestionScreen: undefined;
    TrendScreen: undefined;
    ContentListScreen: {
        id: number;
    };
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

export type CardBaseProps<E extends CardElement> = {
    item: E;
    index: number;
    listLength?: number | undefined;
    onPress?: ((event: GestureResponderEvent) => void) | undefined;
};

export type DetailCardProps<E extends CardElement> = CardBaseProps<E>;

export type CompactCardProps<E extends CardElement> = CardBaseProps<E>;

export type SimpleCardProps<E extends CardElement> = CardBaseProps<E>;

export type VideoCardBaseProps<E extends VideoElement> = CardBaseProps<E> & {
    showMedal?: boolean | undefined;
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
    style?: StyleProp<TextStyle>;
    seeButtonPosition?: 'withText' | 'separate';
    text: string;
    numberOfLines?: number | undefined;
};

export type SectionProps = {
    style?: StyleProp<ViewStyle> | undefined;
    title: string;
    subtitle?: string | undefined;
    moreButtonText?: string | undefined;
    onMoreButtonPress?: ((event: GestureResponderEvent) => void) | undefined;
    children?: React.ReactNode | undefined;
};

export type SectionContentProps = {
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

export type SectionItemsProps<ItemT> = {
    style?: StyleProp<ViewStyle> | undefined;
    name: string;
    data: ArrayLike<ItemT> | null | undefined;
    renderItem: ListRenderItem<ItemT> | null | undefined;
    keyExtractor?: ((item: ItemT, index: number) => string) | undefined;
};

export type SectionHorizontalListProps<ItemT> = {
    loading?: boolean | undefined;
    noResultText?: string | undefined;
    data: ArrayLike<ItemT> | null | undefined;
    renderItem: ListRenderItem<ItemT> | null | undefined;
    keyExtractor?: ((item: ItemT, index: number) => string) | undefined;
};

export type TouchableRippleLinkProps = {
    url: string;
    style?: StyleProp<ViewStyle> | undefined;
    children?: React.ReactNode | undefined;
    rippleColor?: ColorValue | undefined;
};

export type TMDBImageProps = {
    style?: StyleProp<ImageStyle> | undefined;
    size: keyof typeof imageSize;
    path: string | undefined;
    NotFoundComponent?: React.JSX.Element;
    resizeMode?: ImageResizeMode | undefined;
    blurRadius?: number | undefined;
    notFoundIcon?: IconsaxProps | undefined;
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

export type RecommendationProps = {
    id: number;
    type: VideoType;
    navigation: NativeStackNavigationProp<ParamListBase>;
};

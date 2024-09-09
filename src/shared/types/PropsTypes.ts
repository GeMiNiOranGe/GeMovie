import { ParamListBase } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ColorValue, GestureResponderEvent } from 'react-native';

import { MovieElement } from './Movie';
import { CompanyElement } from './Company';

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
};

export type RootScreenProps<
    Screen extends keyof RootStackParamList = keyof RootStackParamList,
> = NativeStackScreenProps<RootStackParamList, Screen>;

export type MovieSearchCardProps = {
    item: MovieElement;
    index?: number | undefined;
    onPress?: ((event: GestureResponderEvent) => void) | undefined;
};

export type LabelProps = {
    name: string;
    value?: string | undefined;
};

export type ExpandableTextProps = {
    text: string;
    numberOfLines: number;
};

export type CompanySearchCardProps = {
    item: CompanyElement;
    index?: number | undefined;
    onPress?: ((event: GestureResponderEvent) => void) | undefined;
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

import { ParamListBase } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { GestureResponderEvent } from 'react-native';

import { MovieElement } from './Movie';

export type RootStackParamList = ParamListBase & {
    HomeScreen: undefined;
    SearchScreen: undefined;
    SearchSuggestionScreen: undefined;
    MovieDetailScreen: {
        movieId: number;
    };
};

export type RootScreenProps<
    Screen extends keyof RootStackParamList = keyof RootStackParamList,
> = NativeStackScreenProps<RootStackParamList, Screen>;

export type MovieSearchCardProps = {
    item: MovieElement;
    index?: number;
    onPress?: (event: GestureResponderEvent) => void;
};

export type LabelProps = {
    name: string;
    value?: string;
};

export type ExpandableTextProps = {
    text: string;
    numberOfLines: number;
};

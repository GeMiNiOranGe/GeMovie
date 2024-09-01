import { ParamListBase } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { MovieElement } from './Movie';
import { ColorValue, StyleProp, TextStyle } from 'react-native';

export type RootStackParamList = ParamListBase & {
    HomeScreen: undefined;
    SearchScreen: undefined;
    SearchSuggestionScreen: undefined;
    MovieDetailScreen: {
        index: number;
        movieId: number;
    };
};

export type RootScreenProps<
    Screen extends keyof RootStackParamList = keyof RootStackParamList,
> = NativeStackScreenProps<RootStackParamList, Screen>;

export type HorizontalImageCardProps = {
    index: number;
    item: MovieElement;
    onPress: (event: number) => void;
};

export type LabelProps = {
    name: string;
    value?: string;
};

export type ExpandableTextProps = {
    text: string;
    numberOfLines: number;
};

export type SearchBarProps = {
    style?: StyleProp<TextStyle>;
    autoFocus?: boolean;
    placeholder?: string;
    placeholderTextColor?: ColorValue;
    onChangeText?: (text: string) => void;
    value?: string;
};

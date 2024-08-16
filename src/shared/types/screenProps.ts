import { ParamListBase } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Movie } from './movie';

export type SearchScreenProps = NativeStackScreenProps<
    ParamListBase,
    'SearchScreen'
>;

export type HorizontalImageCardProps = {
    index: number;
    item: Movie;
    onPress: (event: number) => void;
};

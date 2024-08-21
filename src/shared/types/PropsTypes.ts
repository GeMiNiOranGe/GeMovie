import { ParamListBase } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { MovieItem } from './Movie';

export type RootStackParamList = ParamListBase & {
    HomeScreen: undefined;
    SearchScreen: undefined;
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
    item: MovieItem;
    onPress: (event: number) => void;
};

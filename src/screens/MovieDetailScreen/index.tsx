import React from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import { MovieService, URLBuilder } from '@services';
import { MovieDetailScreenState, RootScreenProps } from '@shared/types';
import { getFormattedDate } from '@shared/utils';
import { ExpandableText, Label, Youtube } from '@components';
import { layout, themeColor } from '@shared/themes';
import styles from './style';

class MovieDetailScreen extends React.Component<
  RootScreenProps<'MovieDetailScreen'>,
  MovieDetailScreenState
> {
  public constructor(props: RootScreenProps<'MovieDetailScreen'>) {
    super(props);
    this.state = {
      movie: undefined,
    };
  }

  public override componentDidMount(): void {
    const { movieId } = this.props.route.params;

    MovieService.getDetailAsync(movieId).then(data =>
      this.setState({ movie: data }, () => {
        this.props.navigation.setOptions({ title: data.title });
      }),
    );
  }

  public override render(): React.JSX.Element {
    return (
      <SafeAreaView style={[layout.flex1, styles.container]}>
        <Image
          style={styles.backdrop}
          blurRadius={4}
          source={{
            uri: URLBuilder.buildImageURL(
              'w1280',
              this.state.movie?.backdropPath,
            ),
          }}
        />

        <ScrollView style={StyleSheet.absoluteFill}>
          <View style={styles.posterBox}>
            <LinearGradient
              style={styles.linearGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 0, y: 1 }}
              colors={['transparent', themeColor.primary.toString()]}
            />

            <View style={[StyleSheet.absoluteFill, layout.center]}>
              <Image
                style={styles.poster}
                source={{
                  uri: URLBuilder.buildImageURL(
                    'w342',
                    this.state.movie?.posterPath,
                  ),
                }}
              />
            </View>
          </View>

          <View style={styles.content}>
            <View style={styles.titleBox}>
              <Text style={styles.title}>{this.state.movie?.title}</Text>

              <Text style={styles.title}>
                {this.state.movie?.voteAverage} ({this.state.movie?.voteCount})
              </Text>
            </View>

            <ScrollView
              contentContainerStyle={styles.scrollLabel}
              horizontal
              showsHorizontalScrollIndicator={false}
            >
              <Label
                name='Release date'
                value={getFormattedDate(this.state.movie?.releaseDate)}
              />

              <Label
                name='Length'
                value={`${this.state.movie?.runtime} minutes`}
              />

              <Label
                name='Adult'
                value={this.state.movie?.adult ? 'Yes' : 'No'}
              />

              <Label
                name='Budget'
                value={`${this.state.movie?.budget.toLocaleString()} USD`}
              />

              <Label
                name='Revenue'
                value={`${this.state.movie?.revenue.toLocaleString()} USD`}
              />
            </ScrollView>

            <View style={styles.introductionBox}>
              <Text style={styles.text}>Introduction</Text>

              <ExpandableText
                text={`${this.state.movie?.overview}`}
                numberOfLines={3}
              />

              <Text style={styles.text}>
                Homepage: {this.state.movie?.homepage}
              </Text>

              <View>
                <Youtube type='movie' id={this.state.movie?.id} />
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

export default MovieDetailScreen;

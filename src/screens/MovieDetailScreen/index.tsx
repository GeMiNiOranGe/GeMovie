import React from 'react';
import { Image, SafeAreaView, ScrollView, Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import { TMDB_BASE_IMAGE_URL } from '@config';
import { imageSize } from '@shared/constants';
import { MovieDetailScreenState, RootScreenProps } from '@shared/types';
import { MovieService } from '@services';
import { getFormattedDate } from '@shared/utils';
import { ExpandableText, Label, Youtube } from '@components';
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
      <SafeAreaView style={styles.container}>
        <Image
          style={styles.backdropImage}
          blurRadius={4}
          source={{
            uri: `${TMDB_BASE_IMAGE_URL}/${imageSize.w1280}${this.state.movie?.backdropPath}`,
          }}
        />

        <ScrollView style={styles.absolute}>
          <View style={styles.posterSection}>
            <LinearGradient
              style={styles.linearGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 0, y: 1 }}
              colors={['transparent', 'pink']}
            />

            <View style={[styles.absolute, styles.center]}>
              <Image
                style={styles.posterImage}
                source={{
                  uri: `${TMDB_BASE_IMAGE_URL}/${imageSize.w342}${this.state.movie?.posterPath}`,
                }}
              />
            </View>
          </View>

          <View style={styles.content}>
            <View style={styles.titleSection}>
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

            <View style={styles.introductionSection}>
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

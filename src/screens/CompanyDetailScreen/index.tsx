/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { CompanyDetailScreenState, RootScreenProps } from '@shared/types';
import { CompanyService, URLBuilder } from '@services';
import { TMDB_API_KEY, TMDB_BASE_IMAGE_URL, TMDB_BASE_URL } from '@config';
import { imageSize } from '@shared/constants';
import { Label } from '@components';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icons from 'react-native-vector-icons/Ionicons';
import styles from './style';

class CompanyDetailScreen extends React.Component<
  RootScreenProps<'CompanyDetailScreen'>,
  CompanyDetailScreenState
> {
  public constructor(props: RootScreenProps<'CompanyDetailScreen'>) {
    super(props);
    this.state = {
      company: undefined,
      movies: [],
      randomMovie: undefined,
    };
  }

  public override componentDidMount(): void {
    const { companyId } = this.props.route.params;
    const movieUrl = `${TMDB_BASE_URL}/discover/movie?api_key=${TMDB_API_KEY}&language=en-US&page=1&with_companies=${companyId}`;

    fetch(movieUrl)
      .then(response => response.json())
      .then(movieData => {
        const movies = movieData.results;
        const randomMovie = movies[Math.floor(Math.random() * movies.length)];
        this.setState({
          movies: movieData.results,
          randomMovie: randomMovie,
        });
      });

    CompanyService.getDetailAsync(companyId).then(data =>
      this.setState({ company: data }),
    );
  }

  public override render(): React.JSX.Element {
    const { navigation } = this.props;
    const { randomMovie } = this.state;
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View style={styles.header}>
            {randomMovie?.poster_path ? (
              <Image
                source={{
                  uri: URLBuilder.buildImageURL(
                    'w780',
                    randomMovie.poster_path,
                  ),
                }}
                blurRadius={1}
                style={styles.headerImage}
              />
            ) : (
              <Text>No backdrop available</Text>
            )}
          </View>
          <LinearGradient
            style={styles.body}
            start={{ x: 1, y: 0 }}
            end={{ x: 0, y: 1 }}
            colors={['#FFEFBA', '#FFFFFF']}
          >
            <View>
              {this.state.company?.logoPath ? (
                <Image
                  style={styles.backdropImage}
                  resizeMode='contain'
                  source={{
                    uri: `${TMDB_BASE_IMAGE_URL}/${imageSize.w300}${this.state.company?.logoPath}`,
                  }}
                />
              ) : (
                <View style={styles.iconCircle}>
                  <Icon
                    name='institution'
                    size={60}
                    color='black'
                    style={styles.icon}
                  />
                </View>
              )}
            </View>
            <Text style={styles.LogoContent}>{this.state.company?.name}</Text>
            <ScrollView
              contentContainerStyle={styles.scrollContainer}
              horizontal
              showsHorizontalScrollIndicator={false}
            >
              {this.state.company?.originCountry && (
                <Label
                  icon={<Icon name='flag' size={20} color='black' />}
                  value={`${this.state.company.originCountry}`}
                />
              )}
              {this.state.company?.headquarters && (
                <Label
                  icon={<Icons name='location' size={20} color='black' />}
                  value={`${this.state.company.headquarters}`}
                />
              )}

              {this.state.company?.parentCompany?.name && (
                <Label
                  icon={<Icon name='building' size={20} color='black' />}
                  value={`${this.state.company.parentCompany.name}`}
                />
              )}

              {this.state.company?.homepage && (
                <Label
                  icon={<Icon name='link' size={20} color='black' />}
                  value={`${this.state.company.homepage}`}
                />
              )}
            </ScrollView>
            <View style={styles.containerMovie}>
              <Text style={styles.containerMovieText}>Most Popular Movies</Text>
              <FlatList
                data={this.state.movies}
                horizontal
                showsHorizontalScrollIndicator={false}
                keyExtractor={item => item.id.toString()}
                renderItem={({ item: movie }) => {
                  const imageUrl = URLBuilder.buildImageURL(
                    'w185',
                    movie.poster_path,
                  );
                  return (
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate('MovieDetailScreen', {
                          movieId: movie.id,
                        })
                      }
                    >
                      <Image
                        source={{ uri: imageUrl }}
                        style={styles.movieThumbnail}
                      />
                    </TouchableOpacity>
                  );
                }}
              />
            </View>
          </LinearGradient>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

export default CompanyDetailScreen;

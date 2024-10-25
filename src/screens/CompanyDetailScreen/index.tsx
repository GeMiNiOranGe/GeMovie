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
  Animated,
} from 'react-native';

import {
  CompanyDetailScreenState,
  LabelProps,
  RootScreenProps,
  Variant,
} from '@shared/types';
import { CompanyService, URLBuilder } from '@services';
import { TMDB_API_KEY, TMDB_BASE_IMAGE_URL, TMDB_BASE_URL } from '@config';
import { imageSize } from '@shared/constants';
import { Labels } from '@components';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Building, Building4, Flag } from 'iconsax-react-native';
import styles from './style';

const iconSize = 16;
const iconColor = 'black';
const iconVariant: Variant = 'Bold';

class CompanyDetailScreen extends React.Component<
  RootScreenProps<'CompanyDetailScreen'>,
  CompanyDetailScreenState
> {
  public constructor(props: RootScreenProps<'CompanyDetailScreen'>) {
    super(props);
    this.state = {
      company: undefined,
      movies: [],
    };
  }

  public override componentDidMount(): void {
    const { companyId } = this.props.route.params;
    const movieUrl = `${TMDB_BASE_URL}/discover/movie?api_key=${TMDB_API_KEY}&language=en-US&page=1&with_companies=${companyId}`;

    fetch(movieUrl)
      .then(response => response.json())
      .then(movieData => {
        this.setState({
          movies: movieData.results,
        });
      });

    CompanyService.getDetailAsync(companyId).then(data =>
      this.setState({ company: data }),
    );
  }

  private getLabels(): LabelProps[] {
    return [
      {
        name: 'Country',
        value: this.state.company?.originCountry || 'N/A',
        icon: <Flag size={iconSize} color={iconColor} variant={iconVariant} />,
      },
      {
        name: 'HeadQuarters',
        value: this.state.company?.headquarters || 'N/A',
        icon: (
          <Building size={iconSize} color={iconColor} variant={iconVariant} />
        ),
      },
      {
        name: 'Parent Company',
        value: this.state.company?.parentCompany?.name || 'N/A',
        icon: (
          <Building4 size={iconSize} color={iconColor} variant={iconVariant} />
        ),
      },
    ];
  }
  public override render(): React.JSX.Element {
    const { navigation } = this.props;
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View style={styles.header}>
            {this.state.movies !== undefined ? (
              <Image
                source={{
                  uri: URLBuilder.buildImageURL(
                    'w780',
                    this.state.movies[0]?.backdrop_path,
                  ),
                }}
                blurRadius={3}
                style={styles.headerImage}
              />
            ) : (
              <View>
                <Icon name='image' size={30} color='gray' />
              </View>
            )}
          </View>
          <View style={styles.body}>
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
            <Animated.View>
              <Text style={styles.LogoContent}>{this.state.company?.name}</Text>
            </Animated.View>
            <View style={styles.titleBody}>
              <Labels data={this.getLabels()} />
            </View>
            <View style={styles.containerMovie}>
              <Text style={styles.containerMovieText}>Most Popular Movies</Text>
              <FlatList
                data={this.state.movies}
                horizontal
                showsHorizontalScrollIndicator={false}
                keyExtractor={item => item.id.toString()}
                renderItem={({ item: movie }) => {
                  return (
                    <TouchableOpacity
                      onPress={() =>
                        navigation.push('MovieDetailScreen', {
                          movieId: movie.id,
                        })
                      }
                    >
                      <Image
                        source={{
                          uri: `${TMDB_BASE_IMAGE_URL}/${imageSize.w300}${movie.poster_path}`,
                        }}
                        style={styles.movieThumbnail}
                      />
                    </TouchableOpacity>
                  );
                }}
              />
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

export default CompanyDetailScreen;

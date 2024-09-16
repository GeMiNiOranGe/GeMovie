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

  public override render(): React.JSX.Element {
    const { navigation } = this.props;
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Image
            style={styles.backdropImage}
            resizeMode='contain'
            source={{
              uri: `${TMDB_BASE_IMAGE_URL}/${imageSize.w300}${this.state.company?.logoPath}`,
            }}
          />
          <Text style={styles.headerContent}>{this.state.company?.name}</Text>
        </View>
        <View style={styles.body}>
          <ScrollView
            contentContainerStyle={styles.scrollContainer}
            horizontal
            showsHorizontalScrollIndicator={false}
          >
            <Label
              name='Country'
              value={`${this.state.company?.originCountry}`}
            />
            <Label
              name='HeadQuarter'
              value={`${this.state.company?.headquarters}`}
            />
            <Label
              name='Parent Company'
              value={`${this.state.company?.parentCompany?.name}`}
            />
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
        </View>
      </SafeAreaView>
    );
  }
}

export default CompanyDetailScreen;

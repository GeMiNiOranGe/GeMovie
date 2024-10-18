import { TMDB_API_KEY, TMDB_BASE_IMAGE_URL, TMDB_BASE_URL } from '@config';
import {
  MovieElement,
  SuggestionProps,
  SuggestionState,
  TvShowElement,
} from '@shared/types';
import React from 'react';
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import styles from './styles';
import { imageSize } from '@shared/constants';

class Suggestion extends React.Component<SuggestionProps, SuggestionState> {
  public constructor(props: SuggestionProps) {
    super(props);
    this.state = {
      recommendItem: [],
    };
  }

  public override componentDidMount(): void {
    this.getData();
  }

  protected getData = async () => {
    const { id, genre, type } = this.props;
    if (!id) {
      return;
    }

    const endpoint = type === 'movie' ? 'movie' : 'tv';
    const url = `${TMDB_BASE_URL}/${endpoint}/${id}/recommendations?api_key=${TMDB_API_KEY}&language=en-US&page=1`;
    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      if (!Array.isArray(data.results)) {
        return;
      }
      const recommendItems: (MovieElement | TvShowElement)[] = data.results.map(
        (item: any) => {
          if (type === 'movie') {
            const movieItem: MovieElement = {
              ...item,
              genreIds: item.genre_ids || [],
              posterPath: item.poster_path,
            };
            return movieItem;
          } else {
            const tvItem: TvShowElement = {
              ...item,
              genreIds: item.genre_ids || [],
              posterPath: item.poster_path,
            };
            return tvItem;
          }
        },
      );

      const filteredItems = recommendItems.filter((item: any) => {
        if (!item.genreIds || !Array.isArray(item.genreIds)) {
          return false;
        }
        if (genre.length === 0) {
          return true;
        }

        return item.genreIds.some((genreId: number) => genre.includes(genreId));
      });

      this.setState({ recommendItem: filteredItems });
    } catch (error) {
      console.error('Error fetching recommendations:', error);
    }
  };

  public renderItem = ({ item }: { item: MovieElement | TvShowElement }) => {
    if ('originalTitle' in item) {
      return (
        <TouchableOpacity key={item.id} style={styles.itemContainer}>
          {item.posterPath ? (
            <Image
              source={{
                uri: `${TMDB_BASE_IMAGE_URL}/${imageSize.w342}${item.posterPath}`,
              }}
              style={styles.itemImage}
            />
          ) : (
            <View style={styles.placeholderImage}>
              <Text style={styles.placeholderText}>No Image</Text>
            </View>
          )}
          <Text style={styles.itemText} numberOfLines={2}>
            {item.title}
          </Text>
        </TouchableOpacity>
      );
    } else {
      return (
        <TouchableOpacity key={item.id} style={styles.itemContainer}>
          {item.posterPath ? (
            <Image
              source={{
                uri: `${TMDB_BASE_IMAGE_URL}/${imageSize.w342}${item.posterPath}`,
              }}
              style={styles.itemImage}
            />
          ) : (
            <View style={styles.placeholderImage}>
              <Text style={styles.placeholderText}>No Image</Text>
            </View>
          )}
          <Text style={styles.itemText} numberOfLines={2}>
            {item.name}
          </Text>
        </TouchableOpacity>
      );
    }
  };

  public override render() {
    const { recommendItem } = this.state;
    return (
      <View style={styles.container}>
        <Text style={styles.heading}>Recommendations</Text>
        {recommendItem.length > 0 ? (
          <FlatList
            data={recommendItem}
            renderItem={this.renderItem}
            keyExtractor={item => item.id.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.listContainer}
          />
        ) : (
          <Text style={styles.noDataText}>No recommendations available.</Text>
        )}
      </View>
    );
  }
}

export default Suggestion;

import React from 'react';
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native';

import { TMDB_API_KEY, TMDB_BASE_IMAGE_URL, TMDB_BASE_URL } from '@config';
import {
  MovieElement,
  SuggestionProps,
  SuggestionState,
  TvShowElement,
} from '@shared/types';
import { imageSize } from '@shared/constants';
import { toMovieElement, toTvShowElement } from '@shared/utils';
import styles from './styles';

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
    const { id, type } = this.props;
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

      const recommendItems = data.results.map((item: any) =>
        'original_title' in item ? toMovieElement(item) : toTvShowElement(item),
      );

      this.setState({ recommendItem: recommendItems });
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
      <>
        {recommendItem.length > 0 ? (
          <FlatList
            contentContainerStyle={styles.listContent}
            horizontal
            keyExtractor={item => item.id.toString()}
            showsHorizontalScrollIndicator={false}
            data={recommendItem}
            renderItem={this.renderItem}
          />
        ) : (
          <Text style={styles.noDataText}>No recommendations available.</Text>
        )}
      </>
    );
  }
}

export default Suggestion;

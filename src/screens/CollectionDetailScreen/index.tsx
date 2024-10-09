import React from 'react';
import { SafeAreaView, Text, ScrollView, View, Image } from 'react-native';
import { layout } from '@shared/themes';
import styles from './style';
import { CollectionDetailState, RootScreenProps } from '@shared/types';
import { TMDB_API_KEY, TMDB_BASE_IMAGE_URL, TMDB_BASE_URL } from '@config';
import { CollectionService } from '@services';
import { imageSize } from '@shared/constants';
import { ExpandableText, Label, Youtube } from '@components';

class CollectionDetailScreen extends React.Component<
  RootScreenProps<'CollectionDetailScreen'>,
  CollectionDetailState
> {
  public constructor(props: RootScreenProps<'CollectionDetailScreen'>) {
    super(props);
    this.state = {
      collection: undefined,
    };
  }

  public override componentDidMount(): void {
    const { collectionId } = this.props.route.params;
    if (!collectionId) {
      console.error('Collection ID is undefined');
      return;
    }

    const collectUrl = `${TMDB_BASE_URL}/collection/${collectionId}?api_key=${TMDB_API_KEY}`;
    fetch(collectUrl)
      .then(response => response.json())
      .then(collectionData => {
        this.setState({
          collection: collectionData,
        });
      })
      .catch(error => {
        console.error('Error fetching collection:', error);
      });

    CollectionService.getDetailAsync(collectionId).then(data =>
      this.setState({ collection: data }, () => {
        this.props.navigation.setOptions({ title: data.name });
      }),
    );
  }

  public override render(): React.JSX.Element {
    const { collection } = this.state;
    if (!collection) {
      return (
        <SafeAreaView style={[styles.container, layout.center]}>
          <Text style={styles.text}>Loading...</Text>
        </SafeAreaView>
      );
    }

    return (
      <ScrollView style={styles.container}>
        <SafeAreaView style={layout.center}>
          <View style={styles.head}>
            <Image
              style={styles.posterImage}
              source={{
                uri: `${TMDB_BASE_IMAGE_URL}/${imageSize.w342}${collection?.poster_path}`,
              }}
            />
          </View>
          <View style={[styles.body, styles.textOverlay]}>
            <View style={[styles.informCollection]}>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <Label
                  name='Language'
                  value={
                    this.state.collection?.parts[0]?.original_language || 'N/A'
                  }
                  style={styles.textOverlayText}
                />
                <Label
                  name='Release Date'
                  value={this.state.collection?.parts[0]?.release_date || 'N/A'}
                  style={styles.textOverlayText}
                />
                <Label
                  name='Popularity'
                  value={
                    this.state.collection?.parts[0].popularity?.toString() ||
                    'N/A'
                  }
                  style={styles.textOverlayText}
                />
                <Label
                  name='Vote Count'
                  value={
                    this.state.collection?.parts[0].vote_count?.toString() ||
                    'N/A'
                  }
                  style={styles.textOverlayText}
                />
                <Label
                  name='Vote Average'
                  value={
                    this.state.collection?.parts[0].vote_average?.toString() ||
                    'N/A'
                  }
                  style={styles.textOverlayText}
                />
                <Label
                  name='Genre'
                  value={
                    this.state.collection?.parts[0].genre_ids?.toString() ||
                    'N/A'
                  }
                  style={styles.textOverlayText}
                />
                <Label
                  name='18+'
                  value={this.state.collection?.parts[0].adult.toString()}
                  style={styles.textOverlayText}
                />
              </ScrollView>
            </View>
            <View style={styles.contentBody}>
              <Text style={styles.text}>Introduction</Text>
              <ExpandableText
                text={collection?.parts[0].overview || 'No overview available.'}
                numberOfLines={3}
                style={styles.textOverlayText}
              />
            </View>
            <View>
              <Youtube type='collection' id={collection?.parts[0].id} />
            </View>
          </View>
        </SafeAreaView>
      </ScrollView>
    );
  }
}

export default CollectionDetailScreen;

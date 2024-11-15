import React from 'react';
import { SafeAreaView, Text, ScrollView, View } from 'react-native';

import type { CollectionDetailState, RootScreenProps } from '@shared/types';
import { CollectionService } from '@services';
import { ExpandableText, FullScreenLoader, TMDBImage } from '@components';
import styles from './style';

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

  public override async componentDidMount(): Promise<void> {
    const { collectionId } = this.props.route.params;

    const collection = await CollectionService.getDetailAsync(collectionId);
    this.setState({ collection });
    this.props.navigation.setOptions({ title: collection.name });
  }

  public override render(): React.JSX.Element {
    if (!this.state.collection) {
      return <FullScreenLoader />;
    }

    return (
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <View style={styles.backdropBox}>
            <TMDBImage
              style={styles.backdrop}
              resizeMode='cover'
              blurRadius={5}
              path={this.state.collection.backdropPath}
              size='w780'
            />
          </View>

          <View style={[styles.content]}>
            <View style={styles.informCollection}>
              <View style={styles.posterBox}>
                <TMDBImage
                  style={styles.poster}
                  path={this.state.collection.posterPath}
                  size='w342'
                />
              </View>

              <Text style={styles.titleText}>{this.state.collection.name}</Text>
            </View>

            <View style={styles.contentBody}>
              <Text style={styles.text}>Introduction</Text>
              <ExpandableText text={this.state.collection.overview} />
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

export default CollectionDetailScreen;

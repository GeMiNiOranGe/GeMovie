import React from 'react';
import { SafeAreaView, Text, ScrollView, View, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import type { CollectionDetailState, RootScreenProps } from '@shared/types';
import { CollectionService } from '@services';
import { ExpandableText, FullScreenLoader, TMDBImage } from '@components';
import { getFormattedVoteAverage } from '@shared/utils';
import { colors, layout } from '@shared/themes';
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

    const collectionVoteAverage = (() => {
      let totalVoteAverage = 0;
      let numberOfMoviesWithVotes = 0;

      this.state.collection.parts.forEach(element => {
        if (element.voteCount > 0) {
          totalVoteAverage += element.voteAverage;
          numberOfMoviesWithVotes++;
        }
      });

      return numberOfMoviesWithVotes > 0
        ? totalVoteAverage / numberOfMoviesWithVotes
        : 0;
    })();

    return (
      <SafeAreaView style={[layout.flex1, styles.container]}>
        {this.state.collection.backdropPath && (
          <TMDBImage
            style={styles.backdrop}
            path={this.state.collection.backdropPath}
            size='w1280'
          />
        )}

        <ScrollView style={StyleSheet.absoluteFill}>
          <LinearGradient
            style={[StyleSheet.absoluteFill, styles.linearGradient]}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 0.5 }}
            colors={['transparent', colors.primary.toString()]}
          />

          <View style={[layout.row, styles.header]}>
            <View style={styles.posterBox}>
              <TMDBImage
                style={styles.poster}
                path={this.state.collection.posterPath}
                size='w342'
              />
            </View>

            <View style={[layout.flex1, styles.nameBox]}>
              <Text style={styles.name} numberOfLines={3}>
                {this.state.collection.name} {this.state.collection.name}
              </Text>

              <Text style={styles.subtext}>
                Number of Movies: {this.state.collection.parts.length}
              </Text>

              <Text style={styles.subtext}>
                Rating: {getFormattedVoteAverage(collectionVoteAverage)}
              </Text>
            </View>
          </View>

          <View style={styles.content}>
            <View style={styles.informationBox}>
              <Text style={styles.informationTitle}>Overview</Text>

              <ExpandableText
                text={
                  this.state.collection.overview || 'No overview available.'
                }
                seeButtonPosition='separate'
              />
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

export default CollectionDetailScreen;

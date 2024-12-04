import React from 'react';
import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import type { EpisodeDetailScreenState, RootScreenProps } from '@shared/types';
import { FullScreenLoader } from '@components';
import { TvShowService } from '@services';
import { layout } from '@shared/themes';
import styles from './style';

class EpisodeDetailScreen extends React.PureComponent<
  RootScreenProps<'EpisodeDetailScreen'>,
  EpisodeDetailScreenState
> {
  public constructor(props: RootScreenProps<'EpisodeDetailScreen'>) {
    super(props);
    this.state = {
      episode: undefined,
    };
  }

  public override async componentDidMount(): Promise<void> {
    const { tvShowId, seasonNumber, episodeNumber } = this.props.route.params;

    const episode = await TvShowService.getEpisodeDetailAsync(
      tvShowId,
      seasonNumber,
      episodeNumber,
    );

    this.setState({ episode });
    this.props.navigation.setOptions({ title: episode.name });
  }

  public override render(): React.JSX.Element {
    if (!this.state.episode) {
      return <FullScreenLoader />;
    }

    return (
      <SafeAreaView style={[layout.flex1, styles.container]}>
        <View style={[layout.flex1, layout.center]}>
          <Text style={styles.text}>{this.state.episode.name}</Text>
          <Text style={styles.text}>{this.state.episode?.seasonNumber}</Text>
          <Text style={styles.text}>{this.state.episode?.episodeNumber}</Text>
        </View>
      </SafeAreaView>
    );
  }
}

export default EpisodeDetailScreen;

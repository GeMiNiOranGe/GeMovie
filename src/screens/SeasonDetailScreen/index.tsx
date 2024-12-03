import React from 'react';
import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import type { RootScreenProps, SeasonDetailScreenState } from '@shared/types';
import { TvShowService } from '@services';
import { FullScreenLoader } from '@components';
import { layout } from '@shared/themes';
import styles from './style';

class SeasonDetailScreen extends React.PureComponent<
  RootScreenProps<'SeasonDetailScreen'>,
  SeasonDetailScreenState
> {
  public constructor(props: RootScreenProps<'SeasonDetailScreen'>) {
    super(props);
    this.state = {
      season: undefined,
    };
  }

  public override async componentDidMount(): Promise<void> {
    const { tvShowId, seasonNumber } = this.props.route.params;

    const season = await TvShowService.getSeasonDetailAsync(
      tvShowId,
      seasonNumber,
    );

    this.setState({ season });
    this.props.navigation.setOptions({ title: season.name });
  }

  public override render(): React.JSX.Element {
    if (!this.state.season) {
      return <FullScreenLoader />;
    }

    return (
      <SafeAreaView style={[layout.flex1, styles.container]}>
        <View style={[layout.flex1, layout.center]}>
          <Text style={styles.text}>{this.state.season.name}</Text>
          <Text style={styles.text}>{this.state.season.overview}</Text>
        </View>
      </SafeAreaView>
    );
  }
}

export default SeasonDetailScreen;

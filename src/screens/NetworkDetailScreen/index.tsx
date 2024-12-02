import React from 'react';
import { SafeAreaView, View, Text } from 'react-native';

import type { NetworkDetailScreenState, RootScreenProps } from '@shared/types';
import { NetworkService } from '@services';
import { FullScreenLoader } from '@components';
import { layout } from '@shared/themes';
import styles from './style';

class NetworkDetailScreen extends React.PureComponent<
  RootScreenProps<'NetworkDetailScreen'>,
  NetworkDetailScreenState
> {
  public constructor(props: RootScreenProps<'NetworkDetailScreen'>) {
    super(props);
    this.state = {
      network: undefined,
    };
  }

  public override async componentDidMount(): Promise<void> {
    const { networkId } = { networkId: 174 };

    const network = await NetworkService.getDetailAsync(networkId);

    this.setState({ network });
    this.props.navigation.setOptions({ title: network.name });
  }

  public override render(): React.JSX.Element {
    if (!this.state.network) {
      return <FullScreenLoader />;
    }

    return (
      <SafeAreaView style={[layout.flex1, styles.container]}>
        <View>
          <Text style={styles.text}>{this.state.network?.name}</Text>
          <Text style={styles.subtext}>
            {this.state.network?.originCountry}
          </Text>
        </View>
      </SafeAreaView>
    );
  }
}

export default NetworkDetailScreen;

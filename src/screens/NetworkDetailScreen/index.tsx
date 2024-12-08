import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  Location,
  Flag,
  IconProps as IconsaxProps,
  Global,
} from 'iconsax-react-native';

import { Television } from '@assets/icons';
import type {
  LabelProps,
  NetworkDetailScreenState,
  RootScreenProps,
  SvgIconProps,
} from '@shared/types';
import { NetworkService, VideoDiscoveryService } from '@services';
import {
  Box,
  FullScreenLoader,
  Labels,
  Section,
  TMDBImage,
  TMDBImageBackgroundLinearGradient,
  TouchableRippleLink,
  VideoHorizontalListSection,
} from '@components';
import { colors, layout } from '@shared/themes';
import styles from './style';

const labelIconsaxProps: IconsaxProps = {
  size: 16,
  color: colors.subtext.toString(),
  variant: 'Bold',
};

class NetworkDetailScreen extends React.PureComponent<
  RootScreenProps<'NetworkDetailScreen'>,
  NetworkDetailScreenState
> {
  public constructor(props: RootScreenProps<'NetworkDetailScreen'>) {
    super(props);
    this.state = {
      network: undefined,
      popularTvShows: [],
      topRatedTvShows: [],
      totalTvShows: 0,
    };
  }

  public override async componentDidMount(): Promise<void> {
    const { networkId } = this.props.route.params;

    const [network, popularTvShowResponse, topRatedTvShowResponse] =
      await Promise.all([
        NetworkService.getDetailAsync(networkId),
        VideoDiscoveryService.getTvShowByNetworkAsync(networkId.toString()),
        VideoDiscoveryService.getTvShowByNetworkAsync(
          networkId.toString(),
          'vote_average.desc',
        ),
      ]);

    this.setState({
      network,
      popularTvShows: popularTvShowResponse.getResults(),
      topRatedTvShows: topRatedTvShowResponse.getResults(),
      totalTvShows: popularTvShowResponse.getTotalResults(),
    });
    this.props.navigation.setOptions({ title: network.name });
  }

  private getLabels(): LabelProps[] {
    return [
      {
        name: 'Headquarters',
        value: this.state.network?.headquarters || '-',
        icon: <Location {...labelIconsaxProps} />,
      },
      {
        name: 'Country',
        value: this.state.network?.originCountry || '-',
        icon: <Flag {...labelIconsaxProps} />,
      },
      {
        name: 'Total tv series',
        value: this.state.totalTvShows.toString(),
        icon: <Television {...(labelIconsaxProps as SvgIconProps)} />,
      },
    ];
  }

  public override render(): React.JSX.Element {
    if (!this.state.network) {
      return <FullScreenLoader />;
    }

    return (
      <SafeAreaView style={[layout.flex1, styles.container]}>
        <ScrollView>
          <TMDBImageBackgroundLinearGradient
            contentContainerStyle={[
              layout.row,
              layout.itemsEnd,
              styles.titleBox,
            ]}
            path={this.state.popularTvShows[0]?.backdropPath}
            size='w300'
            blurRadius={4}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 0.5 }}
            colors={['transparent', colors.primary.toString()]}
          >
            <View style={styles.logoBox}>
              <TMDBImage
                style={styles.logo}
                resizeMode='contain'
                path={this.state.network?.logoPath}
                size='w300'
              />
            </View>

            <View style={[layout.flex1, styles.nameBox]}>
              <Text style={styles.name} numberOfLines={1}>
                {this.state.network?.name}
              </Text>
            </View>
          </TMDBImageBackgroundLinearGradient>

          <View style={styles.content}>
            <View style={[layout.itemsCenter, styles.labelBox]}>
              <Labels data={this.getLabels()} />
            </View>

            {this.state.network?.homepage && (
              <Box title='External link'>
                <View style={layout.itemsStart}>
                  <TouchableRippleLink
                    style={styles.homepageLink}
                    url={`${this.state.network?.homepage}`}
                  >
                    <View style={[layout.row, layout.itemsCenter]}>
                      <Global color={colors.text.toString()} />

                      <Text style={styles.homepageText}>Homepage</Text>
                    </View>
                  </TouchableRippleLink>
                </View>
              </Box>
            )}

            <Section.Separator />

            <VideoHorizontalListSection
              data={this.state.popularTvShows}
              type='tv'
              title='Popular TV series'
              navigation={this.props.navigation}
            />

            <VideoHorizontalListSection
              data={this.state.topRatedTvShows}
              type='tv'
              title='Top rated TV series'
              navigation={this.props.navigation}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

export default NetworkDetailScreen;

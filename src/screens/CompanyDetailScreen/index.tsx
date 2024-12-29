import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import {
  Location,
  VideoPlay,
  Flag,
  IconProps as IconsaxProps,
  Global,
} from 'iconsax-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import type {
  CompanyDetailScreenState,
  LabelProps,
  RootScreenProps,
  SvgIconProps,
} from '@shared/types';
import {
  Box,
  ExpandableText,
  FullScreenLoader,
  Labels,
  Section,
  TMDBImage,
  TMDBImageBackgroundLinearGradient,
  TouchablePanel,
  TouchableRippleLink,
  VideoHorizontalListSection,
} from '@components';
import { Television } from '@assets/icons';
import { CompanyService, VideoDiscoveryService } from '@services';
import { toMovieElement, toTvShowElement } from '@shared/utils';
import { colors, layout } from '@shared/themes';
import styles from './style';

const labelIconsaxProps: IconsaxProps = {
  size: 16,
  color: colors.subtext.toString(),
  variant: 'Bold',
};

class CompanyDetailScreen extends React.PureComponent<
  RootScreenProps<'CompanyDetailScreen'>,
  CompanyDetailScreenState
> {
  public constructor(props: RootScreenProps<'CompanyDetailScreen'>) {
    super(props);
    this.state = {
      company: undefined,
      popularMovies: [],
      popularTvShows: [],
      topRatedMovies: [],
      topRatedTvShows: [],
      totalMovies: 0,
      totalTvShows: 0,
    };

    this.pushCompanyDetailScreen = this.pushCompanyDetailScreen.bind(this);
  }

  public override async componentDidMount(): Promise<void> {
    const { companyId } = this.props.route.params;

    const [
      company,
      popularMovieResponse,
      popularTvShowResponse,
      topRatedMovieResponse,
      topRatedTvShowResponse,
    ] = await Promise.all([
      CompanyService.getDetailAsync(companyId),
      VideoDiscoveryService.getVideoByCompanyAsync(
        'movie',
        companyId.toString(),
        toMovieElement,
      ),
      VideoDiscoveryService.getVideoByCompanyAsync(
        'tv',
        companyId.toString(),
        toTvShowElement,
      ),
      VideoDiscoveryService.getVideoByCompanyAsync(
        'movie',
        companyId.toString(),
        toMovieElement,
        'vote_average.desc',
      ),
      VideoDiscoveryService.getVideoByCompanyAsync(
        'tv',
        companyId.toString(),
        toTvShowElement,
        'vote_average.desc',
      ),
    ]);

    this.setState({
      company,
      popularMovies: popularMovieResponse.getResults(),
      popularTvShows: popularTvShowResponse.getResults(),
      topRatedMovies: topRatedMovieResponse.getResults(),
      topRatedTvShows: topRatedTvShowResponse.getResults(),
      totalMovies: popularMovieResponse.getTotalResults(),
      totalTvShows: popularTvShowResponse.getTotalResults(),
    });
    this.props.navigation.setOptions({ title: company.name });
  }

  private getLabels(): LabelProps[] {
    return [
      {
        name: 'Headquarters',
        value: this.state.company?.headquarters || '-',
        icon: <Location {...labelIconsaxProps} />,
      },
      {
        name: 'Country',
        value: this.state.company?.originCountry || '-',
        icon: <Flag {...labelIconsaxProps} />,
      },
      {
        name: 'Total movies',
        value: this.state.totalMovies.toString(),
        icon: <VideoPlay {...labelIconsaxProps} />,
      },
      {
        name: 'Total tv series',
        value: this.state.totalTvShows.toString(),
        icon: <Television {...(labelIconsaxProps as SvgIconProps)} />,
      },
    ];
  }

  private pushCompanyDetailScreen(): void {
    this.props.navigation.push('CompanyDetailScreen', {
      companyId: this.state.company?.parentCompany?.id as number,
    });
  }

  public override render(): React.JSX.Element {
    if (!this.state.company) {
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
            path={this.state.popularMovies[0]?.backdropPath}
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
                path={this.state.company?.logoPath}
                size='w300'
              />
            </View>

            <View style={[layout.flex1, styles.nameBox]}>
              <Text style={styles.name} numberOfLines={1}>
                {this.state.company?.name}
              </Text>
            </View>
          </TMDBImageBackgroundLinearGradient>

          <View style={styles.content}>
            <View style={[layout.itemsCenter, styles.labelBox]}>
              <Labels data={this.getLabels()} />
            </View>

            <Box title='Description'>
              <ExpandableText seeButtonPosition='separate'>
                {this.state.company.description || 'No description available'}
              </ExpandableText>
            </Box>

            {this.state.company?.homepage && (
              <Box title='External link'>
                <View style={layout.itemsStart}>
                  <TouchableRippleLink
                    style={styles.homepageLink}
                    url={`${this.state.company?.homepage}`}
                  >
                    <View style={[layout.row, layout.itemsCenter]}>
                      <Global color={colors.text.toString()} />

                      <Text style={styles.homepageText}>Homepage</Text>
                    </View>
                  </TouchableRippleLink>
                </View>
              </Box>
            )}

            {this.state.company?.parentCompany && (
              <Box title='Parent company'>
                <TouchablePanel
                  name={this.state.company?.parentCompany.name}
                  imageStyle={styles.parentLogo}
                  imageContainerStyle={styles.parentLogoBox}
                  imagePath={this.state.company?.parentCompany.logoPath}
                  imageSize='w300'
                  imageResizeMode='contain'
                  backgroundPath={this.state.company?.parentCompany.logoPath}
                  backgroundSize='w300'
                  onPress={this.pushCompanyDetailScreen}
                />
              </Box>
            )}

            <Section.Separator />

            <VideoHorizontalListSection
              data={this.state.popularMovies}
              type='movie'
              title='Popular movies'
              navigation={this.props.navigation}
            />

            <VideoHorizontalListSection
              data={this.state.topRatedMovies}
              type='movie'
              title='Top rated movies'
              navigation={this.props.navigation}
            />

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

export default CompanyDetailScreen;

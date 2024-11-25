import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  type ListRenderItemInfo,
} from 'react-native';
import {
  Location,
  VideoPlay,
  Flag,
  IconProps as IconsaxProps,
} from 'iconsax-react-native';

import type {
  CompanyDetailScreenState,
  LabelProps,
  MovieElement,
  RootScreenProps,
  SvgIconProps,
  TvShowElement,
} from '@shared/types';
import {
  Box,
  CompactMovieCard,
  CompactTvShowCard,
  ExpandableText,
  FullScreenLoader,
  Labels,
  Section,
  TMDBImage,
  TMDBImageBackgroundLinearGradient,
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

class CompanyDetailScreen extends React.Component<
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

    this.renderMovieItem = this.renderMovieItem.bind(this);
    this.renderTvShowItem = this.renderTvShowItem.bind(this);
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

  private renderMovieItem({
    item,
    index,
  }: ListRenderItemInfo<MovieElement>): React.JSX.Element {
    return (
      <CompactMovieCard
        item={item}
        index={index}
        listLength={this.state.popularMovies.length}
        onPress={() =>
          this.props.navigation.push('MovieDetailScreen', {
            movieId: item.id,
          })
        }
      />
    );
  }

  private renderTvShowItem({
    item,
    index,
  }: ListRenderItemInfo<TvShowElement>): React.JSX.Element {
    return (
      <CompactTvShowCard
        item={item}
        index={index}
        listLength={this.state.popularTvShows.length}
        onPress={() =>
          this.props.navigation.push('TvShowDetailScreen', {
            tvShowId: item.id,
          })
        }
      />
    );
  }

  private pushCompanyDetailScreen() {
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

            {this.state.company?.parentCompany && (
              <Box title='Parent company'>
                <TouchableOpacity
                  style={layout.row}
                  activeOpacity={0.85}
                  onPress={this.pushCompanyDetailScreen}
                >
                  <>
                    <View style={styles.parentLogoBox}>
                      <TMDBImage
                        style={styles.parentLogo}
                        resizeMode='contain'
                        path={this.state.company?.parentCompany.logoPath}
                        size='w300'
                      />
                    </View>

                    <TMDBImageBackgroundLinearGradient
                      contentContainerStyle={[
                        layout.justifyCenter,
                        styles.parentNameBox,
                      ]}
                      path={this.state.company?.parentCompany.logoPath}
                      size='w300'
                      blurRadius={4}
                      colors={['transparent', colors.secondary.toString()]}
                    >
                      <Text style={styles.parentName} numberOfLines={2}>
                        {this.state.company?.parentCompany.name}
                      </Text>
                    </TMDBImageBackgroundLinearGradient>
                  </>
                </TouchableOpacity>
              </Box>
            )}

            <Section.Separator />

            <Section title='Popular movies'>
              <Section.HorizontalList
                keyExtractor={item => item.id.toString()}
                data={this.state.popularMovies}
                renderItem={this.renderMovieItem}
              />
            </Section>

            <Section.Separator />

            <Section title='Top rated movies'>
              <Section.HorizontalList
                keyExtractor={item => item.id.toString()}
                data={this.state.topRatedMovies}
                renderItem={this.renderMovieItem}
              />
            </Section>

            <Section.Separator />

            <Section title='Popular TV series'>
              <Section.HorizontalList
                keyExtractor={item => item.id.toString()}
                data={this.state.popularTvShows}
                renderItem={this.renderTvShowItem}
              />
            </Section>

            <Section.Separator />

            <Section title='Top rated TV series'>
              <Section.HorizontalList
                keyExtractor={item => item.id.toString()}
                data={this.state.topRatedTvShows}
                renderItem={this.renderTvShowItem}
              />
            </Section>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

export default CompanyDetailScreen;

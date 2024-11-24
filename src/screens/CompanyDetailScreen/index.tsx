import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  View,
  type ListRenderItemInfo,
} from 'react-native';
import {
  Building,
  Building4,
  Flag,
  IconProps as IconsaxProps,
} from 'iconsax-react-native';

import type {
  CompanyDetailScreenState,
  LabelProps,
  MovieElement,
  RootScreenProps,
} from '@shared/types';
import {
  CompactMovieCard,
  FullScreenLoader,
  Labels,
  Section,
  TMDBImage,
} from '@components';
import { CompanyService, VideoDiscoveryService } from '@services';
import { toMovieElement } from '@shared/utils';
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
      movies: [],
    };

    this.renderMovieItem = this.renderMovieItem.bind(this);
  }

  public override async componentDidMount(): Promise<void> {
    const { companyId } = this.props.route.params;

    const [company, moviesResponse] = await Promise.all([
      CompanyService.getDetailAsync(companyId),
      VideoDiscoveryService.getVideoByCompanyAsync(
        'movie',
        companyId.toString(),
        toMovieElement,
      ),
    ]);

    this.setState({ company, movies: moviesResponse.getResults() });
  }

  private getLabels(): LabelProps[] {
    return [
      {
        name: 'Headquarters',
        value: this.state.company?.headquarters || 'N/A',
        icon: <Building {...labelIconsaxProps} />,
      },
      {
        name: 'Country',
        value: this.state.company?.originCountry || 'N/A',
        icon: <Flag {...labelIconsaxProps} />,
      },
      {
        name: 'Parent Company',
        value: this.state.company?.parentCompany?.name || 'N/A',
        icon: <Building4 {...labelIconsaxProps} />,
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
        listLength={this.state.movies.length}
        onPress={() =>
          this.props.navigation.push('MovieDetailScreen', {
            movieId: item.id,
          })
        }
      />
    );
  }

  public override render(): React.JSX.Element {
    if (!this.state.company) {
      return <FullScreenLoader />;
    }

    return (
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <View style={styles.header}>
            <TMDBImage
              style={styles.headerImage}
              blurRadius={3}
              path={this.state.movies[0]?.backdropPath}
              size='w780'
            />
          </View>

          <View style={styles.body}>
            <View>
              <TMDBImage
                style={styles.backdropImage}
                resizeMode='contain'
                path={this.state.company?.logoPath}
                size='w300'
              />
            </View>

            <View>
              <Text style={styles.name}>{this.state.company?.name}</Text>
            </View>

            <View style={[layout.itemsCenter, styles.labelBox]}>
              <Labels data={this.getLabels()} />
            </View>

            <Section title={`${this.state.company?.name} movies`}>
              <Section.HorizontalList
                keyExtractor={item => item.id.toString()}
                data={this.state.movies}
                renderItem={this.renderMovieItem}
              />
            </Section>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

export default CompanyDetailScreen;

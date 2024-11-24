import React from 'react';
import {
  ImageBackground,
  SafeAreaView,
  ScrollView,
  Text,
  View,
  type ListRenderItemInfo,
} from 'react-native';
import {
  Location,
  Building4,
  Flag,
  IconProps as IconsaxProps,
} from 'iconsax-react-native';
import LinearGradient from 'react-native-linear-gradient';

import type {
  CompanyDetailScreenState,
  LabelProps,
  MovieElement,
  RootScreenProps,
} from '@shared/types';
import {
  Box,
  CompactMovieCard,
  ExpandableText,
  FullScreenLoader,
  Labels,
  Section,
  TMDBImage,
} from '@components';
import { CompanyService, URLBuilder, VideoDiscoveryService } from '@services';
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

    const [company, movieResponse] = await Promise.all([
      CompanyService.getDetailAsync(companyId),
      VideoDiscoveryService.getVideoByCompanyAsync(
        'movie',
        companyId.toString(),
        toMovieElement,
      ),
    ]);

    this.setState({ company, movies: movieResponse.getResults() });
    this.props.navigation.setOptions({ title: company.name });
  }

  private getLabels(): LabelProps[] {
    return [
      {
        name: 'Headquarters',
        value: this.state.company?.headquarters || 'N/A',
        icon: <Location {...labelIconsaxProps} />,
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
      <SafeAreaView style={[layout.flex1, styles.container]}>
        <ScrollView>
          <ImageBackground
            style={layout.flex1}
            blurRadius={4}
            source={{
              uri: URLBuilder.buildImageURL(
                'w300',
                this.state.movies[0]?.backdropPath,
              ),
            }}
          >
            <LinearGradient
              style={[
                layout.flex1,
                layout.row,
                layout.itemsEnd,
                styles.titleBox,
              ]}
              start={{ x: 0, y: 0 }}
              end={{ x: 0, y: 0.5 }}
              colors={['transparent', colors.primary.toString()]}
            >
              <View style={styles.backdropBox}>
                <TMDBImage
                  style={styles.backdrop}
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
            </LinearGradient>
          </ImageBackground>

          <View style={styles.content}>
            <View style={[layout.itemsCenter, styles.labelBox]}>
              <Labels data={this.getLabels()} />
            </View>

            {this.state.company.description && (
              <Box title='Description'>
                <ExpandableText seeButtonPosition='separate'>
                  {this.state.company.description}
                </ExpandableText>
              </Box>
            )}

            <Section.Separator />

            <Section title='Popular movies'>
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

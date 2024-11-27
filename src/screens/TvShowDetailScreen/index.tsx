import React from 'react';
import {
  ActivityIndicator,
  Animated,
  FlatList,
  Image,
  ListRenderItemInfo,
  Modal,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {
  RootScreenProps,
  TvShowDetailScreenState,
  LabelProps,
  Variant,
  CompanyElement,
} from '@shared/types';
import { TvShowService } from '@services';
import { TMDB_BASE_IMAGE_URL } from '@config';
import { imageSize, spacing } from '@shared/constants';
import {
  Credit,
  ExpandableText,
  Labels,
  Photo,
  Recommendation,
  Section,
  SimpleCompanyCard,
  TouchableRippleLink,
  Youtube,
} from '@components';
import LinearGradient from 'react-native-linear-gradient';
import {
  Calendar,
  Flag,
  Global,
  LanguageCircle,
  Star1,
  Image as ImageIcon,
} from 'iconsax-react-native';
import { Adult } from '@assets/icons';
import { getFormattedDate } from '@shared/utils';
import { colors, layout } from '@shared/themes';
import { Chip } from 'react-native-paper';
import styles from './style';

const iconSize = 16;
const iconColor = '#000';
const iconVariant: Variant = 'Bold';

class TvShowDetailScreen extends React.Component<
  RootScreenProps<'TvShowDetailScreen'>,
  TvShowDetailScreenState
> {
  public constructor(props: RootScreenProps<'TvShowDetailScreen'>) {
    super(props);
    this.state = {
      tv: undefined,
      modalVisible: false,
      isloading: false,
      animatedOpacity: new Animated.Value(0),
      animatedTranslateY: new Animated.Value(20),
      animatedOpacityImage: new Animated.Value(0),
      animatedTranslateYImage: new Animated.Value(0),
    };
    this.renderCompanyItem = this.renderCompanyItem.bind(this);
  }

  public override componentDidMount() {
    const { tvShowId } = this.props.route.params;
    TvShowService.getFullDetailAsync(tvShowId).then(data => {
      this.setState({ tv: data }, () => {
        this.props.navigation.setOptions({ title: data.name });
        this.state.animatedTranslateYImage.setValue(30);
        Animated.parallel([
          Animated.timing(this.state.animatedOpacity, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
          }),
          Animated.timing(this.state.animatedTranslateY, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true,
          }),
          Animated.timing(this.state.animatedOpacityImage, {
            toValue: 1,
            duration: 700,
            useNativeDriver: true,
          }),
          Animated.timing(this.state.animatedTranslateYImage, {
            toValue: 0,
            duration: 700,
            useNativeDriver: true,
          }),
        ]).start();
      });
    });
  }

  public toggleModal = () => {
    this.setState(prevState => ({
      modalVisible: !prevState.modalVisible,
      isloading: true,
    }));
    setTimeout(() => {
      this.setState({ modalVisible: true, isloading: false });
    }, 1000);
  };

  public closemodal = () => {
    this.setState({ modalVisible: false });
  };

  // private renderGenres(): React.JSX.Element | null {
  //   const { tv } = this.state;
  //   if (tv?.genres && tv.genres.length > 0) {
  //     return (
  //       <View>
  //         {tv.genres.map((genre, index) => (
  //           <Chip key={index} style={styles.genreChip} textStyle={styles.genre}>
  //             {genre.name}
  //           </Chip>
  //         ))}
  //       </View>
  //     );
  //   }
  //   return null;
  // }
  private renderStars(voteAverage: number): React.JSX.Element {
    const starCount = Math.round(voteAverage / 2);
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Text key={i} style={styles.star}>
          {i <= starCount ? '★' : '☆'}
        </Text>,
      );
    }
    return <View style={styles.starContainer}>{stars}</View>;
  }

  private getLabels(): LabelProps[] {
    const { tv } = this.state;
    return [
      {
        icon: (
          <Calendar size={iconSize} color={iconColor} variant={iconVariant} />
        ),
        name: 'First Air Date',
        value: getFormattedDate(tv?.firstAirDate) || 'N/A',
      },
      {
        icon: <Flag size={iconSize} color={iconColor} variant={iconVariant} />,
        name: 'Country',
        value: tv?.originCountry?.join(', ') || 'N/A',
      },
      {
        icon: <Adult size={iconSize} color={iconColor} />,
        name: 'Adult',
        value: tv?.adult ? 'Yes' : 'No',
      },
      {
        icon: (
          <LanguageCircle
            size={iconSize}
            color={iconColor}
            variant={iconVariant}
          />
        ),
        name: 'Language',
        value: tv?.originalLanguage?.toString() || 'N/A',
      },
      {
        icon: <Star1 size={iconSize} color={iconColor} variant={iconVariant} />,
        name: 'Popularity',
        value: tv?.popularity?.toString() || 'N/A',
      },
    ];
  }

  private renderCompanyItem({
    item,
    index,
  }: ListRenderItemInfo<CompanyElement>) {
    return (
      <SimpleCompanyCard
        item={item}
        index={index}
        listLength={this.state.tv?.productionCompanies.length}
        onPress={() => {
          this.props.navigation.push('CompanyDetailScreen', {
            companyId: item.id,
          });
        }}
      />
    );
  }

  public override render() {
    const {
      tv,
      modalVisible,
      isloading,
      animatedOpacity,
      animatedTranslateY,
      animatedOpacityImage,
      animatedTranslateYImage,
    } = this.state;
    if (!tv) {
      return (
        <SafeAreaView style={[layout.flex1, styles.container]}>
          <ActivityIndicator size='large' color='#0000ff' />
        </SafeAreaView>
      );
    }

    return (
      <SafeAreaView style={styles.container}>
        {isloading && (
          <View style={[layout.flex1, styles.loading]}>
            <ActivityIndicator size='large' color='#0000ff' />
          </View>
        )}
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <Animated.View
            style={[
              styles.headerContainer,
              {
                opacity: animatedOpacityImage,
                transform: [{ translateY: animatedTranslateYImage }],
              },
            ]}
          >
            <Image
              style={styles.backgroundImage}
              source={{
                uri: `${TMDB_BASE_IMAGE_URL}/${imageSize.w1280}${tv.backdropPath}`,
              }}
            />
            <LinearGradient
              style={styles.gradientOverlay}
              colors={['rgba(0,0,0,0.2)', 'transparent']}
            />
            <TouchableOpacity
              style={styles.playButton}
              onPress={this.toggleModal}
            >
              <Text style={styles.playButtonText}>▶</Text>
            </TouchableOpacity>
          </Animated.View>
          <View style={styles.bodyOverlay} />
          <Animated.View
            style={[
              styles.body,
              {
                opacity: animatedOpacity,
                transform: [{ translateY: animatedTranslateY }],
              },
            ]}
          >
            <Text style={styles.titleText}>{tv?.name}</Text>
            <View style={[layout.center, styles.genreBox]}>
              <FlatList
                contentContainerStyle={styles.genreContentList}
                horizontal
                showsHorizontalScrollIndicator={false}
                keyExtractor={item => item.id.toString()}
                data={tv?.genres}
                renderItem={({ item, index }) => {
                  const marginRight =
                    index === (tv?.genres.length || 0) - 1 ? 0 : spacing.small;

                  return (
                    <Chip
                      key={item.id}
                      style={[styles.genreChip, { marginRight }]}
                      textStyle={styles.genre}
                    >
                      {item.name}
                    </Chip>
                  );
                }}
              />
            </View>

            {tv.voteAverage && this.renderStars(tv.voteAverage)}
            <View style={[layout.center, layout.row, styles.actionArea]}>
              <TouchableRippleLink
                style={styles.homepageLink}
                url={`${this.state.tv?.homepage}`}
                rippleColor={colors.accent.light}
              >
                <Global color={colors.primary.toString()} />
              </TouchableRippleLink>
            </View>

            <View style={styles.titleBody}>
              <Labels data={this.getLabels()} />
            </View>

            <View style={styles.descriptionContainer}>
              <Text style={styles.introText}>Introduction</Text>
              <ExpandableText>
                {tv.overview || 'No overview available.'}
              </ExpandableText>
            </View>

            <Section title='Seasons'>
              {tv?.seasons && tv.seasons.length > 0 ? (
                <FlatList
                  data={tv.seasons}
                  keyExtractor={item => item.id.toString()}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  renderItem={({ item }) => (
                    <View key={item.id} style={styles.seasonItem}>
                      <Image
                        style={styles.seasonPoster}
                        source={{
                          uri: `${TMDB_BASE_IMAGE_URL}/${imageSize.w500}${item.poster_path}`,
                        }}
                      />
                      <Text style={styles.seasonTitle}>{item.name}</Text>
                      <Text style={styles.seasonDetails}>
                        {item.episode_count} Episodes
                      </Text>
                    </View>
                  )}
                  contentContainerStyle={styles.seasonsContainer}
                />
              ) : (
                <Text style={styles.noSeasonsText}>No seasons available</Text>
              )}
            </Section>
            <Section.Separator />
            <Section title='Networks'>
              {tv?.networks && tv.networks.length > 0 ? (
                <FlatList
                  data={tv.networks}
                  keyExtractor={item => item.id.toString()}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  renderItem={({ item }) => (
                    <View key={item.id} style={styles.networkItem}>
                      {item.logoPath ? (
                        <Image
                          style={styles.networkLogo}
                          source={{
                            uri: `${TMDB_BASE_IMAGE_URL}/${imageSize.w500}${item.logoPath}`,
                          }}
                        />
                      ) : (
                        <View style={[layout.flex1, layout.center]}>
                          <ImageIcon size={24} color={colors.text.toString()} />
                        </View>
                      )}
                      <Text style={styles.networkName}>{item.name}</Text>
                      <Text style={styles.networkCountry}>
                        {item.originCountry}
                      </Text>
                    </View>
                  )}
                  contentContainerStyle={styles.networksContainer}
                />
              ) : (
                <Text style={styles.noNetworksText}>No networks available</Text>
              )}
            </Section>
            <Section.Separator />
            <Section title='Cast'>
              {this.state.tv?.id && (
                <Credit
                  id={this.state.tv?.id}
                  type='tv'
                  navigation={this.props.navigation}
                />
              )}
            </Section>
            <Section.Separator />
            <Section title='Photos'>
              {this.state.tv?.id && (
                <Photo
                  id={this.state.tv?.id}
                  type='tv'
                  navigation={this.props.navigation}
                />
              )}
            </Section>
            <Section.Separator />
            <Section title='Details'>
              <Section.Content>
                <Section.Label
                  name='Original Title'
                  value={`${this.state.tv?.originalName}`}
                />

                <Section.Divider />

                <Section.Label
                  name='Release Date'
                  value={getFormattedDate(this.state.tv?.firstAirDate)}
                />

                <Section.Divider />

                <Section.Label
                  name='Country'
                  value={`${this.state.tv?.originCountry}`}
                />

                <Section.Divider />

                <Section.Label
                  name='Original Language'
                  value={`${this.state.tv?.originalLanguage}`}
                />

                <Section.Divider />

                <Section.Label
                  name='Country of Origin'
                  value={
                    Array.isArray(tv?.originCountry) &&
                    tv.originCountry.length > 0
                      ? tv.originCountry.join(', ')
                      : 'N/A'
                  }
                />

                <Section.Divider />
                <Section.Label
                  name='Language Spoken'
                  value={`${this.state.tv?.spokenLanguages
                    .map(language => language.name)
                    .join(', ')}`}
                />
                <Section.Divider />
                <Section.Label
                  name='Status'
                  value={`${this.state.tv?.status}`}
                />
                <Section.Divider />
                <Section.Label
                  name='Vote Average'
                  value={`${this.state.tv?.voteAverage}`}
                />
              </Section.Content>
            </Section>
            <Section.Items
              name='Production Companies'
              keyExtractor={item => item.id.toString()}
              data={this.state.tv?.productionCompanies}
              renderItem={this.renderCompanyItem}
            />

            <Section.Separator />
            <Section title='Recommendation'>
              <Recommendation
                type='tv'
                id={tv.id}
                navigation={this.props.navigation}
              />
            </Section>
          </Animated.View>

          {/* Modal */}
          <Modal
            animationType='slide'
            transparent={true}
            visible={modalVisible}
            onRequestClose={this.closemodal}
          >
            <TouchableOpacity
              style={styles.modalContainer}
              onPress={this.closemodal}
            >
              <TouchableWithoutFeedback>
                <View>
                  <Youtube type='tv' id={tv.id} videoType='Trailer' />
                </View>
              </TouchableWithoutFeedback>
            </TouchableOpacity>
          </Modal>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

export default TvShowDetailScreen;

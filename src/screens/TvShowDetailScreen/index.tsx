import React from 'react';
import {
  ActivityIndicator,
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
  Genre,
} from '@shared/types';
import { TvShowService } from '@services';
import { TMDB_BASE_IMAGE_URL } from '@config';
import { imageSize, spacing } from '@shared/constants';
import { ExpandableText, Labels, Suggestion, Youtube } from '@components';
import LinearGradient from 'react-native-linear-gradient';
import { Calendar, Flag, LanguageCircle, Star1 } from 'iconsax-react-native';
import { Adult } from '@assets/icons';
import { getFormattedDate } from '@shared/utils';
import { layout } from '@shared/themes';
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
    };
    this.renderGenreItem = this.renderGenreItem.bind(this);
  }

  public override componentDidMount() {
    const { tvShowId } = this.props.route.params;
    TvShowService.getDetailAsync(tvShowId).then(data => {
      console.log(data); // Check if `genres` is present and an array
      this.setState({ tv: data }, () => {
        this.props.navigation.setOptions({ title: data.name });
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

  private renderGenreItem({
    item,
    index,
  }: ListRenderItemInfo<Genre>): React.JSX.Element {
    const marginRight =
      index === (this.state.tv?.genres.length || 0) - 1 ? 0 : spacing.small;

    return (
      <Chip
        style={[styles.genreChip, { marginRight }]}
        textStyle={styles.genre}
      >
        {item.name}
      </Chip>
    );
  }

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

  public override render() {
    const { tv, modalVisible, isloading } = this.state;

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
          <View style={styles.headerContainer}>
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
          </View>
          <View style={styles.bodyOverlay} />
          <View style={styles.body}>
            <Text style={styles.titleText}>{tv?.name}</Text>
            {/* <View style={[layout.center, styles.genreBox]}>
              <FlatList
                contentContainerStyle={styles.genreContentList}
                horizontal
                showsHorizontalScrollIndicator={false}
                keyExtractor={item => item.id.toString()}
                data={tv?.genres || []}
                renderItem={this.renderGenreItem}
              />
            </View> */}
            {tv.voteAverage && this.renderStars(tv.voteAverage)}

            <View style={styles.titleBody}>
              <Labels data={this.getLabels()} />
            </View>

            <View style={styles.descriptionContainer}>
              <Text style={styles.introText}>Introduction</Text>
              <ExpandableText
                text={tv.overview || 'No overview available.'}
                numberOfLines={3}
              />
            </View>
            <Suggestion type='tv' id={tv.id} />
          </View>

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
                  <Youtube type='movie' id={tv?.id} />
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

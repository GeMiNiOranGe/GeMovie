import React from 'react';
import {
  Image,
  Modal,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import {
  RootScreenProps,
  TvShowDetailScreenState,
  LabelProps,
  Variant,
} from '@shared/types';
import { TvShowService } from '@services';
import { TMDB_BASE_IMAGE_URL } from '@config';
import { imageSize } from '@shared/constants';
import { ExpandableText, Labels, Suggestion, Youtube } from '@components';
import LinearGradient from 'react-native-linear-gradient';
import { Calendar, Flag, LanguageCircle, Star1 } from 'iconsax-react-native'; // Thêm các icon cần thiết
import { Adult } from '@assets/icons';
import { getFormattedDate } from '@shared/utils';
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
    };
  }

  public override componentDidMount() {
    const { tvShowId } = this.props.route.params;
    TvShowService.getDetailAsync(tvShowId).then(data =>
      this.setState({ tv: data }, () => {
        this.props.navigation.setOptions({ title: data.name });
      }),
    );
  }

  public toggleModal = () => {
    this.setState(prevState => ({ modalVisible: !prevState.modalVisible }));
  };

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
    const { tv, modalVisible } = this.state;
    if (!tv) {
      return (
        <SafeAreaView style={styles.container}>
          <Text>Loading...</Text>
        </SafeAreaView>
      );
    }

    return (
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <View style={styles.headerContainer}>
            <Image
              style={styles.backgroundImage}
              blurRadius={5}
              source={{
                uri: `${TMDB_BASE_IMAGE_URL}/${imageSize.w1280}${tv.backdropPath}`,
              }}
            />
            <View style={styles.head}>
              <TouchableOpacity onPress={this.toggleModal}>
                <Image
                  style={styles.posterImage}
                  source={{
                    uri: `${TMDB_BASE_IMAGE_URL}/${imageSize.w342}${tv.posterPath}`,
                  }}
                />
              </TouchableOpacity>
            </View>
          </View>
          <LinearGradient
            style={styles.body}
            start={{ x: 1, y: 1 }}
            end={{ x: 0, y: 0 }}
            colors={['#FFEFBA', '#FFFFFF']}
          >
            <Text style={styles.titleText}>{tv?.name}</Text>
            <View style={styles.titleBody}>
              <Labels data={this.getLabels()} />
            </View>
            <View style={styles.contentBody}>
              <Text style={styles.introText}>Introduction</Text>
              <ExpandableText
                text={tv.overview || 'No overview available.'}
                numberOfLines={3}
              />
            </View>
            <View style={styles.youtubeContainer}>
              {tv.id !== undefined && <Youtube type='tv' id={tv.id} />}
            </View>
            <View>
              <Suggestion type='tv' id={tv.id} />
            </View>
          </LinearGradient>

          <Modal
            animationType='slide'
            transparent={true}
            visible={modalVisible}
            onRequestClose={this.toggleModal}
          >
            <View style={styles.modalContainer}>
              <View style={styles.modalView}>
                <Image
                  style={styles.modalImage}
                  source={{
                    uri: `${TMDB_BASE_IMAGE_URL}/${imageSize.w500}${tv.posterPath}`,
                  }}
                />
                <TouchableOpacity
                  style={styles.closeButton}
                  onPress={this.toggleModal}
                >
                  <Text style={styles.closeButtonText}>Close</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

export default TvShowDetailScreen;

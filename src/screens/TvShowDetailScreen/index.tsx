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

import { RootScreenProps, TvShowDetailScreenState } from '@shared/types';
import { TvShowService } from '@services';
import { TMDB_BASE_IMAGE_URL } from '@config';
import { imageSize } from '@shared/constants';
import { ExpandableText, Label, Youtube } from '@components';
import styles from './style';
import LinearGradient from 'react-native-linear-gradient';

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
            <View style={styles.titleBody}>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <Label name='Name' value={tv.name?.toString() || 'N/A'} />
                <Label
                  name='Country'
                  value={tv.originCountry?.join(', ') || 'N/A'}
                />
                <Label
                  name='Popularity'
                  value={tv.popularity?.toString() || 'N/A'}
                />
                <Label
                  name='Vote Average'
                  value={tv.voteAverage?.toString() || 'N/A'}
                />
                <Label
                  name='Vote Count'
                  value={tv.voteCount?.toString() || 'N/A'}
                />
              </ScrollView>
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

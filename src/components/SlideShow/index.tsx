import React, { PureComponent } from 'react';
import {
  View,
  Image,
  Text,
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import Icon from 'react-native-vector-icons/FontAwesome';

import type { SlideshowProps, SlideshowState } from '@shared/types';
import { Youtube } from '@components';
import WatchList from '../WatchList';
import styles, { itemWidth } from './style';

class Slideshow extends PureComponent<SlideshowProps, SlideshowState> {
  public constructor(props: SlideshowProps) {
    super(props);
    this.state = {
      currentIndex: 0,
      isAutoplay: true,
      isModalVisible: false,
      selectedMovieId: null,
    };

    this.handleSnapToItem = this.handleSnapToItem.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.renderItem = this.renderItem.bind(this);
  }

  private handleSnapToItem(index: number): void {
    this.setState({ currentIndex: index });
  }

  private closeModal(): void {
    this.setState({ isModalVisible: false, selectedMovieId: null });
  }

  public renderItem({ index }: { index: number }): React.JSX.Element {
    const { props } = this;

    return (
      <TouchableOpacity
        style={styles.slide}
        onPress={() =>
          props.navigateToMovieDetail &&
          props.navigateToMovieDetail(props.movieIds[index])
        }
      >
        <View style={styles.watchlistContainer}>
          <WatchList id={this.props.movieIds[index]} type='movie' />
        </View>
        <Image source={{ uri: props.images[index] }} style={styles.image} />
        <View style={styles.contentContainer}>
          <View style={styles.textContainer}>
            <Text style={styles.title} numberOfLines={2} ellipsizeMode='tail'>
              {props.titles[index]}
            </Text>
            <Text style={styles.releaseDate}>{props.releaseDates[index]}</Text>
          </View>
          <TouchableOpacity
            onPress={() =>
              this.setState({
                isModalVisible: true,
                selectedMovieId: props.movieIds[index],
              })
            }
          >
            <Icon
              name='play-circle'
              size={30}
              color='#fff'
              style={styles.playIcon}
            />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  }

  public override render(): React.JSX.Element {
    const { images } = this.props;
    const { isModalVisible, selectedMovieId, isAutoplay } = this.state;

    return (
      <View style={styles.wrapper}>
        <Image
          source={{ uri: images[this.state.currentIndex] }}
          blurRadius={5}
          style={styles.backgroundImage}
        />
        <View style={styles.overlay} />
        <Carousel
          loop
          width={itemWidth}
          data={images}
          renderItem={this.renderItem}
          onSnapToItem={this.handleSnapToItem}
          autoPlay={isAutoplay}
          autoPlayInterval={3000}
          scrollAnimationDuration={1200}
          style={styles.carouselContainer}
          mode='parallax'
          modeConfig={{
            parallaxScrollingScale: 0.85,
            parallaxScrollingOffset: 30,
          }}
        />
        <Modal
          animationType='slide'
          transparent={true}
          visible={isModalVisible}
          onRequestClose={this.closeModal}
        >
          <TouchableOpacity
            style={styles.modalContainer}
            onPress={this.closeModal}
          >
            <TouchableWithoutFeedback>
              <View>
                {selectedMovieId && (
                  <Youtube
                    type='movie'
                    id={selectedMovieId}
                    videoType='Trailer'
                  />
                )}
              </View>
            </TouchableWithoutFeedback>
          </TouchableOpacity>
        </Modal>
      </View>
    );
  }
}

export default Slideshow;

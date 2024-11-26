import React, { PureComponent } from 'react';
import {
  View,
  Image,
  Text,
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import Youtube from '../Youtube';
import Carousel from 'react-native-reanimated-carousel';
import { SlideshowProps, SlideshowState } from '@shared/types';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles, { itemWidth } from '../SlideShow/style';

class Slideshow extends PureComponent<SlideshowProps, SlideshowState> {
  public constructor(props: SlideshowProps) {
    super(props);
    this.state = {
      currentIndex: 0,
      isAutoplay: true,
      isModalVisible: false,
      selectedMovieId: null,
    };
  }

  public handleSnapToItem = (index: number) => {
    this.setState({ currentIndex: index });
  };

  public closeModal = () => {
    this.setState({ isModalVisible: false, selectedMovieId: null });
  };

  public renderItem = ({ index }: { index: number }) => {
    const { props } = this;

    return (
      <View style={styles.slide}>
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
      </View>
    );
  };

  public override render() {
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

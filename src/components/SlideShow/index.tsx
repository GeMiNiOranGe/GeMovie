/* eslint-disable react-native/no-inline-styles */
import React, { PureComponent } from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  Text,
  FlatList,
  Animated,
  Modal,
  TouchableWithoutFeedback,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { SlideshowProps, SlideshowState } from '@shared/types';
import styles, { itemWidth } from '../SlideShow/style';
import Youtube from '../Youtube';
import LinearGradient from 'react-native-linear-gradient';

class Slideshow extends PureComponent<SlideshowProps, SlideshowState> {
  public scrollX = new Animated.Value(0);
  private flatListRef = React.createRef<FlatList<any>>();

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

  public ItemsChange = ({ viewableItems }: { viewableItems: any[] }) => {
    if (viewableItems.length > 0) {
      const index = viewableItems[0].index;
      if (index !== undefined && index !== this.state.currentIndex) {
        this.setState({ currentIndex: index });
      }
    }
  };

  public renderItem = ({ index }: { index: number }) => {
    const { scrollX, props } = this;
    const inputRange = [
      (index - 1) * itemWidth,
      index * itemWidth,
      (index + 1) * itemWidth,
    ];

    const scale = scrollX.interpolate({
      inputRange,
      outputRange: [0.95, 1, 0.95],
      extrapolate: 'clamp',
    });

    const opacity = scrollX.interpolate({
      inputRange,
      outputRange: [0.5, 1, 0.5],
      extrapolate: 'clamp',
    });

    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => props.navigateToMovieDetail(props.movieIds[index])}
        style={{ width: itemWidth, alignItems: 'center' }}
      >
        <Animated.View style={{ transform: [{ scale }], opacity }}>
          <Animated.Image
            source={{ uri: props.images[index] }}
            style={[
              styles.image,
              {
                transform: [{ scale }],
                opacity,
              },
            ]}
          />
          <View style={styles.contentContainer}>
            <View style={styles.textContainer}>
              <Text style={styles.title} numberOfLines={2} ellipsizeMode='tail'>
                {props.titles[index]}
              </Text>
              <Text style={styles.releaseDate}>
                {props.releaseDates[index]}
              </Text>
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
        </Animated.View>
      </TouchableOpacity>
    );
  };

  public keyExtractor = (item: any, index: number) => index.toString();
  public closemodal = () => {
    this.setState({ isModalVisible: false, selectedMovieId: null });
  };
  public override render() {
    const { images } = this.props;
    const { currentIndex, isModalVisible, selectedMovieId } = this.state;
    const backgroundImage = images[currentIndex];
    const overlayOpacity = this.scrollX.interpolate({
      inputRange: [0, images.length * itemWidth],
      outputRange: [0.6, 0.9],
      extrapolate: 'extend',
    });

    return (
      <View style={styles.wrapper}>
        <Image
          source={{ uri: backgroundImage }}
          blurRadius={10}
          style={styles.backgroundImage}
        />
        <LinearGradient
          colors={['rgba(0, 0, 0, 0.6)', 'transparent']}
          style={styles.gradientOverlay}
          start={{ x: 0, y: 1 }}
          end={{ x: 0, y: 0 }}
        />
        <Animated.View style={[styles.overlay, { opacity: overlayOpacity }]} />
        <Animated.FlatList
          ref={this.flatListRef}
          data={images}
          renderItem={this.renderItem}
          keyExtractor={this.keyExtractor}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          snapToAlignment='center'
          decelerationRate='fast'
          onViewableItemsChanged={this.ItemsChange}
          viewabilityConfig={{ itemVisiblePercentThreshold: 50 }}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: this.scrollX } } }],
            { useNativeDriver: false },
          )}
          scrollEventThrottle={16}
          contentContainerStyle={{ alignItems: 'center' }}
        />
        <Modal
          animationType='slide'
          transparent={true}
          visible={isModalVisible}
          onRequestClose={this.closemodal}
        >
          <TouchableOpacity
            style={styles.modalContainer}
            onPress={this.closemodal}
          >
            <TouchableWithoutFeedback>
              <View>
                {selectedMovieId && (
                  <Youtube type='movie' id={selectedMovieId} />
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

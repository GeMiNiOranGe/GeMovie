import React from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  Text,
  FlatList,
  Animated,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { SlideshowProps, SlideshowState } from '@shared/types';
import styles, { itemWidth } from '../SlideShow/style';

class Slideshow extends React.Component<SlideshowProps, SlideshowState> {
  public scrollX = new Animated.Value(0);
  private flatListRef = React.createRef<FlatList<any>>();
  private autoplayTimer: NodeJS.Timeout | null = null;

  public constructor(props: SlideshowProps) {
    super(props);
    this.state = {
      currentIndex: 0,
      isAutoplay: true,
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
      outputRange: [0.9, 1, 0.9],
      extrapolate: 'clamp',
    });

    const opacity = scrollX.interpolate({
      inputRange,
      outputRange: [0.7, 1, 0.7],
      extrapolate: 'clamp',
    });

    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => props.navigateToMovieDetail(props.movieIds[index])}
        style={styles.slide}
      >
        <Animated.View style={{ transform: [{ scale }], opacity }}>
          <Image source={{ uri: props.images[index] }} style={styles.image} />
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
              onPress={() => props.navigateToMovieDetail(props.movieIds[index])}
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

  private startAutoplay = () => {
    const { images } = this.props;
    if (this.autoplayTimer || !this.state.isAutoplay || images.length <= 1) {
      return;
    }

    this.autoplayTimer = setInterval(() => {
      let nextIndex = this.state.currentIndex + 1;
      if (nextIndex >= images.length) {
        nextIndex = 0;
      }
      this.setState({ currentIndex: nextIndex }, () => {
        this.scrollToIndex(nextIndex);
      });
    }, 5000);
  };

  private stopAutoplay = () => {
    if (this.autoplayTimer) {
      clearInterval(this.autoplayTimer);
      this.autoplayTimer = null;
    }
  };

  private scrollToIndex = (index: number) => {
    if (this.flatListRef.current) {
      this.flatListRef.current.scrollToIndex({ index, animated: true });
    }
  };

  public override componentDidMount() {
    this.startAutoplay();
  }

  public override componentWillUnmount() {
    this.stopAutoplay();
  }

  public override render() {
    const { images } = this.props;

    return (
      <View style={styles.wrapper}>
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
          onTouchStart={this.stopAutoplay}
          onTouchEnd={this.startAutoplay}
          onScrollToIndexFailed={info => {
            const wait = new Promise(resolve => setTimeout(resolve, 500));
            wait.then(() => {
              if (this.flatListRef.current) {
                this.flatListRef.current.scrollToIndex({
                  index: info.index,
                  animated: true,
                });
              }
            });
          }}
        />
      </View>
    );
  }
}

export default Slideshow;

import React from 'react';
import { View, Image, TouchableOpacity, Text } from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import Carousel from 'react-native-snap-carousel';
import { SlideshowProps } from '@shared/types';
import styles, { sliderWidth, itemWidth } from '../SlideShow/style';

class Slideshow extends React.Component<SlideshowProps> {
  private carousel: Carousel<any> | null = null;
  public constructor(props: SlideshowProps) {
    super(props);
    this.state = {
      currentIndex: 0,
    };
  }

  public handleSnapToItem = (index: number) => {
    this.setState({ currentIndex: index });
  };

  public renderItem = ({ item }: { item: any }) => {
    return (
      <TouchableOpacity
        onPress={() => item.navigateToMovieDetail(item.movieId)}
      >
        <Image source={{ uri: item.image }} style={styles.image} />
        <View style={styles.contentContainer}>
          <View style={styles.textContainer}>
            <Text style={styles.title} numberOfLines={2} ellipsizeMode='tail'>
              {item.title}
            </Text>
            <Text style={styles.releaseDate}>{item.releaseDate}</Text>
          </View>
          <TouchableOpacity>
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
  };

  public override render() {
    const { images, titles, releaseDates, movieIds, navigateToMovieDetail } =
      this.props;

    const slideshowData = images.map((image, index) => ({
      image,
      title: titles[index],
      releaseDate: releaseDates[index],
      movieId: movieIds[index],
      navigateToMovieDetail,
    }));

    return (
      <View style={styles.wrapper}>
        <Carousel
          ref={ref => (this.carousel = ref)}
          data={slideshowData}
          renderItem={this.renderItem}
          sliderWidth={sliderWidth}
          itemWidth={itemWidth}
          loop
          autoplay
          autoplayInterval={5000}
          inactiveSlideScale={0.8}
          inactiveSlideOpacity={0.7}
          containerCustomStyle={styles.carouselContainer}
          contentContainerCustomStyle={styles.carouselContentContainer}
          onSnapToItem={this.handleSnapToItem}
        />
      </View>
    );
  }
}

export default Slideshow;

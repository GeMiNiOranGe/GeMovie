import React from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { SlideshowProps } from '@shared/types';
import styles, { sliderWidth, itemWidth } from '../SlideShow/style';

class Slideshow extends React.Component<SlideshowProps> {
  private carousel: Carousel<any> | null = null;

  public renderItem = ({ item, index }: { item: string; index: number }) => {
    const { navigateToMovieDetail, movieIds } = this.props;
    return (
      <TouchableOpacity
        key={index}
        onPress={() => navigateToMovieDetail(movieIds[index])}
      >
        <Image source={{ uri: item }} style={styles.image} />
      </TouchableOpacity>
    );
  };

  public override render() {
    const { images } = this.props;

    return (
      <View style={styles.wrapper}>
        <Carousel
          ref={ref => (this.carousel = ref)}
          data={images}
          renderItem={this.renderItem}
          sliderWidth={sliderWidth}
          itemWidth={itemWidth}
          loop={true}
          autoplay={true}
          autoplayInterval={5000}
          inactiveSlideScale={0.8}
          inactiveSlideOpacity={0.7}
          containerCustomStyle={styles.carouselContainer}
          contentContainerCustomStyle={styles.carouselContentContainer}
        />
      </View>
    );
  }
}

export default Slideshow;

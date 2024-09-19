import React from 'react';
import Swiper from 'react-native-swiper';
import { View, Image, Text, TouchableOpacity } from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import { SlideshowProps } from '@shared/types';
import styles from '../SlideShow/style';

class Slideshow extends React.Component<SlideshowProps> {
  private swiper: Swiper | null = null;

  private handlePrevButton = () => {
    if (this.swiper) {
      this.swiper.scrollBy(-1, true);
    }
  };

  private handleNextButton = () => {
    if (this.swiper) {
      this.swiper.scrollBy(1, true);
    }
  };

  public override render() {
    const { images, titles, releaseDates, navigateToMovieDetail, movieIds } =
      this.props;

    return (
      <View style={styles.wrapper}>
        <Swiper
          ref={ref => {
            this.swiper = ref;
          }}
          autoplay
          autoplayTimeout={5}
          loop
          paginationStyle={styles.pagination}
          showsPagination={false}
        >
          {images.map((image, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => navigateToMovieDetail(movieIds[index])}
              style={styles.slide}
            >
              <Image source={{ uri: image }} style={styles.image} />
              <View style={styles.contentContainer}>
                <View style={styles.textContainer}>
                  <Text
                    style={styles.title}
                    numberOfLines={1}
                    ellipsizeMode='tail'
                  >
                    {titles[index]}
                  </Text>
                  <Text style={styles.releaseDate}>{releaseDates[index]}</Text>
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
          ))}
        </Swiper>

        <TouchableOpacity
          style={[styles.arrowButton, styles.prevButton]}
          onPress={this.handlePrevButton}
        >
          <Icon
            name='chevron-left'
            size={15}
            color='#fff'
            style={styles.playIcon}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.arrowButton, styles.nextButton]}
          onPress={this.handleNextButton}
        >
          <Icon
            name='chevron-right'
            size={15}
            color='#fff'
            style={styles.playIcon}
          />
        </TouchableOpacity>
      </View>
    );
  }
}

export default Slideshow;

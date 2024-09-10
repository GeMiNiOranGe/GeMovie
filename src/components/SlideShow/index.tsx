import React from 'react';
import Swiper from 'react-native-swiper';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import styles from '../SlideShow/style';

type SlideshowProps = {
  images: string[];
  titles: string[];
  releaseDates: string[];
};

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
    const { images, titles, releaseDates } = this.props;

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
            <View key={index} style={styles.slide}>
              <Image source={{ uri: image }} style={styles.image} />
              <View style={styles.textContainer}>
                <Text style={styles.title}>{titles[index]}</Text>
                <Text style={styles.releaseDate}>{releaseDates[index]}</Text>
              </View>
            </View>
          ))}
        </Swiper>

        <TouchableOpacity
          style={[styles.arrowButton, styles.prevButton]}
          onPress={this.handlePrevButton}
        >
          <Text style={styles.arrowText}>❮</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.arrowButton, styles.nextButton]}
          onPress={this.handleNextButton}
        >
          <Text style={styles.arrowText}>❯</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default Slideshow;

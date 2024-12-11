import React from 'react';
import { Dimensions, Text } from 'react-native';
import YoutubePlayer from 'react-native-youtube-iframe';
import { ActivityIndicator } from 'react-native-paper';

import { TMDB_API_KEY, TMDB_BASE_URL } from '@config';
import type { YoutubeProps, YoutubeState } from '@shared/types';
import { colors } from '@shared/themes';
import { calculateImageDimensions } from '@shared/utils';
import styles from './style';

const windowWidth = Dimensions.get('window').width;
const playerDimension = calculateImageDimensions(windowWidth, 16, 9);

class Youtube extends React.Component<YoutubeProps, YoutubeState> {
  public constructor(props: YoutubeProps) {
    super(props);
    this.state = {
      videoKey: null,
      loading: true,
    };
  }

  public override componentDidMount(): void {
    this.getVideo();
  }

  public override componentDidUpdate(prevProps: YoutubeProps): void {
    if (prevProps.id !== this.props.id || prevProps.type !== this.props.type) {
      this.setState({ loading: true }, this.getVideo);
    }
  }

  private getVideo = async () => {
    const { type, id, videoType } = this.props;
    let endpoint = type === 'movie' ? 'movie' : 'tv';

    try {
      const response = await fetch(
        `${TMDB_BASE_URL}/${endpoint}/${id}/videos?api_key=${TMDB_API_KEY}`,
      );
      const data = await response.json();

      const filteredVideos = data.results?.filter(
        (video: { type: any }) => video.type === videoType,
      );

      setTimeout(() => {
        this.setState({
          videoKey: filteredVideos?.[0]?.key || null,
          loading: false,
        });
      }, 500);
    } catch (error) {
      console.error(`Error fetching ${type} video:`, error);
      setTimeout(() => {
        this.setState({ loading: false });
      }, 500);
    }
  };

  public override render() {
    const { videoKey, loading } = this.state;

    if (loading) {
      return (
        <ActivityIndicator size='large' color={colors.secondary.toString()} />
      );
    }

    if (!videoKey) {
      return <Text style={styles.text}>No Video Available</Text>;
    }

    return (
      <YoutubePlayer
        {...playerDimension}
        videoId={videoKey}
        play={this.props.play}
      />
    );
  }
}

export default Youtube;

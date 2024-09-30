import { Text, View } from 'react-native';
import React from 'react';
import YoutubePlayer from 'react-native-youtube-iframe';
import { TMDB_API_KEY, TMDB_BASE_URL } from '@config';
import { VideoProps, YoutubeState } from '@shared/types';
import styles from './style';

class Youtube extends React.Component<VideoProps, YoutubeState> {
  public constructor(props: VideoProps) {
    super(props);
    this.state = {
      videoKey: null,
      loading: true,
    };
  }

  public override componentDidMount(): void {
    this.getVideo();
  }

  public override componentDidUpdate(prevProps: VideoProps): void {
    if (prevProps.movieId !== this.props.movieId) {
      this.getVideo();
    }
  }

  private getVideo = async () => {
    const { movieId } = this.props;
    try {
      const response = await fetch(
        `${TMDB_BASE_URL}/movie/${movieId}/videos?api_key=${TMDB_API_KEY}`,
      );
      const data = await response.json();
      if (data.results && data.results.length > 0) {
        this.setState({
          videoKey: data.results[0].key,
          loading: false,
        });
      } else {
        this.setState({ loading: false });
      }
    } catch (error) {
      console.error('Error fetching video:', error);
      this.setState({ loading: false });
    }
  };

  public override render() {
    const { videoKey } = this.state;
    if (!videoKey) {
      return (
        <View>
          <Text>No Video Available</Text>
        </View>
      );
    }
    return (
      <View style={styles.videoContainer}>
        <YoutubePlayer
          height={600}
          width={300}
          videoId={videoKey}
          play={false}
        />
      </View>
    );
  }
}
export default Youtube;

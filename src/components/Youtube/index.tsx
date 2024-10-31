import { Text, View, ActivityIndicator } from 'react-native';
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
    if (prevProps.id !== this.props.id || prevProps.type !== this.props.type) {
      this.setState({ loading: true }, this.getVideo);
    }
  }

  private getVideo = async () => {
    const { type, id } = this.props;
    let endpoint =
      type === 'movie' ? 'movie' : type === 'tv' ? 'tv' : 'collection';

    try {
      const response = await fetch(
        `${TMDB_BASE_URL}/${endpoint}/${id}/videos?api_key=${TMDB_API_KEY}`,
      );
      const data = await response.json();

      // Brief delay to allow loading indicator to show before rendering
      setTimeout(() => {
        this.setState({
          videoKey: data.results?.[0]?.key || null,
          loading: false,
        });
      }, 500); // Adjust delay as needed
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
        <View style={styles.loaderContainer}>
          <ActivityIndicator size='large' color='#0000ff' />
        </View>
      );
    }

    if (!videoKey) {
      return (
        <View>
          <Text style={styles.text}>No Video Available</Text>
        </View>
      );
    }

    return (
      <View style={styles.videoContainer}>
        <YoutubePlayer
          height={300}
          width={300}
          videoId={videoKey}
          play={false}
        />
      </View>
    );
  }
}

export default Youtube;

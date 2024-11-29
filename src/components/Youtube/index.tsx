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
    const { type, id, videoType } = this.props; // Add videoType to props
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

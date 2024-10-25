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
    if (prevProps.id !== this.props.id || prevProps.type !== this.props.type) {
      this.getVideo();
    }
  }

  private getVideo = async () => {
    const { type, id } = this.props;
    let endpoint = '';
    if (type === 'movie') {
      endpoint = 'movie';
    } else if (type === 'tv') {
      endpoint = 'tv';
    } else {
      endpoint = 'collection';
    }

    try {
      const response = await fetch(
        `${TMDB_BASE_URL}/${endpoint}/${id}/videos?api_key=${TMDB_API_KEY}`,
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
      console.error(`Error fetching ${type} video:`, error);
      this.setState({ loading: false });
    }
  };

  public override render() {
    const { videoKey, loading } = this.state;

    if (loading) {
      return (
        <View>
          <Text>Loading...</Text>
        </View>
      );
    }

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

import React, { Component } from 'react';
import {
  Modal,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Add, Star1 } from 'iconsax-react-native';
import {
  AuthContextProps,
  WatchListProps,
  WatchListState,
} from '@shared/types';
import { NavigationContext } from '@react-navigation/native';
import { AuthContext } from 'src/context/AuthContext';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from 'firebase.config';
import styles from './style';

class WatchList extends Component<WatchListProps, WatchListState> {
  public static override contextType = AuthContext;
  public override context: AuthContextProps | null = null;

  public constructor(props: WatchListProps) {
    super(props);
    this.state = {
      showModal: false,
      isWatchList: false,
    };
  }

  public override async componentDidMount() {
    const { username } = this.context || {};
    const { id, type } = this.props;

    if (username) {
      await this.checkWatchList(username, id, type);
    }
  }

  private handleWatchList = async () => {
    const { login, username } = this.context || {};
    const { id, type } = this.props;

    if (!login || !username) {
      this.setState({ showModal: true });
      return;
    } else {
      this.setState({ showModal: false });
      try {
        const userRef = doc(db, 'users', 'watchlist');
        const userDoc = await getDoc(userRef);
        let watchlistData = userDoc.exists()
          ? userDoc.data()?.username || {}
          : {};
        if (!watchlistData[username]) {
          watchlistData[username] = [];
        }

        const newWatchlist = { id, type };
        const currentWatchlist = watchlistData[username];
        const isWatchlistExists = currentWatchlist.some(
          (watchlist: { id: number; type: string }) =>
            watchlist.id === id && watchlist.type === type,
        );

        if (!isWatchlistExists) {
          watchlistData[username] = [...currentWatchlist, newWatchlist];
          await setDoc(userRef, { username: watchlistData });
          this.setState({ isWatchList: true });
        } else {
          watchlistData[username] = currentWatchlist.filter(
            (watchlist: { id: number; type: string }) =>
              watchlist.id !== id || watchlist.type !== type,
          );
          await setDoc(userRef, { username: watchlistData });
          this.setState({ isWatchList: false });
        }
      } catch (error) {
        console.error('Error saving favorite to Firestore:', error);
      }
    }
  };

  private handleCloseModal = () => {
    this.setState({ showModal: false });
  };

  private checkWatchList = async (
    username: string | null,
    id: number,
    type: string,
  ) => {
    if (!username) {
      return;
    }

    try {
      const userRef = doc(db, 'users', 'watchlist');
      const userDoc = await getDoc(userRef);
      let watchlistData = userDoc.exists()
        ? userDoc.data()?.username || {}
        : {};

      if (!watchlistData[username]) {
        watchlistData[username] = [];
      }

      const currentWatchlist = watchlistData[username];
      const isWatchList = currentWatchlist.some(
        (watchlist: { id: number; type: string }) =>
          watchlist.id === id && watchlist.type === type,
      );

      this.setState({ isWatchList });
    } catch (error) {
      console.error('Error checking favorite status:', error);
    }
  };

  public override render() {
    const { isWatchList, showModal } = this.state;

    return (
      <NavigationContext.Consumer>
        {navigation => (
          <>
            <TouchableOpacity
              style={styles.container}
              onPress={this.handleWatchList}
            >
              <Icon
                name='bookmark'
                size={40}
                color={isWatchList ? 'red' : 'rgba(0,0,0,0.5)'}
                style={styles.bookmarkIcon}
              />
              {isWatchList ? (
                <Star1
                  size='16'
                  color='yellow'
                  style={styles.starIcon}
                  variant='Bold'
                />
              ) : (
                <Add color='white' size={20} style={styles.addIcon} />
              )}
            </TouchableOpacity>

            <Modal
              visible={showModal}
              transparent
              animationType='fade'
              onRequestClose={this.handleCloseModal}
            >
              <TouchableWithoutFeedback onPress={this.handleCloseModal}>
                <View style={styles.modalOverlay}>
                  <View style={styles.modalContainer}>
                    <Text style={styles.modalText}>
                      Please Login to use this feature
                    </Text>
                    <TouchableOpacity
                      style={styles.button}
                      onPress={() => {
                        if (navigation) {
                          this.handleCloseModal();
                          navigation.navigate('UserStack', {
                            Screen: 'LoginScreen',
                          });
                        }
                      }}
                    >
                      <Text style={styles.buttonText}>Login</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </TouchableWithoutFeedback>
            </Modal>
          </>
        )}
      </NavigationContext.Consumer>
    );
  }
}

export default WatchList;

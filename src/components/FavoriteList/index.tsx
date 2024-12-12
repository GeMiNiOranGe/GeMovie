import React, { Component } from 'react';
import { Heart } from 'iconsax-react-native';
import {
  Modal,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

import { AuthContext } from 'src/context/AuthContext';
import {
  AuthContextProps,
  FavoriteListProps,
  FavoriteListState,
} from '@shared/types';
import styles from './style';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from 'firebase.config';

class FavoriteList extends Component<FavoriteListProps, FavoriteListState> {
  public static override contextType = AuthContext;
  public override context: AuthContextProps | null = null;
  public constructor(props: FavoriteListProps) {
    super(props);
    this.state = {
      showModal: false,
      isFavorite: false,
    };
  }

  public override async componentDidMount() {
    const { username } = this.context || {};
    const { id, type } = this.props;

    if (username) {
      await this.checkFavoriteStatus(username, id, type);
    }
  }

  private handleFavoriteItems = async () => {
    const { login, username } = this.context || {};
    const { id, type } = this.props;

    if (!login || !username) {
      this.setState({ showModal: true });
      return;
    } else {
      this.setState({ showModal: false });
      try {
        const userRef = doc(db, 'users', 'favorites');
        const userDoc = await getDoc(userRef);
        let favoritesData = userDoc.exists()
          ? userDoc.data()?.username || {}
          : {};
        if (!favoritesData[username]) {
          favoritesData[username] = [];
        }

        const newFavorite = { id, type };
        const currentFavorites = favoritesData[username];
        const isFavoriteExists = currentFavorites.some(
          (favorite: { id: number; type: string }) =>
            favorite.id === id && favorite.type === type,
        );

        if (!isFavoriteExists) {
          favoritesData[username] = [...currentFavorites, newFavorite];
          await setDoc(userRef, { username: favoritesData });
          this.setState({ isFavorite: true });
        } else {
          favoritesData[username] = currentFavorites.filter(
            (favorite: { id: number; type: string }) =>
              favorite.id !== id || favorite.type !== type,
          );
          await setDoc(userRef, { username: favoritesData });
          this.setState({ isFavorite: false });
        }
      } catch (error) {
        console.error('Error saving favorite to Firestore:', error);
      }
    }
  };

  private checkFavoriteStatus = async (
    username: string | null,
    id: number,
    type: string,
  ) => {
    if (!username) {
      return;
    }

    try {
      const userRef = doc(db, 'users', 'favorites');
      const userDoc = await getDoc(userRef);
      let favoritesData = userDoc.exists()
        ? userDoc.data()?.username || {}
        : {};

      if (!favoritesData[username]) {
        favoritesData[username] = [];
      }

      const currentFavorites = favoritesData[username];
      const isFavorite = currentFavorites.some(
        (favorite: { id: number; type: string }) =>
          favorite.id === id && favorite.type === type,
      );

      this.setState({ isFavorite });
    } catch (error) {
      console.error('Error checking favorite status:', error);
    }
  };

  private handleCloseModal = () => {
    this.setState({ showModal: false });
  };

  private navigateToLoginScreen = () => {
    const { navigation } = this.props;
    this.handleCloseModal();
    navigation.navigate('UserStack', { screen: 'LoginScreen' });
  };

  public override render() {
    const { isFavorite } = this.state;
    return (
      <>
        <TouchableOpacity
          style={styles.container}
          onPress={this.handleFavoriteItems}
        >
          <Heart
            size='25'
            color={isFavorite ? 'red' : 'white'}
            variant='Bold'
          />
        </TouchableOpacity>

        <Modal
          visible={this.state.showModal}
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
                  onPress={this.navigateToLoginScreen}
                >
                  <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      </>
    );
  }
}

export default FavoriteList;

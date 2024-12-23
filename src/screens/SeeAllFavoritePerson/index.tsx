import { FlatList, ListRenderItemInfo, View } from 'react-native';
import React, { Component } from 'react';

import { PersonService } from '@services';
import { doc, getDoc, onSnapshot } from 'firebase/firestore';
import { db } from 'firebase.config';
import { AuthContext } from 'src/context/AuthContext';
import {
  AuthContextProps,
  PersonElement,
  RootScreenProps,
  SeeAllFavoritePersonState,
} from '@shared/types';
import { CompactPersonCard, FullScreenLoader } from '@components';
import styles from './style';

export class SeeAllFavoritePerson extends Component<
  RootScreenProps<'SeeAllFavoritePerson'>,
  SeeAllFavoritePersonState
> {
  public static override contextType = AuthContext;
  public override context: AuthContextProps | null = null;
  public override state: SeeAllFavoritePersonState = {
    favoritePerson: [],
    isLoading: true,
  };

  public override async componentDidMount() {
    const { isLoggedIn } = this.context || {};
    if (isLoggedIn) {
      await this.fetchFavoritePerson();

      const userRef = doc(db, 'users', 'favorites');
      onSnapshot(userRef, this.fetchFavoritePerson);
    }
  }

  private fetchFavoritePerson = async () => {
    const { isLoggedIn, username } = this.context || {};

    if (!isLoggedIn || !username) {
      this.setState({ isLoading: false });
      return;
    }

    try {
      const userRef = doc(db, 'users', 'favorites');
      const userDoc = await getDoc(userRef);
      const favoritesData = userDoc.exists()
        ? userDoc.data()?.username || {}
        : {};

      const favoriteIds = favoritesData[username]?.filter(
        (favorite: { type: string }) => favorite.type === 'person',
      );

      if (favoriteIds) {
        const Movies = await Promise.all(
          favoriteIds.map(async ({ id }: { id: number }) =>
            PersonService.getDetailAsync(id),
          ),
        );
        this.setState({ favoritePerson: Movies, isLoading: false });
      } else {
        this.setState({ favoritePerson: [], isLoading: false });
      }
    } catch (error) {
      console.error('Error fetching favorite TV:', error);
      this.setState({ isLoading: false });
    }
  };

  private renderFavoriteMovieItem = ({
    item,
    index,
  }: ListRenderItemInfo<PersonElement>): React.JSX.Element => {
    return (
      <CompactPersonCard
        item={item}
        index={index}
        listLength={this.state.favoritePerson.length}
        onPress={() =>
          this.props.navigation.navigate('PersonDetailScreen', {
            personId: item.id,
          })
        }
      />
    );
  };

  public override render() {
    if (!this.state) {
      return <FullScreenLoader />;
    }

    if (this.state.isLoading) {
      return <FullScreenLoader />;
    }
    const { favoritePerson } = this.state;
    return (
      <View style={styles.container}>
        <FlatList
          data={favoritePerson}
          renderItem={this.renderFavoriteMovieItem}
          keyExtractor={item => item.id.toString()}
          numColumns={2}
          columnWrapperStyle={styles.movieCard}
          showsVerticalScrollIndicator={false}
        />
      </View>
    );
  }
}

export default SeeAllFavoritePerson;

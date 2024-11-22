import React from 'react';
import {
  FlatList,
  type ListRenderItem,
  type ListRenderItemInfo,
  ScrollView,
  Text,
} from 'react-native';
import { SearchNormal1 } from 'iconsax-react-native';
import { Chip, IconButton } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

import { GenreService } from '@services';
import { FullScreenLoader } from '@components';
import type {
  Genre,
  RootScreenProps,
  SearchSuggestionScreenState,
} from '@shared/types';
import { spacing } from '@shared/constants';
import { colors, layout } from '@shared/themes';
import styles from './style';

const searchIconSize = 24;

class SearchSuggestionScreen extends React.Component<
  RootScreenProps<'SearchSuggestionScreen'>,
  SearchSuggestionScreenState
> {
  public constructor(props: RootScreenProps<'SearchSuggestionScreen'>) {
    super(props);
    this.state = {
      movieGenres: [],
      tvShowGenres: [],
      isLoading: true,
    };

    this.renderHeaderRight = this.renderHeaderRight.bind(this);
    this.renderMovieGenreItem = this.renderMovieGenreItem.bind(this);
    this.renderTvShowGenreItem = this.renderTvShowGenreItem.bind(this);
  }

  public override async componentDidMount(): Promise<void> {
    this.props.navigation.setOptions({
      headerRight: this.renderHeaderRight,
    });

    const [movieGenres, tvShowGenres] = await Promise.all([
      GenreService.instance.fetchMovieGenres(),
      GenreService.instance.fetchTvShowGenres(),
    ]);

    this.setState({ movieGenres, tvShowGenres, isLoading: false });
  }

  private renderSearchIcon() {
    return (
      <SearchNormal1 size={searchIconSize} color={colors.text.toString()} />
    );
  }

  private renderHeaderRight() {
    return (
      <IconButton
        style={styles.searchIconButton}
        icon={this.renderSearchIcon}
        size={searchIconSize}
        onPress={() => this.props.navigation.navigate('SearchScreen')}
      />
    );
  }

  private renderMovieGenreItem({
    item,
    index,
  }: ListRenderItemInfo<Genre>): React.JSX.Element {
    const marginLeft = index % 2 !== 0 ? spacing.small : 0;

    // TODO: create a `Tag` component, instead of `Chip`, because with a font size of 16,
    // this is not a good choice when using `Chip`
    return (
      <Chip
        style={[layout.flex1, { marginLeft }, styles.genreChip]}
        textStyle={styles.genreChipText}
        onPress={() =>
          this.props.navigation.navigate('GenreDetailScreen', {
            genre: item,
          })
        }
      >
        {item.name}
      </Chip>
    );
  }

  private renderTvShowGenreItem({
    item,
    index,
  }: ListRenderItemInfo<Genre>): React.JSX.Element {
    const marginLeft = index % 2 !== 0 ? spacing.small : 0;

    // TODO: create a `Tag` component, instead of `Chip`, because with a font size of 16,
    // this is not a good choice when using `Chip`
    return (
      <Chip
        style={[layout.flex1, { marginLeft }, styles.genreChip]}
        textStyle={styles.genreChipText}
        onPress={() =>
          this.props.navigation.navigate('GenreDetailScreen', {
            genre: item,
          })
        }
      >
        {item.name}
      </Chip>
    );
  }

  private renderGenreList(
    headerTitle: string,
    data: Genre[],
    renderItem: ListRenderItem<Genre>,
  ) {
    return (
      <FlatList
        contentContainerStyle={styles.genreListContent}
        scrollEnabled={false}
        ListHeaderComponentStyle={styles.genreListHeader}
        ListHeaderComponent={
          <Text style={styles.genreListHeaderText}>{headerTitle}</Text>
        }
        numColumns={2}
        columnWrapperStyle={styles.genreColumnWrapper}
        keyExtractor={item => item.id.toString()}
        data={data}
        renderItem={renderItem}
      />
    );
  }

  public override render(): React.JSX.Element {
    if (this.state.isLoading) {
      return <FullScreenLoader />;
    }

    return (
      <SafeAreaView style={[layout.flex1, styles.container]}>
        <ScrollView>
          {this.renderGenreList(
            'Movie genres',
            this.state.movieGenres,
            this.renderMovieGenreItem,
          )}
          {this.renderGenreList(
            'TV series genres',
            this.state.tvShowGenres,
            this.renderTvShowGenreItem,
          )}
        </ScrollView>
      </SafeAreaView>
    );
  }
}

export default SearchSuggestionScreen;

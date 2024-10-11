import React from 'react';
import { SafeAreaView, Text, ScrollView, View, Image } from 'react-native';
import { layout } from '@shared/themes';
import styles from './style';
import {
  CollectionDetailState,
  RootScreenProps,
  LabelProps,
  Variant,
} from '@shared/types';
import { TMDB_BASE_IMAGE_URL } from '@config';
import { CollectionService } from '@services';
import { imageSize } from '@shared/constants';
import { ExpandableText, Labels, Youtube } from '@components';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Calendar, LanguageCircle, Star1 } from 'iconsax-react-native'; // Thêm các icon cần thiết
import { Adult } from '@assets/icons';

const iconSize = 16;
const iconColor = '#000';
const iconVariant: Variant = 'Bold';

class CollectionDetailScreen extends React.Component<
  RootScreenProps<'CollectionDetailScreen'>,
  CollectionDetailState
> {
  public constructor(props: RootScreenProps<'CollectionDetailScreen'>) {
    super(props);
    this.state = {
      collection: undefined,
    };
  }

  public override componentDidMount(): void {
    const { collectionId } = this.props.route.params;
    if (!collectionId) {
      console.error('Collection ID is undefined');
      return;
    }

    CollectionService.getDetailAsync(collectionId).then(data =>
      this.setState({ collection: data }, () => {
        this.props.navigation.setOptions({ title: data.name });
      }),
    );
  }

  private getLabels(): LabelProps[] {
    const { collection } = this.state;
    if (!collection || !collection.parts || collection.parts.length === 0) {
      return [];
    }

    const firstPart = collection.parts[0];

    return [
      {
        icon: (
          <LanguageCircle
            size={iconSize}
            color={iconColor}
            variant={iconVariant}
          />
        ),
        name: 'Language',
        value: firstPart.original_language || 'N/A',
      },
      {
        icon: (
          <Calendar size={iconSize} color={iconColor} variant={iconVariant} />
        ),
        name: 'Release Date',
        value: firstPart.release_date || 'N/A',
      },
      {
        icon: <Star1 size={iconSize} color={iconColor} variant={iconVariant} />,
        name: 'Popularity',
        value: firstPart.popularity?.toString() || 'N/A',
      },
      {
        icon: <Adult size={iconSize} color={iconColor} />,
        name: '18+',
        value: firstPart.adult ? 'Yes' : 'No',
      },
    ];
  }

  public override render(): React.JSX.Element {
    const { collection } = this.state;

    if (!collection) {
      return (
        <SafeAreaView style={[styles.container, layout.center]}>
          <Text style={styles.text}>Loading...</Text>
        </SafeAreaView>
      );
    }
    const hasParts = collection.parts && collection.parts.length > 0;
    const firstPart = hasParts ? collection.parts[0] : null;
    return (
      <ScrollView style={styles.container}>
        <SafeAreaView style={layout.center}>
          <View style={styles.head}>
            {collection?.backdrop_path ? (
              <>
                <Image
                  source={{
                    uri: `${TMDB_BASE_IMAGE_URL}/w780${collection?.backdrop_path}`,
                  }}
                  resizeMode='cover'
                  blurRadius={5}
                  style={styles.backdropImage}
                />
              </>
            ) : (
              <View style={[styles.backdropImage, layout.spaceBetweenRow]}>
                <Icon name='picture-o' size={50} color='black' />
              </View>
            )}
          </View>
          <View style={[styles.body]}>
            <View style={styles.informCollection}>
              <View style={styles.containerPoster}>
                <Image
                  style={styles.posterImage}
                  source={{
                    uri: `${TMDB_BASE_IMAGE_URL}/${imageSize.w342}${collection?.poster_path}`,
                  }}
                />
              </View>
              {collection ? (
                collection.backdrop_path ? (
                  <Text style={styles.titleText}>{collection.name}</Text>
                ) : (
                  <Text style={styles.titlenobackground}>
                    {collection.name}
                  </Text>
                )
              ) : null}
              <Labels data={this.getLabels()} />
            </View>
            {hasParts && (
              <View style={styles.contentBody}>
                <Text style={styles.text}>Introduction</Text>
                <ExpandableText
                  text={firstPart?.overview || 'No overview available.'}
                  numberOfLines={3}
                />
              </View>
            )}
            {hasParts && (
              <View>
                <Youtube type='collection' id={collection?.id} />
              </View>
            )}
          </View>
        </SafeAreaView>
      </ScrollView>
    );
  }
}

export default CollectionDetailScreen;

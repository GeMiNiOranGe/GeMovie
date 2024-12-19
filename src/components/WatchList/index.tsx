import { TouchableOpacity } from 'react-native';
import React, { Component } from 'react';

import styles from './style';
import Icon from 'react-native-vector-icons/Ionicons';
import { Add } from 'iconsax-react-native';

class WatchList extends Component {
  public override render() {
    return (
      <TouchableOpacity style={styles.container}>
        <Icon
          name='bookmark'
          size={40}
          color='rgb(0,0,0,0.8)'
          style={styles.bookmarkIcon}
        />
        <Add color='white' size={20} style={styles.addIcon} />
      </TouchableOpacity>
    );
  }
}

export default WatchList;

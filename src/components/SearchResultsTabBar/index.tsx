import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import type { MaterialTopTabBarProps } from '@react-navigation/material-top-tabs';
import { TouchableRipple } from 'react-native-paper';

import { colors } from '@shared/themes';
import { spacing } from '@shared/constants';
import styles from './style';

class SearchResultsTabBar extends React.PureComponent<MaterialTopTabBarProps> {
  public override render(): React.JSX.Element {
    return (
      <View style={styles.container}>
        <ScrollView
          horizontal
          contentContainerStyle={styles.contentContainer}
          showsHorizontalScrollIndicator={false}
          keyboardShouldPersistTaps='handled'
        >
          {this.props.state.routes.map((route, index) => {
            const { options } = this.props.descriptors[route.key];

            const title =
              options.title !== undefined ? options.title : route.name;

            const label =
              options.tabBarLabel !== undefined ? options.tabBarLabel : title;

            const isFocused = this.props.state.index === index;

            const onPress = () => {
              const event = this.props.navigation.emit({
                type: 'tabPress',
                target: route.key,
                canPreventDefault: true,
              });

              if (!isFocused && !event.defaultPrevented) {
                this.props.navigation.navigate(route.name, route.params);
              }
            };

            const onLongPress = () => {
              this.props.navigation.emit({
                type: 'tabLongPress',
                target: route.key,
              });
            };

            const dynamicStyleTagButton = {
              marginRight:
                index === this.props.state.routes.length - 1
                  ? 0
                  : spacing.small,
              backgroundColor: isFocused
                ? colors.secondary
                : colors.background,
            };

            return (
              <TouchableRipple
                style={[styles.tagButton, dynamicStyleTagButton]}
                key={route.name}
                borderless
                accessibilityRole='button'
                accessibilityState={isFocused ? { selected: true } : {}}
                accessibilityLabel={options.tabBarAccessibilityLabel}
                testID={options.tabBarTestID}
                onPress={onPress}
                onLongPress={onLongPress}
              >
                <Text
                  style={[
                    styles.tagText,
                    {
                      color: isFocused
                        ? colors.primary
                        : colors.subtext,
                    },
                  ]}
                >{`${label}`}</Text>
              </TouchableRipple>
            );
          })}
        </ScrollView>
      </View>
    );
  }
}

export default SearchResultsTabBar;

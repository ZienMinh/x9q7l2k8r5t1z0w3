import { RouteProp, useRoute, useIsFocused } from '@react-navigation/native';
import { useNavigation } from '../hooks/useNavigation';
import React, { useCallback, useEffect, useMemo } from 'react';
import { ImageBackground, Pressable, StyleSheet } from 'react-native';
import { SectionList, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ScreenContainer from '../components/ScreenContainer';
import { Config, StackParamList } from '../config/config';
import { getFSPath } from '../lib/utils';
import { useHeaderContext } from '../providers/HeaderProvider';
import { useTranslation } from 'react-i18next';

export type StoreMenuScreenProps = RouteProp<
  StackParamList,
  typeof Config['ROUTER']['STORE_MENU_SCREEN']
>;

const StoreMenuScreen = () => {
  //@ts-ignore
  const [t] = useTranslation('directions');
  const { params } = useRoute<StoreMenuScreenProps>();
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const setHeader = useHeaderContext();

  const { store } = params;
  const sectionData = useMemo(() => {
    console.log(JSON.stringify(store, null, 2));
    return store.categories.map(category => ({
      label: category.name,
      data: category.menu,
    }));
  }, [store]);

  useEffect(() => {
    if (isFocused) {
      setHeader({
        title: store.name,
        canGoBack: true,
        hidden: false,
      });
    }
  }, [setHeader, store.name, isFocused]);

  const imageUri = useMemo(() => {
    return {
      uri: 'https://www.airport-technology.com/wp-content/uploads/sites/14/2022/01/shutterstock_758602234-min-1038x778.jpg',
    };
    // return {
    //   uri: `file:///${getFSPath(store.imgBackground, 'images')}`,
    // };
  }, []);

  useEffect(() => {
    console.log(imageUri);
  }, [imageUri]);

  const navigateToNavigate = useCallback(() => {
    return navigation.navigate(Config.ROUTER.NAVIGATE_SCREEN, {
      instruction: {
        text: store.instruction,
        videoURL: `file:///${getFSPath(store.fileName, 'videos')}`,
        actions: store.actions,
      },
    });
  }, [navigation, store.actions, store.fileName, store.instruction]);

  return (
    <ImageBackground
      resizeMode="cover"
      source={imageUri}
      style={styles.container}>
      <View style={styles.bg_container}>
        <ScreenContainer
          paddingHorizontal={40}
          paddingVertical={20}
          showBackground={false}>
          <SectionList
            sections={sectionData}
            renderSectionHeader={({ section }) => (
              <View>
                <Text style={styles.sectionLabel}>• {section.label}</Text>
              </View>
            )}
            renderItem={({ item, index }) => (
              <View key={index}>
                <Text style={styles.menuLabel}>• {item}</Text>
              </View>
            )}
          />
        </ScreenContainer>
      </View>
      <View style={styles.btn_navigate}>
        <Pressable
          onPress={() => navigateToNavigate()}
          style={styles.itemMenuItem}>
          <Icon name="map-marker" size={22} color="#f5b914" />
          <Text style={styles.itemMenuText}>{t('label.navigate')}</Text>
        </Pressable>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  bg_container: {
    backgroundColor: '#171818cc',
    flex: 1,
  },

  sectionLabel: {
    color: '#fff',
    fontSize: 32,
    marginTop: 12,
    fontWeight: '600',
  },
  menuLabel: {
    color: '#fff',
    fontSize: 26,
    marginLeft: 30,
    fontWeight: '400',
    marginTop: 10,
  },

  itemMenuItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemMenuText: {
    color: '#f5b914',
    fontSize: 22,
    marginLeft: 4,
  },

  btn_navigate: {
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
});

export default StoreMenuScreen;

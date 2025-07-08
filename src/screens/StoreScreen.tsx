import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { FlatGrid } from 'react-native-super-grid';
import DirectionsMap from '../components/DirectionsMap';
import ScreenContainer from '../components/ScreenContainer';
import { useHeaderContext } from '../providers/HeaderProvider';
import { ttsService } from '../services/tts-service';
import { RouteProp, useIsFocused, useRoute } from '@react-navigation/native';
import { StackParamList } from '../config/config';
import { Config } from '../config/config';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '../hooks/useNavigation';
import { getFSPath } from '../lib/utils';
import { StoreItem } from '../types';

const itemDimension = 250;

const StoreScreen: React.FC = () => {
  const route =
    useRoute<
      RouteProp<StackParamList, typeof Config['ROUTER']['STORE_SCREEN']>
    >();
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  // @ts-ignore
  const [t] = useTranslation(route.params.key);
  const [tLang] = useTranslation('lang');
  const setHeader = useHeaderContext();
  const [show, setShow] = useState<StoreItem | null>(null);

  const storess = useMemo(() => {
    return t('stores', { returnObjects: true });
  }, [t]);

  useEffect(() => {
    if (isFocused) {
      ttsService.speak(tLang('voice'), t('navbar.title'));
      setHeader({
        title: t('navbar.title'),
        canGoBack: true,
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setHeader, isFocused]);

  const navigateToNavigate = useCallback(
    (store: StoreItem) => {
      return navigation.navigate(Config.ROUTER.NAVIGATE_SCREEN, {
        instruction: {
          text: store.instruction,
          videoURL: `file:///${getFSPath(store.fileName, 'videos')}`,
          actions: store.actions,
        },
      });
    },
    [navigation],
  );

  const navigateToStoreMenu = useCallback(
    (store: any) => {
      return navigation.navigate(Config.ROUTER.STORE_MENU_SCREEN, {
        store,
      });
    },
    [navigation],
  );

  return (
    <ScreenContainer>
      <View style={styles.container}>
        <FlatGrid
          style={styles.gridContainer}
          spacing={20}
          data={storess}
          itemDimension={itemDimension}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item, index }) => (
            <StoreItemComponent
              key={index}
              item={item}
              navigateToNavigate={navigateToNavigate}
              navigateToStoreMenu={navigateToStoreMenu}
              isShopping={route.params.key === 'shopping' ? true : false}
            />
          )}
        />
      </View>
      <DirectionsMap content={show} onClose={() => setShow(null)} />
    </ScreenContainer>
  );
};

type ItemProps = {
  item: StoreItem;
  isShopping: boolean;
  navigateToNavigate: (item: StoreItem) => void;
  navigateToStoreMenu: (store: StoreItem) => void;
};
const StoreItemComponent: React.FC<ItemProps> = ({
  item,
  isShopping,
  navigateToNavigate,
  navigateToStoreMenu,
}) => {
  const [t] = useTranslation('directions');
  const imageUri = useMemo(() => {
    return {
      uri: `file:///${getFSPath(item.icon, 'images')}`,
    };
  }, [item]);

  return (
    <View style={styles.item}>
      <View style={styles.itemContainer}>
        <Image
          source={imageUri}
          style={styles.itemLogo}
          borderRadius={!isShopping ? 200 : 10}
        />
        <Text style={styles.itemName} numberOfLines={2}>
          {item.name}
        </Text>
      </View>
      <View style={styles.itemMenuContainer}>
        <Pressable
          onPress={() => navigateToNavigate(item)}
          style={styles.itemMenuItem}>
          <Icon name="map-marker" size={22} color="#f5b914" />
          <Text style={styles.itemMenuText}>{t('label.navigate')}</Text>
        </Pressable>
        <Pressable
          onPress={() => navigateToStoreMenu(item)}
          style={styles.itemMenuItem}>
          <Icon name="menu" size={22} color="#f5b914" />
          <Text style={styles.itemMenuText}>{t('label.menu')}</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flex: 1,
  },
  gridContainer: {
    flex: 1,
    width: '100%',
  },
  item: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderRadius: 10,
  },
  itemContainer: {
    width: '100%',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 10,
  },
  itemLogo: {
    // width: 140,
    // height: 130,
    width: 110,
    height: 110,
    backgroundColor: '#fff',
    resizeMode: 'contain',
    marginTop: 5,
  },
  itemName: {
    fontSize: 24,
    fontWeight: '600',
    color: '#fff',
    marginTop: 10,
    textAlign: 'center',
    width: '100%',
  },
  itemMenuContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: 'rgba(0,0,0,0.1)',
    justifyContent: 'space-between',
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
});

export default StoreScreen;

import React, { useCallback } from 'react';
import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Pressable from '../Pressable';
import { getFSPath } from '../../lib/utils';

export type Place = {
  name: string;
  fileName: string;
  instruction: string;
  actions?: string;
  icon?: string;
};

type Props = {
  places: Place[];
  icons: ImageSourcePropType[];
  onPlacePressed: (place: Place) => void;
};

const DirectionListPlace: React.FC<Props> = ({
  places,
  icons,
  onPlacePressed,
}) => {
  return (
    <View style={styles.container}>
      {places.map((place, index) => {
        return (
          <DirectionPlace
            place={place}
            key={index}
            icon={
              place.icon
                ? { uri: getFSPath(place.icon, 'images') }
                : icons[index]
            }
            onPlacePressed={onPlacePressed}
          />
        );
      })}
    </View>
  );
};

type ItemProps = {
  place: Place;
  icon: ImageSourcePropType;
  onPlacePressed: (place: Place) => void;
};
const DirectionPlace: React.FC<ItemProps> = ({
  place,
  icon,
  onPlacePressed,
}) => {
  const handlePress = useCallback(() => {
    onPlacePressed(place);
  }, [onPlacePressed, place]);
  return (
    <Pressable onPress={handlePress}>
      <View style={styles.itemContainer}>
        <Image source={icon} style={styles.icon} />
        <Text style={styles.name}>{place.name}</Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  name: {
    fontSize: 30,
    fontWeight: '600',
    color: 'white',
    flex: 1,
  },
  itemContainer: {
    paddingVertical: 25,
    paddingHorizontal: 25,
    backgroundColor: '#ffffff11',
    borderRadius: 10,
    marginVertical: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    height: 40,
    width: 40,
    marginRight: 20,
  },
});

export default DirectionListPlace;

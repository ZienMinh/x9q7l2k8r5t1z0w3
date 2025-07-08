import React, { useMemo } from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';

type Props = Pick<ViewStyle, 'height' | 'width'>;

const Spacer: React.FC<Props> = ({ height, width }) => {
  const style = useMemo(() => {
    return StyleSheet.flatten([{ height }, { width }]);
  }, [height, width]);
  return <View style={style} />;
};

export default Spacer;

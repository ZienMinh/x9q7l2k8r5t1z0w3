import { StackParamList } from '../config/config';
import { useNavigation as useNavigationOrigin } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export const useNavigation = () => {
  return useNavigationOrigin<NativeStackNavigationProp<StackParamList>>();
};

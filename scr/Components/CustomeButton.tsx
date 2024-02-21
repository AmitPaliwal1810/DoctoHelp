import {FC} from 'react';
import {Pressable, Text} from 'react-native';

interface IProps {
  text: string;
  onClick: () => void;
  style?: StyleMedia;
  textStyle?: StyleMedia;
}

export const CustomeButton: FC<IProps> = ({
  text,
  onClick,
  style,
  textStyle,
}) => {
  return (
    <Pressable onPress={onClick} style={style} android_disableSound={true}>
      <Text style={textStyle}>{text}</Text>
    </Pressable>
  );
};

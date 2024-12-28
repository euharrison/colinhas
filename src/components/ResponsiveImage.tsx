import { Image, ImageProps, useImage } from "expo-image";
import { useWindowDimensions, View } from "react-native";
import { backgroundGray } from "../theme/colors";

export const ResponsiveImage = ({ ...props }: ImageProps) => {
  const window = useWindowDimensions();
  const image = useImage(props.source);

  if (!image) {
    return (
      <View
        style={{
          width: window.width,
          height: 50,
          backgroundColor: backgroundGray,
        }}
      />
    );
  }

  return (
    <Image
      {...props}
      source={image}
      style={{
        width: window.width,
        aspectRatio: image.width / image.height,
      }}
    />
  );
};

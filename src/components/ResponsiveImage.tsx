import { Image, ImageProps, useImage } from "expo-image";
import { useWindowDimensions } from "react-native";
import { FileLoading } from "./FileLoading";

export const ResponsiveImage = ({ ...props }: ImageProps) => {
  const window = useWindowDimensions();
  const image = useImage(props.source);

  if (!image) {
    return <FileLoading />;
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

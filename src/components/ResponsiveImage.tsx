import { Image, ImageProps } from "expo-image";
import { useState } from "react";
import { useWindowDimensions } from "react-native";

export const ResponsiveImage = ({ ...props }: ImageProps) => {
  const window = useWindowDimensions();
  const [image, setImage] = useState<{
    width: number;
    height: number;
  }>();

  const imageRatio = image ? image.height / image.width : undefined;

  return (
    <Image
      {...props}
      style={{
        width: window.width,
        aspectRatio: imageRatio ? 1 / imageRatio : undefined,
      }}
      onLoad={(e) => {
        const { width, height } = e.source;
        setImage({ width, height });
      }}
    />
  );
};

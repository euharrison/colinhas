import "@react-pdf-viewer/core/lib/styles/index.css";

import { SpecialZoomLevel, Viewer, ViewMode } from "@react-pdf-viewer/core";
import { useWindowDimensions, View } from "react-native";
import { pagePadding } from "../theme/sizes";
import { FileLoading } from "./FileLoading";

export const PdfViewer = ({ url }: { url: string }) => {
  const { width } = useWindowDimensions();
  const extraMargin = 10;

  return (
    <View
      pointerEvents="none"
      style={{
        width: width + 2 * extraMargin,
        marginHorizontal: -pagePadding - extraMargin,
        overflow: "hidden",
      }}
    >
      <Viewer
        defaultScale={SpecialZoomLevel.PageWidth}
        fileUrl={url}
        viewMode={ViewMode.SinglePage}
        renderLoader={() => <FileLoading />}
      />
    </View>
  );
};

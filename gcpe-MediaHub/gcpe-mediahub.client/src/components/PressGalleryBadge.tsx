import * as React from "react";
import { Badge } from "@fluentui/react-components";
import { Crown16Regular as CrownIcon } from "@fluentui/react-icons";

export const PressGalleryBadge: React.FC = () => {
  return (
    <Badge
      size="medium"
      icon={<CrownIcon />}
      appearance="filled"
      shape="circular"
      color="important"
      style={{
        width: "20px",
        height: "20px",
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    />
  );
};
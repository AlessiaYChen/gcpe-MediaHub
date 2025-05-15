import * as React from "react";
import { Badge } from "@fluentui/react-components";
import { CrownRegular as CrownIcon } from "@fluentui/react-icons";

export const PressGalleryBadge: React.FC = () => {
  return (
    <Badge
      size="medium"
      icon={<CrownIcon />}
      appearance="filled"
      shape="circular"
      color="important"
    />
  );
};
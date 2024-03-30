import { useMemo } from "react";

export const DateComponent = ({
  timestamp,
  format,
}: {
  timestamp: number | string | Date;
  format: Intl.DateTimeFormatOptions;
}) => {
  const formattedDate = useMemo(() => {
    const timestampDate = new Date(timestamp);
    return timestampDate.toLocaleDateString("en-US", format);
  }, [timestamp, format]);

  return <span>{formattedDate}</span>;
};

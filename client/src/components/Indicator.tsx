import React from "react";

interface IndicatorProps {
  leftPosition: number;
}

export const Indicator: React.FC<IndicatorProps> = ({ leftPosition }) => (
  <div className="indicator" style={{ left: leftPosition }}></div>
);

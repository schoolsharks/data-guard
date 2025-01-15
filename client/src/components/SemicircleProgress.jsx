import { useTheme } from "@mui/material";
import React, { useEffect, useRef } from "react";

const SemicircleProgress = ({
  value,
  label = "PAT",
  color,
  width = 290,
  trackColor = "#eee",
  strokeWidth = 10,
  leftAmount = "₹500000",
  rightAmount = "₹0"
}) => {
  const theme = useTheme();
  const pathRef = useRef(null);
  const endpointRef = useRef(null);
  const PATH_LENGTH = 251.2;

  useEffect(() => {
    updateGauge(value);
  }, [value]);

  const updateGauge = (newValue) => {
    const normalizedValue = Math.min(100, Math.max(0, newValue));
    const offset = PATH_LENGTH - (PATH_LENGTH * normalizedValue) / 100;

    if (endpointRef.current) {
      const angle = (normalizedValue / 100) * Math.PI;
      const x = 100 + 80 * Math.cos(Math.PI - angle);
      const y = 100 - 80 * Math.sin(Math.PI - angle);
      endpointRef.current.setAttribute("cx", x);
      endpointRef.current.setAttribute("cy", y);
    }

    if (pathRef.current) {
      pathRef.current.style.strokeDashoffset = offset;
    }
  };

  const containerStyle = {
    position: "relative",
    width: `${width}px`,
    maxWidth: "100%",
  };

  const svgStyle = {
    width: "100%",
    height: "auto",
    display: "block",
  };

  const percentageTextStyle = {
    fontSize: "24px",
    fontWeight: "bold",
    fontFamily: "DM Sans",
    fill: theme.palette.text.main,
  };

  const labelTextStyle = {
    fontSize: "14px",
    fontFamily: "DM Sans",
    fill: theme.palette.text.main,
  };

  const amountStyle = {
    fontSize: "14px",
    fontFamily: "DM Sans",
    fill: theme.palette.text.main,
    opacity: 0.8,
  };

  return (
    <div style={containerStyle}>
      <svg style={svgStyle} viewBox="0 0 200 150">
        {/* Background Track */}
        <path
          d="M20 100 A80 80 0 0 1 180 100"
          style={{
            fill: "none",
            stroke: trackColor,
            strokeWidth: strokeWidth,
          }}
        />

        {/* Value Path */}
        <path
          ref={pathRef}
          d="M20 100 A80 80 0 0 1 180 100"
          style={{
            fill: "none",
            stroke: color,
            strokeWidth: strokeWidth,
            strokeLinecap: "round",
            strokeDasharray: PATH_LENGTH,
            strokeDashoffset: PATH_LENGTH * (1 - value / 100),
            transition: "stroke-dashoffset 0.5s ease-in-out",
          }}
        />

        {/* Endpoint Circle */}
        <circle
          ref={endpointRef}
          r="10"
          cx="146"
          cy="35"
          style={{
            fill: color,
          }}
        />

        {/* Percentage Text */}
        <text x="100" y="85" style={percentageTextStyle} textAnchor="middle">
          {Math.round(value)}%
        </text>

        {/* Label Text */}
        <text x="100" y="105" style={labelTextStyle} textAnchor="middle">
          {label}
        </text>

        {/* Left Amount */}
        <text x="0" y="120" style={amountStyle} textAnchor="start">
          {leftAmount}
        </text>

        {/* Right Amount */}
        <text x="200" y="120" style={amountStyle} textAnchor="end">
          {rightAmount}
        </text>
      </svg>
    </div>
  );
};

export default SemicircleProgress;
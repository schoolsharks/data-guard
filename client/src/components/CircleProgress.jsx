import { useTheme } from '@mui/material';
import React, { useEffect, useRef } from 'react';

const CircleProgress = ({
  value = 30,
  label = "PAT",
  color = "#FF0000",
  width = 250,
  trackColor = "#E6F0FF",
  strokeWidth = 12,
  leftAmount = "₹5,00,000",
  rightAmount = "₹2,90,000"
}) => {
  const pathRef = useRef(null);
  const endpointRef = useRef(null);
  const RADIUS = 80;
  const CIRCUMFERENCE = 2 * Math.PI * RADIUS;
  const theme=useTheme()

  useEffect(() => {
    updateProgress(value);
  }, [value]);

  const updateProgress = (newValue) => {
    const normalizedValue = Math.min(100, Math.max(0, newValue));
    const offset = CIRCUMFERENCE - (CIRCUMFERENCE * normalizedValue) / 100;

    if (pathRef.current) {
      pathRef.current.style.strokeDashoffset = offset;
    }

    if (endpointRef.current) {
      const angle = (normalizedValue / 100) * 2 * Math.PI - Math.PI / 2;
      const x = 100 + RADIUS * Math.cos(angle);
      const y = 100 + RADIUS * Math.sin(angle);
      endpointRef.current.setAttribute('cx', x);
      endpointRef.current.setAttribute('cy', y);
    }
  };

  const containerStyle = {
    position: 'relative',
    width: `${width}px`,
    maxWidth: '100%',
    margin: '0 auto'
  };

  const svgStyle = {
    width: '100%',
    height: 'auto',
    transform: 'rotate(-90deg)',
    overflow: 'visible'
  };

  const textContainerStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    textAlign: 'center',
    width: '100%'
  };

  const percentageStyle = {
    fontSize: '30px',
    fontWeight: 'bold',
    margin: '0',
    color: theme.palette.text.main,
    fontFamily:"DM Sans"
  };

  const labelStyle = {
    fontSize: '20px',
    margin: '4px 0 0 0',
    color: theme.palette.text.main,
    fontFamily:"DM Sans"
  };

  const amountStyle = {
    position: 'absolute',
    bottom: '-12px',
    fontFamily:"DM Sans",
    fontSize: '20px',
    color: theme.palette.text.main
  };

  const leftAmountStyle = {
    ...amountStyle,
    left: '0'
  };

  const rightAmountStyle = {
    ...amountStyle,
    right: '0'
  };

  return (
    <div style={containerStyle}>
      <svg style={svgStyle} viewBox="0 0 200 200">
        {/* Background Circle */}
        <circle
          cx="100"
          cy="100"
          r={RADIUS}
          fill="none"
          stroke={trackColor}
          strokeWidth={strokeWidth}
        />
        
        {/* Progress Circle */}
        <circle
          ref={pathRef}
          cx="100"
          cy="100"
          r={RADIUS}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          style={{
            strokeDasharray: CIRCUMFERENCE,
            strokeDashoffset: CIRCUMFERENCE * (1 - value / 100),
            transition: 'stroke-dashoffset 0.5s ease-in-out'
          }}
        />

        {/* Endpoint Circle */}
        <circle
          ref={endpointRef}
          r="6"
          cx="100"
          cy="20"
          fill={color}
          style={{
            filter: 'drop-shadow(0 0 2px rgba(0, 0, 0, 0.2))'
          }}
        />
      </svg>

      {/* Center Text */}
      <div style={textContainerStyle}>
        <p style={percentageStyle}>{Math.round(value)}%</p>
        <p style={labelStyle}>{label}</p>
      </div>

      {/* Amounts */}
      <div style={leftAmountStyle}>{leftAmount}</div>
      <div style={rightAmountStyle}>{rightAmount}</div>
    </div>
  );
};

export default CircleProgress;
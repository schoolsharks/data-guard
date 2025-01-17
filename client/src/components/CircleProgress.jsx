import { useTheme } from '@mui/material';
import React from 'react';
import { formatAmount } from '../utils/formatAmount';

const CircleProgress = ({ value, color, rightAmount }) => {
  const theme = useTheme()
  // Constants for SVG
  const size = 250;
  const strokeWidth = 15;
  const center = size / 2;
  const radius = center - strokeWidth;
  const circumference = 2 * Math.PI * radius;
  
  // Calculate the progress
  const normalizedValue = Math.min(Math.max(value, -100), 100); // Clamp between -100 and 100
  const offset = circumference - (Math.abs(normalizedValue) / 100) * circumference;
  
  // For negative values, we want to start from top and go counterclockwise
  // We achieve this by:
  // 1. Always rotating -90 degrees to start from top
  // 2. Using transform-origin and scale to flip the circle for negative values
  const styles = {
    container: {
      position: 'relative',
      width: size,
      height: size,
      display: 'inline-block',
    },
    svg: {
      transform: `rotate(-90deg)${value < 0 ? ' scale(1,-1)' : ''}`,
      transformOrigin: 'center',
    },
    track: {
      fill: 'none',
      stroke: '#E5E7EB',
      strokeWidth,
    },
    progress: {
      fill: 'none',
      stroke: color,
      strokeWidth,
      strokeLinecap: 'round',
      strokeDasharray: circumference,
      strokeDashoffset: offset,
      transition: 'stroke-dashoffset 0.5s ease',
    },
    label: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      textAlign: 'center',
      width: '100%',
    },
    percentage: {
      fontSize: '24px',
      fontWeight: 'bold',
      fontFamily: "DM Sans",
      color: theme.palette.text.main,
      marginBottom: '4px',
    },
    amount: {
      fontFamily: "DM Sans",
      fontSize: '16px',
      color: theme.palette.text.main,
    },
    amountContainer: {
      display: "flex",
      justifyContent: "space-between",
      position: 'absolute',
      width: '100%',
      boxSizing: 'border-box',
    }
  };

  return (
    <div style={styles.container}>
      <svg
        width={size}
        height={size}
        style={styles.svg}
      >
        <circle
          cx={center}
          cy={center}
          r={radius}
          style={styles.track}
        />
        <circle
          cx={center}
          cy={center}
          r={radius}
          style={styles.progress}
        />
      </svg>
      <div style={styles.label}>
        <div style={styles.percentage}>{value.toFixed()}%</div>
        <div style={styles.amount}>PAT</div>
      </div>
      <div style={styles.amountContainer}>
        <div style={styles.amount}>{formatAmount(rightAmount)}</div>
        <div style={styles.amount}>₹5,00,000</div>
      </div>
    </div>
  );
};

export default CircleProgress;
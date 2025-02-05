import { useTheme } from '@mui/material';
import React from 'react';
import { formatAmount } from '../utils/formatAmount';

const CircleProgress = ({ value, color, rightAmount }) => {
  const theme = useTheme()
  // Constants for SVG
  const size = 250;
  const strokeWidth = 15;
  const dotSize = 24;
  const center = size / 2;
  const radius = center - strokeWidth;
  const circumference = 2 * Math.PI * radius;
  
  const normalizedValue = Math.min(Math.max(value, -100), 100); 
  const offset = circumference - (Math.abs(normalizedValue) / 100) * circumference;
  
  // Calculate dot position
  const angle = ((Math.abs(normalizedValue) / 100) * 360 ) * (Math.PI / 180);
  const dotX = center + radius * Math.cos(angle);
  const dotY = center + radius * Math.sin(angle);
  
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
    dot: {
      fill: value >= 0 ? '#22DD80' : '#DD2222', 
      transition: 'all 0.5s ease',
      stroke:value >= 0 ? '#39B421' : '#B42121',
      strokeWidth:"3px"
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
        {/* End dot */}
        <circle
          cx={dotX}
          cy={dotY}
          r={dotSize / 2}
          style={styles.dot}
        />
      </svg>
      <div style={styles.label}>
        <div style={styles.percentage}>{value.toFixed()}%</div>
        <div style={styles.amount}>PAT</div>
      </div>
      <div style={styles.amountContainer}>
        <div style={styles.amount}>{rightAmount ? formatAmount(rightAmount) : 0}</div>
        <div style={styles.amount}>₹5,00,000</div>
      </div>
    </div>
  );
};

export default CircleProgress;
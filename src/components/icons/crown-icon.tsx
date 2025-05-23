interface CrownIconProps {
  color: string;
  size: number;
  style?: React.CSSProperties;
  className?: string;
}

export const CrownIcon = ({ color, size, style, className }: CrownIconProps) => {
  return (
    <svg
      fill={color}
      width={size}
      height={size}
      viewBox="0 0 22 22"
      xmlns="http://www.w3.org/2000/svg"
      id="memory-crown"
      style={style}
      className={className}
    >
      <path d="M2 17H20V19H2V17M4 6L4 7H5L5 8L6 8L6 7H7V6H8V5H9V4L10 4L10 3H12L12 4L13 4V5H14L14 6H15V7H16L16 8H17V7L18 7V6H19V5H20V16H2V5H3V6H4M7 14H18V10H15V9H14V8H13V7H12V6H10V7H9V8H8V9H7V10H4V14H7Z" />
    </svg>
  );
};

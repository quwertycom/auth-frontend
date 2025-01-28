import 'material-symbols';

interface MaterialSymbolProps {
  symbol: string;
  type?: 'outlined' | 'rounded' | 'sharp';
  fill?: boolean;
  weight?: 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;
  grade?: -25 | 0 | 200;
  size?: 18 | 24 | 36 | 48 | number;
  color?: string;
  className?: string;
  style?: React.CSSProperties;
}

export default function MaterialSymbol({
  symbol,
  type = 'outlined',
  fill = false,
  weight,
  grade,
  size,
  color,
  className = '',
  style = {},
}: MaterialSymbolProps) {
  const classNames = [`material-symbols-${type}`, className]
    .filter(Boolean)
    .join(' ');

  const styles = {
    fontVariationSettings: `
            'FILL' ${fill ? 1 : 0},
            'wght' ${weight || 400},
            'GRAD' ${grade || 0},
            'opsz' ${size || 24}
        `,
    fontSize: size ? `${size}px` : undefined,
    color: color || undefined,
    ...style,
  };

  return (
    <span className={classNames} style={styles}>
      {symbol}
    </span>
  );
}

import 'material-symbols';

interface MaterialSymbolProps {
  symbol: string;
  type?: 'outlined' | 'rounded' | 'sharp';
  fill?: boolean;
  weight?: 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;
  grade?: -25 | 0 | 200;
  size?: number | string;
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

  const styles: React.CSSProperties = {
    fontVariationSettings: `
            'FILL' ${fill ? 1 : 0},
            'wght' ${weight || 400},
            'GRAD' ${grade || 0},
            'opsz' ${typeof size === 'number' ? size : 24}
        `,
    fontSize: typeof size === 'number' ? `${size}px` : size,
    color: color || undefined,
    ...style,
  };

  return (
    <span className={classNames} style={styles}>
      {symbol}
    </span>
  );
}

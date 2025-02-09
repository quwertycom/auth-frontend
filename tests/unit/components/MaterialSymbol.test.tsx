import { describe, it, expect } from 'vitest';
import { render, screen } from '../../utils/test-utils';
import MaterialSymbol from '@/app/components/common/materialSymbol';

describe('MaterialSymbol', () => {
  it('renders with default props', () => {
    render(<MaterialSymbol symbol="home" />);
    const icon = screen.getByText('home');

    expect(icon).toBeInTheDocument();
    expect(icon).toHaveClass('material-symbols-outlined');

    const style = window.getComputedStyle(icon);
    expect(style.getPropertyValue('font-variation-settings')).toContain(
      `'FILL' 0`,
    );
    expect(style.getPropertyValue('font-variation-settings')).toContain(
      `'wght' 400`,
    );
    expect(style.getPropertyValue('font-variation-settings')).toContain(
      `'GRAD' 0`,
    );
    expect(style.getPropertyValue('font-variation-settings')).toContain(
      `'opsz' 24`,
    );
  });

  it('renders with custom type', () => {
    render(<MaterialSymbol symbol="home" type="rounded" />);
    const icon = screen.getByText('home');

    expect(icon).toHaveClass('material-symbols-rounded');
  });

  it('renders with fill enabled', () => {
    render(<MaterialSymbol symbol="home" fill={true} />);
    const icon = screen.getByText('home');

    const style = window.getComputedStyle(icon);
    expect(style.getPropertyValue('font-variation-settings')).toContain(
      `'FILL' 1`,
    );
  });

  it('applies custom weight', () => {
    render(<MaterialSymbol symbol="home" weight={700} />);
    const icon = screen.getByText('home');

    const style = window.getComputedStyle(icon);
    expect(style.getPropertyValue('font-variation-settings')).toContain(
      `'wght' 700`,
    );
  });

  it('applies custom grade', () => {
    render(<MaterialSymbol symbol="home" grade={200} />);
    const icon = screen.getByText('home');

    const style = window.getComputedStyle(icon);
    expect(style.getPropertyValue('font-variation-settings')).toContain(
      `'GRAD' 200`,
    );
  });

  it('applies custom size', () => {
    render(<MaterialSymbol symbol="home" size={36} />);
    const icon = screen.getByText('home');

    const style = window.getComputedStyle(icon);
    expect(style.fontSize).toBe('36px');
    expect(style.getPropertyValue('font-variation-settings')).toContain(
      `'opsz' 36`,
    );
  });

  it('applies custom color', () => {
    render(<MaterialSymbol symbol="home" color="#FF0000" />);
    const icon = screen.getByText('home');

    const style = window.getComputedStyle(icon);
    expect(style.color).toBe('rgb(255, 0, 0)');
  });

  it('applies custom className', () => {
    render(<MaterialSymbol symbol="home" className="custom-class" />);
    const icon = screen.getByText('home');

    expect(icon).toHaveClass('material-symbols-outlined', 'custom-class');
  });

  it('applies custom style', () => {
    const customStyle = { margin: '10px', padding: '5px' };
    render(<MaterialSymbol symbol="home" style={customStyle} />);
    const icon = screen.getByText('home');

    const style = window.getComputedStyle(icon);
    expect(style.margin).toBe('10px');
    expect(style.padding).toBe('5px');
  });

  it('combines all custom properties correctly', () => {
    const props = {
      symbol: 'star',
      type: 'sharp' as const,
      fill: true,
      weight: 800 as const,
      grade: -25 as const,
      size: 48,
      color: '#00FF00',
      className: 'custom-class',
      style: { margin: '10px' },
    };

    render(<MaterialSymbol {...props} />);
    const icon = screen.getByText('star');

    expect(icon).toHaveClass('material-symbols-sharp', 'custom-class');

    const style = window.getComputedStyle(icon);
    expect(style.getPropertyValue('font-variation-settings')).toContain(
      `'FILL' 1`,
    );
    expect(style.getPropertyValue('font-variation-settings')).toContain(
      `'wght' 800`,
    );
    expect(style.getPropertyValue('font-variation-settings')).toContain(
      `'GRAD' -25`,
    );
    expect(style.getPropertyValue('font-variation-settings')).toContain(
      `'opsz' 48`,
    );
    expect(style.fontSize).toBe('48px');
    expect(style.color).toBe('rgb(0, 255, 0)');
    expect(style.margin).toBe('10px');
  });

  // Edge cases and validation
  it('handles empty className', () => {
    render(<MaterialSymbol symbol="home" className="" />);
    const icon = screen.getByText('home');

    expect(icon).toHaveClass('material-symbols-outlined');
    expect(icon.className.trim()).toBe('material-symbols-outlined');
  });

  it('handles undefined optional props', () => {
    render(
      <MaterialSymbol
        symbol="home"
        type={undefined}
        fill={undefined}
        weight={undefined}
      />,
    );
    const icon = screen.getByText('home');

    expect(icon).toHaveClass('material-symbols-outlined');
    const style = window.getComputedStyle(icon);
    expect(style.getPropertyValue('font-variation-settings')).toContain(
      `'FILL' 0`,
    );
    expect(style.getPropertyValue('font-variation-settings')).toContain(
      `'wght' 400`,
    );
    expect(style.getPropertyValue('font-variation-settings')).toContain(
      `'GRAD' 0`,
    );
    expect(style.getPropertyValue('font-variation-settings')).toContain(
      `'opsz' 24`,
    );
  });
});

import { render, screen } from '@testing-library/react';
import MaterialSymbol from '@/app/components/common/materialSymbol';
import '@testing-library/jest-dom';

describe('MaterialSymbol', () => {
  it('renders with default props', () => {
    render(<MaterialSymbol symbol="home" />);
    const icon = screen.getByText('home');
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveClass('material-symbols-rounded');

    const style = window.getComputedStyle(icon);
    expect(style.getPropertyValue('font-variation-settings')).toContain(
      "'FILL' 0",
    );
  });

  it('renders with custom type outlined', () => {
    render(<MaterialSymbol symbol="home" type="outlined" />);
    const icon = screen.getByText('home');
    expect(icon).toHaveClass('material-symbols-outlined');
  });

  it('renders with custom type sharp', () => {
    render(<MaterialSymbol symbol="home" type="sharp" />);
    const icon = screen.getByText('home');
    expect(icon).toHaveClass('material-symbols-sharp');
  });

  it('renders with fill enabled', () => {
    render(<MaterialSymbol symbol="home" fill />);
    const icon = screen.getByText('home');
    const style = window.getComputedStyle(icon);
    expect(style.getPropertyValue('font-variation-settings')).toContain(
      "'FILL' 1",
    );
  });

  it('applies custom weight', () => {
    render(<MaterialSymbol symbol="home" weight={500} />);
    const icon = screen.getByText('home');
    const style = window.getComputedStyle(icon);
    expect(style.getPropertyValue('font-variation-settings')).toContain(
      "'wght' 500",
    );
  });

  it('applies custom grade', () => {
    render(<MaterialSymbol symbol="home" grade={100} />);
    const icon = screen.getByText('home');
    const style = window.getComputedStyle(icon);
    expect(style.getPropertyValue('font-variation-settings')).toContain(
      "'GRAD' 100",
    );
  });

  it('applies custom size', () => {
    render(<MaterialSymbol symbol="home" size={32} />);
    const icon = screen.getByText('home');
    const style = window.getComputedStyle(icon);
    expect(style.getPropertyValue('font-variation-settings')).toContain(
      "'opsz' 32",
    );
  });

  it('applies custom color', () => {
    render(<MaterialSymbol symbol="home" color="red" />);
    const icon = screen.getByText('home');
    const style = window.getComputedStyle(icon);
    expect(style.color).toBe('rgb(255, 0, 0)');
  });

  it('applies custom className', () => {
    render(<MaterialSymbol symbol="home" className="custom-class" />);
    const icon = screen.getByText('home');

    expect(icon).toHaveClass('material-symbols-rounded custom-class');
  });

  it('applies custom style', () => {
    render(<MaterialSymbol symbol="home" style={{ opacity: 0.5 }} />);
    const icon = screen.getByText('home');
    const style = window.getComputedStyle(icon);
    expect(style.opacity).toBe('0.5');
  });

  it('combines all custom properties correctly', () => {
    render(
      <MaterialSymbol
        symbol="home"
        type="outlined"
        fill
        weight={600}
        grade={200}
        size={64}
        color="blue"
        className="combined-class"
        style={{ opacity: 0.75 }}
      />,
    );
    const icon = screen.getByText('home');
    const style = window.getComputedStyle(icon);

    expect(icon).toHaveClass('material-symbols-outlined combined-class');
    expect(style.getPropertyValue('font-variation-settings')).toContain(
      "'FILL' 1",
    );
    expect(style.getPropertyValue('font-variation-settings')).toContain(
      "'wght' 600",
    );
    expect(style.getPropertyValue('font-variation-settings')).toContain(
      "'GRAD' 200",
    );
    expect(style.getPropertyValue('font-variation-settings')).toContain(
      "'opsz' 64",
    );
    expect(style.color).toBe('rgb(0, 0, 255)');
    expect(style.opacity).toBe('0.75');
  });

  it('handles empty className', () => {
    render(<MaterialSymbol symbol="home" className="" />);
    const icon = screen.getByText('home');

    expect(icon).toHaveClass('material-symbols-rounded');
    expect(icon.className.trim()).toBe('material-symbols-rounded');
  });

  it('handles undefined optional props', () => {
    render(<MaterialSymbol symbol="home" />);
    const icon = screen.getByText('home');

    expect(icon).toHaveClass('material-symbols-rounded');
    const style = window.getComputedStyle(icon);
    expect(style.getPropertyValue('font-variation-settings')).toContain(
      "'FILL' 0",
    );
    expect(style.getPropertyValue('font-variation-settings')).toContain(
      "'wght' 400",
    );
    expect(style.getPropertyValue('font-variation-settings')).toContain(
      "'GRAD' 0",
    );
  });
});

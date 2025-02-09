import { describe, it, expect } from 'vitest';
import { render, screen } from '../../utils/test-utils';
import MaterialSymbol from '@/app/components/common/materialSymbol';

describe('MaterialSymbol Integration', () => {
  it('works within a button component', () => {
    render(
      <button>
        <MaterialSymbol symbol="add" />
        Add Item
      </button>,
    );

    const icon = screen.getByText('add');
    const button = icon.closest('button');

    expect(icon).toBeInTheDocument();
    expect(button).toHaveTextContent('add');
    expect(button).toHaveTextContent('Add Item');
  });

  it('works with dynamic symbol changes', () => {
    const { rerender } = render(<MaterialSymbol symbol="play_arrow" />);
    expect(screen.getByText('play_arrow')).toBeInTheDocument();

    rerender(<MaterialSymbol symbol="pause" />);
    expect(screen.getByText('pause')).toBeInTheDocument();
    expect(screen.queryByText('play_arrow')).not.toBeInTheDocument();
  });

  it('works with multiple icons in the same container', () => {
    render(
      <div>
        <MaterialSymbol symbol="star" color="gold" />
        <MaterialSymbol symbol="star" color="gold" />
        <MaterialSymbol symbol="star" color="gray" />
      </div>,
    );

    const stars = screen.getAllByText('star');
    expect(stars).toHaveLength(3);

    stars.slice(0, 2).forEach((star) => {
      const style = window.getComputedStyle(star);
      expect(style.color).toBe('rgb(255, 215, 0)'); // gold in RGB
    });

    const style = window.getComputedStyle(stars[2]);
    expect(style.color).toBe('rgb(128, 128, 128)'); // gray in RGB
  });

  it('works with conditional rendering', () => {
    const { rerender } = render(
      <div>
        {true && <MaterialSymbol symbol="check" color="green" />}
        {false && <MaterialSymbol symbol="close" color="red" />}
      </div>,
    );

    expect(screen.getByText('check')).toBeInTheDocument();
    expect(screen.queryByText('close')).not.toBeInTheDocument();

    rerender(
      <div>
        {false && <MaterialSymbol symbol="check" color="green" />}
        {true && <MaterialSymbol symbol="close" color="red" />}
      </div>,
    );

    expect(screen.queryByText('check')).not.toBeInTheDocument();
    expect(screen.getByText('close')).toBeInTheDocument();
  });

  it('works with dynamic styles based on state', () => {
    const { rerender } = render(
      <MaterialSymbol symbol="favorite" fill={false} color="gray" />,
    );

    let icon = screen.getByText('favorite');
    const style = window.getComputedStyle(icon);
    expect(style.getPropertyValue('font-variation-settings')).toContain(
      `'FILL' 0`,
    );
    expect(style.color).toBe('rgb(128, 128, 128)'); // gray in RGB

    rerender(<MaterialSymbol symbol="favorite" fill={true} color="red" />);

    icon = screen.getByText('favorite');
    const newStyle = window.getComputedStyle(icon);
    expect(newStyle.getPropertyValue('font-variation-settings')).toContain(
      `'FILL' 1`,
    );
    expect(newStyle.color).toBe('rgb(255, 0, 0)'); // red in RGB
  });

  it('works with nested components and inheritance', () => {
    const Wrapper = ({ children }: { children: React.ReactNode }) => (
      <div className="wrapper" style={{ color: 'blue' }}>
        {children}
      </div>
    );

    render(
      <Wrapper>
        <MaterialSymbol symbol="info" />
        <MaterialSymbol symbol="warning" color="orange" />
      </Wrapper>,
    );

    const infoIcon = screen.getByText('info');
    const warningIcon = screen.getByText('warning');

    // Info icon should inherit parent color
    const infoStyle = window.getComputedStyle(infoIcon);
    expect(infoStyle.color).toBe('rgb(0, 0, 255)'); // blue in RGB

    // Warning icon should override parent color
    const warningStyle = window.getComputedStyle(warningIcon);
    expect(warningStyle.color).toBe('rgb(255, 165, 0)'); // orange in RGB
  });
});

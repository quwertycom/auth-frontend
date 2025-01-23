export const Button = ({ children, onPress }: { children: React.ReactNode; onPress?: () => void }) => (
  <button onClick={onPress}>{children}</button>
);

export const HeroUIProvider = ({ children }: { children: React.ReactNode }) => <>{children}</>; 
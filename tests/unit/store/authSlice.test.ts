import { describe, it, expect } from 'vitest';
import authReducer, { setUsername, resetUsername } from '@/app/store/features/authSlice';

describe('auth reducer', () => {
  const initialState = { username: null };

  it('should handle initial state', () => {
    expect(authReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('should handle setUsername', () => {
    const actual = authReducer(initialState, setUsername('JohnDoe'));
    expect(actual.username).toEqual('JohnDoe');
  });

  it('should handle resetUsername', () => {
    const actual = authReducer({ username: 'JohnDoe' }, resetUsername());
    expect(actual.username).toEqual(null);
  });
}); 
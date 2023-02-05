import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { getVSCodeSettings } from '../src';

const mockPlatform = (platform: string) => {
  const originalPlatform = process.platform;
  Object.defineProperty(process, 'platform', { value: platform });

  return () => {
    Object.defineProperty(process, 'platform', { value: originalPlatform });
  };
};

describe('getVSCodeSettings', () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it('macos', () => {
    const restorePlatform = mockPlatform('darwin');

    vi.stubEnv('HOME', 'withyellow');

    const ret = getVSCodeSettings();

    expect(ret.path).toBe('withyellow/Library/Application Support/Code/User/settings.json');

    restorePlatform();
  });

  it('windows', () => {
    const restorePlatform = mockPlatform('win32');

    vi.stubEnv('APPDATA', 'withyellow');

    const ret = getVSCodeSettings();

    expect(ret.path).toBe(`withyellow/Code/User/settings.json`);

    restorePlatform();
  });

  it('linux', () => {
    const restorePlatform = mockPlatform('linux');

    vi.stubEnv('HOME', 'withyellow');

    const ret = getVSCodeSettings();

    expect(ret.path).toBe(`withyellow/.config/Code/User/settings.json`);

    restorePlatform();
  });
});

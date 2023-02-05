/**
 *
 * Windows %APPDATA%\Code\User\settings.json
 * macOS $HOME/Library/Application\ Support/Code/User/settings.json
 * Linux $HOME/.config/Code/User/settings.json
 * @see https://code.visualstudio.com/docs/getstarted/settings#_settings-file-locations
 */

import { existsSync, readFileSync } from 'fs';
import { join } from 'pathe';

const getSetting = (homekey: string, path: string) => {
  let fullpath = '';
  let settings = '{}';
  const home = process.env[homekey];
  if (!home) throw new Error(`unknown homekey`);
  fullpath = join(home, path);
  if (existsSync(fullpath)) {
    settings = readFileSync(fullpath, 'utf-8');
  }

  return {
    path: fullpath,
    settings,
  };
};

export const getVSCodeSettings = () => {
  let settings = '{}';
  let path = '';

  switch (process.platform) {
    case 'darwin': {
      return getSetting('HOME', 'Library/Application Support/Code/User/settings.json');
    }
    case 'win32': {
      return getSetting('APPDATA', `Code/User/settings.json`);
    }
    case 'linux': {
      return getSetting('HOME', '.config/Code/User/settings.json');
    }
  }

  return {
    path,
    settings,
  };
};

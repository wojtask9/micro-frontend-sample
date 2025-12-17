import { init, loadRemote as _loadRemote, registerRemotes } from '@module-federation/runtime';

/**
 * This function initializes the module federation plugin.
 * It takes an array of remotes and initializes the module federation plugin before the app is mounted.
 */
export const federationPlugin = {
  install: (_, remotes) => {
    const mfRemotes = remotes.map((remote) => ({
      name: remote.module,
      entry: remote.entry,
      type: 'module',
    }));
    registerRemotes(mfRemotes);
  },
};

export default federationPlugin;

/**
 * This is used to load a remote module.
 */
export const useModuleFederation = () => {
  const loadRemote = async (module) => {
    const loadedModule = await _loadRemote(`${module}/entry`);
    return {
      name: module,
      mount: loadedModule.mount,
      unmount: loadedModule.unmount,
    };
  };

  return { loadRemote };
};

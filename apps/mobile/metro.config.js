const { withNxMetro } = require('@nx/react-native');
const { getDefaultConfig } = require('@react-native/metro-config');
const exclusionList = require('metro-config/src/defaults/exclusionList');
const path = require('path');

module.exports = (async () => {
  const defaultConfig = await getDefaultConfig(__dirname);
  const workspaceRoot = path.resolve(__dirname, '../..');

  return withNxMetro({
    ...defaultConfig,
    resolver: {
      ...defaultConfig.resolver,
      blockList: exclusionList([/^(?!.*node_modules).*\/dist\/.*/]),
      resolveRequest: (context, moduleName, platform) => {
        try {
          return context.resolveRequest(context, moduleName, platform);
        } catch (e) {
          if (moduleName.startsWith('@who-cares/')) {
            const packageName = moduleName.split('/')[1];
            const libPath = path.resolve(workspaceRoot, 'libs', packageName);
            return context.resolveRequest(context, libPath, platform);
          }
          throw e;
        }
      },
    },
    projectRoot: __dirname,
    watchFolders: [
      workspaceRoot,
      path.resolve(workspaceRoot, 'libs'),
    ],
  });
})();

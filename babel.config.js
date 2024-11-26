module.exports = {
    presets: ['module:@react-native/babel-preset'],
    plugins: [
        [
            'module-resolver',
            {
                extensions: [
                    '.js',
                    '.jsx',
                    '.ts',
                    '.tsx',
                    '.android.js',
                    '.android.tsx',
                    '.ios.js',
                    '.ios.tsx',
                ],
                root: ['./'],
                alias: {
                    '@assets': './src/assets',
                    '@base': './src/base',
                    '@components': './src/components',
                    '@config': './src/config',
                    '@navigation': './src/navigation',
                    '@screens': './src/screens',
                    '@services': './src/services',
                    '@shared': './src/shared',
                    '@tabs': './src/tabs',
                },
            },
        ],
        'react-native-reanimated/plugin',
    ],
};

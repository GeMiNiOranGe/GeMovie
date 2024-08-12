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
                    '@navigation': './src/navigation',
                    '@screens': './src/screens',
                    '@shared/types': './src/shared/types',
                },
            },
        ],
    ],
};

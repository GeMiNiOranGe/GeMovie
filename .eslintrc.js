module.exports = {
    root: true,
    extends: '@react-native',
    rules: {
        indent: ['error', 4],
        'linebreak-style': ['error', 'unix'],
        '@typescript-eslint/no-unused-vars': ['warn'],
        curly: 'error',
    },
    overrides: [
        {
            files: ['*.tsx', '*.jsx'],
            rules: {
                indent: ['error', 2],
            },
        },
    ],
};

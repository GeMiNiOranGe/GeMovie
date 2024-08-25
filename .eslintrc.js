module.exports = {
    root: true,
    extends: '@react-native',
    rules: {
        indent: ['error', 4],
        'linebreak-style': ['error', 'unix'],
        'jsx-quotes': ['error', 'prefer-single'],
        '@typescript-eslint/no-unused-vars': ['warn'],
        '@typescript-eslint/explicit-member-accessibility': 'error',
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

module.exports = {
    root: true,
    extends: ['@react-native', 'plugin:react/recommended'],
    rules: {
        indent: [
            'error',
            4,
            {
                SwitchCase: 1,
            },
        ],
        'linebreak-style': ['error', 'unix'],
        curly: 'error',
        'dot-notation': [
            'error',
            {
                allowPattern: '^[a-z0-9]+(_[a-z0-9]+)+$',
            },
        ],
        camelcase: [
            'error',
            {
                properties: 'always',
                allow: ['iso_3166_1', 'iso_639_1', 'sort_by', 'with_genres'],
            },
        ],
        eqeqeq: ['error', 'smart'],
        'jsx-quotes': ['error', 'prefer-single'],
        '@typescript-eslint/no-unused-vars': ['warn'],
        '@typescript-eslint/explicit-member-accessibility': 'error',
        'react/jsx-curly-brace-presence': ['error', 'never'],
    },
    overrides: [
        {
            files: ['*.tsx', '*.jsx'],
            rules: {
                indent: [
                    'error',
                    2,
                    {
                        SwitchCase: 1,
                    },
                ],
            },
        },
    ],
};

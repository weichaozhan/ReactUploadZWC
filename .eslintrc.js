module.exports = {
  'extends': [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'alloy',
    'alloy/react', 
    'alloy/typescript'
  ],
  'globals': {
    // 全局变量
    // 这里值为 false 表示这个全局变量不允许被重新赋值，比如：
    '__DEV__': false,
    'BigInt': true,
    'ReactUploadZWC': true
  },
  'parser': '@typescript-eslint/parser',
  'parserOptions': {
    'ecmaVersion': 7,
    'sourceType': 'module',
    'ecmaFeatures': {
      'jsx': true,
    }
  },
  'plugins': [
    '@typescript-eslint',
    'react-hooks',
  ],
  'settings': {
    'react': {
      'version': 'detect',
    }
  },
  'rules': {
    'semi': ['error', 'always'], 
    'semi-style': ['error', 'last'],
    'quotes': ['error', 'single'],
    'no-void': 'off',
    'indent': ['error', 2, { 'SwitchCase': 1 }],
    'no-trailing-spaces': ['error', { 'skipBlankLines': true }],
    'react/jsx-indent': ['error', 2],
    'react/jsx-indent-props': ['error', 2],
    '@typescript-eslint/indent': ['error', 2, { 'SwitchCase': 1, 'flatTernaryExpressions': true }],
    '@typescript-eslint/prefer-function-type': 'off',
    '@typescript-eslint/prefer-for-of': 'off',
    '@typescript-eslint/no-invalid-this': 'off',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'error',
    'react/jsx-fragments': 'off'
  }
};

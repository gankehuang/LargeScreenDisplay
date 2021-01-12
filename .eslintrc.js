module.exports = {
  root: true,

  env: {
    browser: true,
    node: true,
    es6: true,
    jquery: true
  },

  parserOptions: {
    parser: 'babel-eslint'
  },

  globals: {
    AMap: false,
    AMapUI: false
  },

  rules: {
    'no-console': 'off',
    'no-debugger': 'off',
    'vue/attribute-hyphenation': 'warn',
    'vue/html-closing-bracket-newline': 'warn',
    'vue/html-closing-bracket-spacing': 'warn',
    'vue/html-end-tags': 'warn',
    'vue/html-indent': 'warn',
    'vue/html-quotes': 'warn',
    'vue/html-self-closing': 'warn',
    'vue/max-attributes-per-line': 'warn',
    'vue/multiline-html-element-content-newline': 'warn',
    'vue/mustache-interpolation-spacing': 'warn',
    'vue/name-property-casing': 'warn',
    'vue/no-multi-spaces': 'warn',
    'vue/no-spaces-around-equal-signs-in-attribute': 'warn',
    'vue/no-template-shadow': 'warn',
    'vue/prop-name-casing': 'warn',
    'vue/require-default-prop': 'warn',
    'vue/require-prop-types': 'warn',
    'vue/singleline-html-element-content-newline': 'warn',
    'vue/v-bind-style': 'warn',
    'vue/v-on-style': 'warn',
    'vue/attributes-order': 'warn',
    'vue/no-confusing-v-for-v-if': 'warn',
    'vue/no-v-html': 'warn',
    'vue/order-in-components': 'warn',
    'vue/this-in-template': 'warn'
  },

  extends: [
    'plugin:vue/recommended',
    '@vue/standard'
  ]
}

module.exports = {
  "env": {
    "browser": true,
    "commonjs": true,
    "es6": true,
    "node": true
  },
  "extends": "eslint:recommended",
  "parserOptions": {
    "ecmaFeatures": {
      "experimentalObjectRestSpread": true
    },
    "sourceType": "module"
  },
  "rules": {
    "indent": [
      "error",
      2
    ],
    "linebreak-style": [
      "error",
      "unix"
    ],
    "no-constant-condition": [
      "error", {
        "checkLoops": false
      }
    ],
    "no-unused-vars": [
      "error",
      {"args": "none"}
    ],
    "quotes": [
      "error",
      "single"
    ],
    "sort-vars": "error",
    "semi": [
      "error",
      "always"
    ]
  }
};

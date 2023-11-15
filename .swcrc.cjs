{
  "jsc": {
    "parser": {
      "syntax": "typescript",
      "tsx": false,
      "decorators": false,
      "dynamicImport": false
    },
    "target": "es2016",
    "loose": false,
    "minify": {
      "compress": {
        "arguments": false,
        "arrows": true,
        "booleans": true,
        "booleans_as_integers": false,
        "collapse_vars": true,
        "comparisons": true,
        "computed_props": false,
        "conditionals": false,
        "dead_code": false,
        "directives": false,
        "drop_console": false,
        "drop_debugger": true,
        "evaluate": true,
        "expression": false,
        "hoist_funs": false,
        "hoist_props": true,
        "hoist_vars": false,
        "if_return": true,
        "join_vars": true,
        "keep_classnames": false,
        "keep_fargs": true,
        "keep_fnames": false,
        "keep_infinity": false,
        "loops": true,
        "negate_iife": true,
        "properties": true,
        "reduce_funcs": false,
        "reduce_vars": false,
        "side_effects": true,
        "switches": false,
        "typeofs": true,
        "unsafe": false,
        "unsafe_arrows": false,
        "unsafe_comps": false,
        "unsafe_Function": false,
        "unsafe_math": false,
        "unsafe_symbols": false,
        "unsafe_methods": false,
        "unsafe_proto": false,
        "unsafe_regexp": false,
        "unsafe_undefined": false,
        "unused": true
      },
      "mangle": {
        "toplevel": false,
        "keep_classnames": false,
        "keep_fnames": false,
        "keep_private_props": false,
        "ie8": false,
        "safari10": false
      }
    },
    "externalHelpers": false
  },
  "module": {
    "type": "commonjs"
  },
  "exclude": [".*.test.ts"],
  "sourceMaps": true,
  "minify": true
}

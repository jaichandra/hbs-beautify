# hbs-beautify package

Beautify Handlebars file. Supports Handlebar tags within comments. Use {{!--...--}}

atom-beautify's handlebars formatting breaks if handlebars comments contain inline tags `{{...}}`. This package adds support for including handlebars tags inside comments without breaking formatting. Long commenting standard (`{{!--...--}}`) needs to be used for formatting to work with inline tags.

Example
```handlebars
{{!--
  foo partial comments
  Example:
  {{> foo-partial}}
--}}
```

Keyboard shortcut:
`ctrl-alt-[`

<div align="center">

# mt-react-captcha

[![npm version](https://img.shields.io/npm/v/mt-react-captcha.svg)](https://www.npmjs.com/package/mt-react-captcha)
[![npm downloads](https://img.shields.io/npm/dm/mt-react-captcha.svg)](https://www.npmjs.com/package/mt-react-captcha)
[![license: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

Simple, customizable CAPTCHA component for React (TypeScript). Draws an obfuscated code on a `<canvas>` with noise lines and randomized character transforms.

</div>

## Features

- Customizable length, character modes, fonts, colors, size
- Noise lines and randomized rotation for better obfuscation
- Customizable noise line quantity and opacity
- Validation callback via `onValidate`

## Installation

```bash
npm install mt-react-captcha
# or
yarn add mt-react-captcha
# or
pnpm add mt-react-captcha
```

Peer dependencies (ensure these exist in your app):

```bash
npm install react react-dom
```

## Quick start

```tsx
import React, { useState } from 'react';
import { MTCaptcha } from 'mt-react-captcha';

export default function Example() {
  const [userText, setUserText] = useState('');
  const [isValid, setIsValid] = useState(false);

  return (
    <div style={{ display: 'grid', gap: 12 }}>
      <MTCaptcha
        length={5}
        mode="normal"
        userText={userText}
        onValidate={setIsValid}
      />
      <input
        value={userText}
        onChange={(e) => setUserText(e.target.value)}
        placeholder="Type the code"
      />
      <div>{isValid ? '✅ Verified' : '❌ Not matched'}</div>
    </div>
  );
}
```

Default import is also supported:

```tsx
import MTCaptcha from 'mt-react-captcha';
```

## Props

| Prop | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `length` | `number` | `4` | Number of characters in the CAPTCHA. |
| `mode` | `"normal" \| "uppersOnly" \| "lowersOnly" \| "numbersOnly" \| "noUpper" \| "noLower" \| "noNumber"` | `"normal"` | Character set used to generate the code. |
| `regenerate` | `boolean` | `false` | When toggled to `true`, regenerates a new CAPTCHA. |
| `fontWeight` | `number` | `400` | Font weight used when drawing the text. |
| `fontSize` | `number` | `48` | Font size in pixels. |
| `fontFamily` | `string` | `"Arial"` | Canvas font family. |
| `textColor` | `CSSProperties["color"]` | `"#333"` | Text color. |
| `background` | `CSSProperties["color"]` | `"#f0f0f0"` | Canvas background color. |
| `noiseLines` | `number` | `20` | Count of random noise lines for obfuscation. |
| `noiseLinesOpacity` | `CSSProperties["opacity"]` | `"0.8"` | Opacity of noise lines (0–1). |
| `width` | `number` | `200` | Canvas width in CSS pixels. |
| `height` | `number` | `50` | Canvas height in CSS pixels. |
| `userText` | `string` | `""` | The user-entered text to validate against the CAPTCHA. |
| `onValidate` | `(isValid: boolean) => void` | `undefined` | Callback fired whenever `userText` changes; `true` if it matches the CAPTCHA. |

## Regenerating the CAPTCHA

Toggle `regenerate` to `true` to force a new code (you can flip a boolean state):

```tsx
const [regen, setRegen] = useState(false);
// ...
<MTCaptcha regenerate={regen} />
<button onClick={() => setRegen((v) => !v)}>Regenerate</button>
```

## Notes

- The component renders a `<canvas>`; it does not expose the raw value. Use `onValidate` or manage your own input for comparison.
- Works in React 16.8+ (hooks). Types are included.

## License

MIT © Kiaksar. See [LICENSE](LICENSE).
Installation: npm install mt-react-captcha

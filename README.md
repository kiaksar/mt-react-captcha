Installation: npm install mt-react-captcha
Usage Example:
import { MTCaptcha } from 'mt-react-captcha';

<MTCaptcha length={4} mode="normal" /* other props */ />

Default import is also supported:
import MTCaptcha from 'mt-react-captcha';

Props:

length?: number   Optional, Specifies number of characters in the captcha, default value is 4

mode?: normal, uppersOnly, lowersOnly, numbersOnly, noUpper, noLower, noNumber    Optional, Specifies types of the characters to be used in the component, default value is normal which uses uppercase and lowercase letters and numbers

regenerate?: boolean.   takes a boolean to regenerate the captcha when is true, default value is false

fontWeight?: number    default value is 400

fontSize?: number    default value is 48

fontFamily?: string    default value is Arial

textColor?: CSSProperties["color"]    default value is #333

backgraoung?: CSSProperties["color"]    default value is #f0f0f0

noiseLines?: number    Specifies number of noise lines to be added to the numbers for distortion, default value is 20

noiseLinesOpacity?: string    Takes a string from 0 to 1 to specify opacity of noise lines drawn on the captcha, default value is 0.8

width?: number    width of the component, default value is 200

height?: number    height of the component, default value is 50

userText?: string    binds to a string from outside to check user input

onValidate?: (isValid: boolean) => void    takes a function and return isValid which shows if the userText is equal to the generated captcha or not, returned value can be used outside the function

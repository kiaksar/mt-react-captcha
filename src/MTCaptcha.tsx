import { useEffect, useRef, useState, type CSSProperties } from "react";

export type MTCaptchaModes =
  | "normal"
  | "uppersOnly"
  | "lowersOnly"
  | "numbersOnly"
  | "noUpper"
  | "noLower"
  | "noNumber";

export interface MTCaptchaProps {
  length?: number;
  mode?: MTCaptchaModes;
  regenerate?: boolean;
  fontWeight?: number;
  fontSize?: number;
  fontFamily?: string;
  textColor?: CSSProperties["color"];
  background?: CSSProperties["color"];
  noiseLines?: number;
  noiseLinesOpacity?: CSSProperties["opacity"];
  width?: number;
  height?: number;
  userText?: string;
  onValidate?: (isValid: boolean) => void;
}

const MTCaptcha = ({
  length = 4,
  mode = "normal",
  regenerate = false,
  fontWeight = 400,
  fontSize = 48,
  fontFamily = "Arial",
  textColor = "#333",
  background = "#f0f0f0",
  noiseLines = 20,
  noiseLinesOpacity = "0.8",
  width = 200,
  height = 50,
  userText = "",
  onValidate,
}: MTCaptchaProps) => {
  const generateRandomString = (): string => {
    const capitalLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const smallLetters = "abcdefghijklmnopqrstuvwxyz";
    const numbers = "0123456789";
    let characters = "";
    switch (mode) {
      case "uppersOnly":
        characters = capitalLetters;
        break;
      case "lowersOnly":
        characters = smallLetters;
        break;
      case "numbersOnly":
        characters = numbers;
        break;
      case "noNumber":
        characters = capitalLetters + smallLetters;
        break;
      case "noLower":
        characters = capitalLetters + numbers;
        break;
      case "noUpper":
        characters = smallLetters + numbers;
        break;
      case "normal":
        characters = capitalLetters + smallLetters + numbers;
        break;
    }
    let result = "";
    for (let i = 0; i < length; i++) {
      result += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }
    return result;
  };

  const [captchaText, setCaptchaText] = useState<string>(
    generateRandomString()
  );
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (onValidate) {
      onValidate(userText === captchaText);
    }
  }, [userText]);

  useEffect(() => {
    setCaptchaText(generateRandomString());
  }, []);

  useEffect(() => {
    if (regenerate === true) {
      setCaptchaText(generateRandomString());
    }
  }, [regenerate]);

  useEffect(() => {
    console.log("captcha text", captchaText);

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = background;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < noiseLines; i++) {
      ctx.beginPath();
      ctx.moveTo(Math.random() * canvas.width, Math.random() * canvas.height);
      ctx.lineTo(Math.random() * canvas.width, Math.random() * canvas.height);
      ctx.strokeStyle = `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${
        Math.random() * 255
      }, ${noiseLinesOpacity})`;
      ctx.stroke();
    }

    ctx.font = `${fontWeight} ${fontSize}px ${fontFamily}`;
    ctx.fillStyle = textColor;
    const textWidth = ctx.measureText(captchaText).width;
    const startX = (canvas.width - textWidth) / 2;

    for (let i = 0; i < captchaText.length; i++) {
      ctx.save();
      ctx.translate(
        startX + i * (textWidth / captchaText.length),
        canvas.height / 2
      );
      ctx.rotate((Math.random() - 0.5) * 0.4);
      ctx.fillText(captchaText[i], 0, 0);
      ctx.restore();
    }
  }, [captchaText]);
  return (
    <canvas
      ref={canvasRef}
      style={{
        width: width,
        height: height,
        direction: "ltr",
        alignSelf: "center",
      }}
    />
  );
};

export default MTCaptcha;

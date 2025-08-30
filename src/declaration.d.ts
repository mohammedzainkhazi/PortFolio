declare module '*.png' {
  const value: string; // The imported value is the image URL/filename
  export default value;
}

declare module '*.jpg' {
  const value: string;
  export default value;
}
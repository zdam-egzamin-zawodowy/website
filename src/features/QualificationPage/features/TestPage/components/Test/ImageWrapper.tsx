export interface ImageWrapperProps {
  children?: React.ReactNode;
  height?: string;
}

const ImageWrapper = ({ children, height }: ImageWrapperProps) => {
  return (
    <div style={{ width: '100%', height }}>
      <div style={{ position: 'relative', height: '100%' }}>{children}</div>
    </div>
  );
};

export default ImageWrapper;

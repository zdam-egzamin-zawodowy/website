export interface TabPanelProps {
  children?: React.ReactNode;
  value: number;
  index: number;
}

const TabPanel = ({ children, value, index }: TabPanelProps) => {
  return (
    <div
      hidden={value !== index}
      style={{ display: value === index ? 'block' : 'none' }}
    >
      {children}
    </div>
  );
};

export default TabPanel;

type props = {
  children: React.ReactNode;
  className?: string;
  onClose?: () => void;
  onOk?: () => void;
  onCancel?: () => void;
  open?: boolean;
  border?: boolean;
};
export default function Modal({ children, open }: props) {
  return <>{open && { children }}</>;
}

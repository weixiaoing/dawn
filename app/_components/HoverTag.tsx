export function HoverTag({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-gray-400 hover:text-gray-800 cursor-pointer dark:hover:text-white ">
      {children}
    </div>
  );
}

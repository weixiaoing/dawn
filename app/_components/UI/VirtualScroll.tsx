import { PropsWithChildren, UIEventHandler, useRef, useState } from "react";
const extra = 4;
type props = {
  list?: [];
};
export default function VirtualScroll<T>(props: props & PropsWithChildren) {
  const { list = Array.from({ length: 1000 }), children } = props;
  const [data, setData] = useState<[]>([]);
  const [render, setRender] = useState<[]>([]);
  const [offSetY, setOffSetY] = useState(0);
  const renderNum = useRef(0);
  const ItemHeight = useRef(0);
  const handleScroll: UIEventHandler = (e) => {};
  return (
    <div onScroll={handleScroll}>
      <div className=" w-full overflow-auto  relative  bg-scroll">
        {list.map((item, index) => {
          return <div key={index}>{index}</div>;
        })}
      </div>
    </div>
  );
}

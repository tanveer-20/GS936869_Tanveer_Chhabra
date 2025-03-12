import Link from "next/link";

const Sidebar = () => {
  return (
    <div style={{ width: "200px", padding: "16px" }}>
      <ul>
        <li>
          <Link href="/store">Store</Link>
        </li>
        <li>
          <Link href="/planning">Planning</Link>
        </li>
        <li>
          <Link href="/sku">SKU</Link>
        </li>
        <li>
          <Link href="/chart">Chart</Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;

import Link from "next/link"

export default function Nav() {
  return (
    <ul className="mt-3">
      <li className="my-1">
        <Link className="hover:bg-gray-500" href="/">
          Home
        </Link>
      </li>
      <li className="my-1">
        <Link className="hover:bg-gray-500" href="/profile">
          Portal - Customer Profile
        </Link>
      </li>
      <li className="my-1">
        <Link className="hover:bg-gray-500" href="/customers">
          POS - Customers
        </Link>
      </li>
      <li className="my-1">
        <Link className="hover:bg-gray-500" href="/customer-hubs">
          Admin - Customer Hubs
        </Link>
      </li>
    </ul>
  )
}

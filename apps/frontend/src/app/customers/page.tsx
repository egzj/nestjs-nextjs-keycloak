import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"
import { getAccessToken } from "../../utils/sessionTokenAccessor"
import { SetDynamicRoute } from "@/utils/setDynamicRoute"
import moment from "moment"

interface ICustomer {
  id: string
  username: string
  firstName: string
  lastName: string
  email: string
  emailVerified: boolean
  createdTimestamp: number
  enabled: boolean
  totp: boolean
}

async function getCustomers(): Promise<ICustomer[]> {
  const url = `${process.env.BACKEND_URL}/api/v1/customers`

  let accessToken = await getAccessToken()

  const resp = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + accessToken,
    },
  })

  if (resp.ok) {
    const { data: customers } = await resp.json()
    return customers || []
  }

  throw new Error("Failed to fetch data. Status: " + resp.status)
}

export default async function Customers() {
  const session = await getServerSession(authOptions)
  if (session && session.roles?.includes("viewer")) {
    try {
      const customers = await getCustomers()

      return (
        <main>
          <SetDynamicRoute></SetDynamicRoute>
          <h1 className="text-4xl text-center">Customers</h1>
          <table className="border border-gray-500 text-lg ml-auto mr-auto mt-6">
            <thead>
              <tr>
                <th className="bg-blue-900 p-2 border border-gray-500">id</th>
                <th className="bg-blue-900 p-2 border border-gray-500">
                  username
                </th>
                <th className="bg-blue-900 p-2 border border-gray-500">
                  email
                </th>
                <th className="bg-blue-900 p-2 border border-gray-500">name</th>
                <th className="bg-blue-900 p-2 border border-gray-500">
                  created
                </th>
              </tr>
            </thead>
            <tbody>
              {customers.map((customer) => (
                <tr key={customer.id}>
                  <td className="p-1 border border-gray-500">{customer.id}</td>
                  <td className="p-1 border border-gray-500">
                    {customer.username}
                  </td>
                  <td className="p-1 border border-gray-500">
                    {customer.email}
                  </td>
                  <td className="p-1 border border-gray-500">
                    {customer.firstName + " " + customer.lastName}
                  </td>
                  <td className="p-1 border border-gray-500">
                    {moment(customer.createdTimestamp).format(
                      "DD MMM YYYY h:mm:ss a"
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </main>
      )
    } catch (err) {
      console.error(err)

      return (
        <main>
          <h1 className="text-4xl text-center">Products</h1>
          <p className="text-red-600 text-center text-lg">
            Sorry, an error happened. Check the server logs.
          </p>
        </main>
      )
    }
  }

  redirect("/unauthorized")
}

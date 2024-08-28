import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"
import { getAccessToken } from "../../utils/sessionTokenAccessor"
import { SetDynamicRoute } from "@/utils/setDynamicRoute"
import moment from "moment"
import { UpdateCustomerForm } from "@/app/customers/UpdateCustomerForm"
import { Card, CardContent, CardTitle } from "@/components/ui/card"

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

async function getProfile(): Promise<ICustomer[]> {
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

export default async function Profile() {
  const session = await getServerSession(authOptions)

  try {
    return (
      <main>
        <SetDynamicRoute></SetDynamicRoute>
        <h1 className="text-center text-4xl">My Profile</h1>
        <div className="grid grid-cols-1 gap-10 pt-12 md:grid-cols-1 lg:grid-cols-2">
          <Card className="p-4">
            <CardTitle>My Profile</CardTitle>
            <CardContent className="mt-4">
              <p>Email: {session?.user?.email}</p>
              <p>Name: {session?.user?.name}</p>
            </CardContent>
          </Card>
        </div>
      </main>
    )
  } catch (err) {
    console.error(err)
    redirect("/unauthorized")
  }
}

import { Card, CardContent, CardTitle } from "@/components/ui/card"
import { getAccessToken } from "@/utils/sessionTokenAccessor"
import { useSession } from "next-auth/react"
import { redirect, useRouter } from "next/navigation"
import { useEffect } from "react"

interface ICustomerHub {
  displayName: string
  displayNameHtml: string
  notBefore: number
  defaultSignatureAlgorithm: string
  revokeRefreshToken: false
  refreshTokenMaxReuse: number
  accessTokenLifespan: number
  accessTokenLifespanForImplicitFlow: number
  ssoSessionIdleTimeout: number
  ssoSessionMaxLifespan: number
  ssoSessionIdleTimeoutRememberMe: number
  ssoSessionMaxLifespanRememberMe: number
  offlineSessionIdleTimeout: number
  offlineSessionMaxLifespanEnabled: false
  offlineSessionMaxLifespan: number
  clientSessionIdleTimeout: number
  clientSessionMaxLifespan: number
  clientOfflineSessionIdleTimeout: number
  clientOfflineSessionMaxLifespan: number
  accessCodeLifespan: number
  accessCodeLifespanUserAction: number
  accessCodeLifespanLogin: number
  actionTokenGeneratedByAdminLifespan: number
  actionTokenGeneratedByUserLifespan: number
  oauth2DeviceCodeLifespan: number
  oauth2DevicePollingInterval: number
  enabled: boolean
  sslRequired: string
  registrationAllowed: boolean
  registrationEmailAsUsername: boolean
  rememberMe: boolean
  verifyEmail: boolean
  loginWithEmailAllowed: boolean
  duplicateEmailsAllowed: boolean
  resetPasswordAllowed: boolean
  editUsernameAllowed: boolean
  bruteForceProtected: boolean
}

async function getCustomerHubs(): Promise<ICustomerHub[]> {
  const url = `${process.env.BACKEND_URL}/api/v1/customer-hubs`

  let accessToken = await getAccessToken()

  const resp = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + accessToken,
    },
  })

  if (resp.ok) {
    const { data: customerHubs } = await resp.json()
    return customerHubs || []
  }

  throw new Error("Failed to fetch data. Status: " + resp.status)
}

export default async function CustomerHubs() {
  try {
    const customerHubs = await getCustomerHubs()

    return (
      <div>
        <h1 className="text-4xl text-center">Customer Hubs</h1>
        <div className="grid grid-cols-1 gap-10 pt-12 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {customerHubs.map((customerHub, i) => (
            <Card key={i} className="p-4">
              <CardTitle className="text-center">
                {customerHub.displayName}
              </CardTitle>
              <CardContent className="mt-4">
                <ul>
                  <li>
                    accessTokenLifespan: {customerHub.accessTokenLifespan}{" "}
                    seconds
                  </li>
                  <li>enabled: {customerHub.enabled ? "true" : "false"}</li>
                  <li>
                    verifyEmail: {customerHub.verifyEmail ? "true" : "false"}
                  </li>
                  <li>
                    resetPasswordAllowed:{" "}
                    {customerHub.resetPasswordAllowed ? "true" : "false"}
                  </li>
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  } catch (err: any) {
    console.error(err.message)
    return redirect("/unauthorized")
  }
}

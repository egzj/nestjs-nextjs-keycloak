"use client"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"
import { decrypt } from "@/utils/encryption"
import { zodResolver } from "@hookform/resolvers/zod"
import axios from "axios"
import { useSession } from "next-auth/react"
import { useForm } from "react-hook-form"
import { z } from "zod"

const formSchema = z.object({
  realmId: z.string(),
  displayName: z.string(),
  accessTokenLifespan: z.number().optional(),
})

export function UpdateCustomerHubForm() {
  const { data: session, status } = useSession()

  const { toast } = useToast()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      realmId: "",
      displayName: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const decryptedAccessToken = decrypt(session?.access_token || "")
    await axios.put(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/customer-hubs/${values.realmId}`,
      {
        displayName: values.displayName,
      },
      {
        headers: {
          Authorization: `Bearer ${decryptedAccessToken}`,
        },
      }
    )
    form.reset()
    toast({
      title: "Customer Hub updated successfully!",
      variant: "default",
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <FormField
          control={form.control}
          name="realmId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Customer Hub ID</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="displayName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Display Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}

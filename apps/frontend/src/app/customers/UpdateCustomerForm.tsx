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
  customerId: z.string().min(3, {
    message: "ID must be at least 3 characters.",
  }),
  firstName: z.string().min(3, {
    message: "Name must be at least 3 characters.",
  }),
})

export function UpdateCustomerForm() {
  const { data: session, status } = useSession()

  const { toast } = useToast()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      customerId: "",
      firstName: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const decryptedAccessToken = decrypt(session?.access_token || "")
    await axios.put(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/customers/${values.customerId}`,
      {
        firstName: values.firstName,
      },
      {
        headers: {
          Authorization: `Bearer ${decryptedAccessToken}`,
        },
      }
    )
    form.reset()
    toast({
      title: "Customer updated successfully!",
      variant: "default",
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <FormField
          control={form.control}
          name="customerId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Customer ID</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="John" {...field} />
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

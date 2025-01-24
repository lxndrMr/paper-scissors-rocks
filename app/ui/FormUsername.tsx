"use client";

import { submitUsername } from "@/app/service/fetchService";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const UserSchema = z.object({
  username: z.string().min(3, {
    message: "Username must be at least 3 characters.",
  }),
});

export default function FormUsername() {
  const form = useForm<z.infer<typeof UserSchema>>({
    resolver: zodResolver(UserSchema),
    defaultValues: {
      username: "",
    },
  });

  const router = useRouter();

  const onSubmit = async (values: z.infer<typeof UserSchema>) => {
    const { username } = values;

    if (!username) {
      console.error("Username is required!");
      return;
    }

    try {
      const data = await submitUsername(username);

      if (data.username) {
        router.push(`/game?username=${username}`);
      } else {
        console.error("Failed to submit username");
      }
    } catch (error) {
      console.error("Error during username submission", error);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 flex flex-col items-center justify-center bg-black rounded-lg p-8 w-full max-w-72"
      >
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel className="flex justify-center text-2xl text-orange-500">
                Username
              </FormLabel>
              <FormControl>
                <Input
                  className="text-white"
                  placeholder="Username"
                  {...field}
                />
              </FormControl>
              <FormDescription>Enter your username</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}

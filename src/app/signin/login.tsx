"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { signIn } from "suna-auth/dist/client";
import { toast } from "sonner";

export function Login({ redirectUrl }: { redirectUrl?: string }) {
  return (
    <Tabs defaultValue={"signin"} className={"w-full max-w-[400px]"}>
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="signin">Sign In</TabsTrigger>
        <TabsTrigger value="createAccount">Create Account</TabsTrigger>
      </TabsList>
      <TabsContent value="signin">
        <SignInMenu redirectUrl={redirectUrl} />
      </TabsContent>
      <TabsContent value="createAccount">
        <CreateAccount redirectUrl={redirectUrl} />
      </TabsContent>
    </Tabs>
  );
}

export function SignInMenu({ redirectUrl }: { redirectUrl?: string }) {
  const formSchema = z.object({
    email: z.string().email({ message: "Email has to be a valid email" }),
    password: z.string().min(8, {
      message: "please have a password longer then 8 char",
    }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const result = await signIn("smtp", {
      password: values.password,
      email: values.email,
      redirect_url: redirectUrl,
    });

    if (!result) return;

    if (
      "message" in result &&
      typeof result.message == "string" &&
      !result.success
    ) {
      // the login was bad, manage error
      if (result.status == 401)
        return form.setError("password", { message: result.message });

      toast("Error while signing in", {
        description: result.message,
        position: "bottom-center",
      });
    } else {
      // The login was good
      toast("Successfully signed in");
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Sign In</CardTitle>
        <CardDescription>
          Sign into your account to access the cool stuff ahead
        </CardDescription>
      </CardHeader>
      <CardContent className={"flex flex-col gap-5"}>
        <div className={"w-full flex flex-col gap-2"}>
          <Button
            onClick={() =>
              signIn("discord", {
                redirect_url: redirectUrl,
              })
            }
          >
            Sign In With Discord
          </Button>
          <Button
            onClick={() =>
              signIn("google", {
                redirect_url: redirectUrl,
              })
            }
          >
            Sign In With Google
          </Button>
        </div>

        <div className={"w-full h-1 my-2 flex flex-row items-center gap-2"}>
          <div className={"bg-primary rounded w-full h-full"} />
          or
          <div className={"bg-primary rounded  w-full h-full"} />
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{field.name}</FormLabel>
                  <FormControl>
                    <Input
                      required
                      placeholder="example@company.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{field.name}</FormLabel>
                  <FormControl>
                    <Input
                      required
                      type={"password"}
                      placeholder=""
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Dialog>
              <DialogTrigger className={"text-end"}>
                <small className="text-sm font-medium leading-none">
                  Forgot Password
                </small>
              </DialogTrigger>
              <ForgotPassword redirectUrl={redirectUrl} />
            </Dialog>
            <Button type="submit" className={"w-full"}>
              Submit
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

export function ForgotPassword({ redirectUrl }: { redirectUrl?: string }) {
  const formSchema = z
    .object({
      email: z.string().email({ message: "Email has to be a valid email" }),
      password: z.string().min(8, {
        message: "please have a password longer then 8 char",
      }),
      password2: z.string().min(8, {
        message: "please have a password longer then 8 char",
      }),
    })
    .refine((data) => data.password === data.password2, {
      message: "Passwords must match",
      path: ["password2"], // specify target field for error message
    });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      password2: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const result = await signIn("smtp", {
      email: values.email,
      password: values.password,
      redirect_url: redirectUrl,
      method: "updatePassword",
    });

    if (!result) return toast("could not sign in");

    if (
      "message" in result &&
      typeof result.message == "string" &&
      !result.success
    ) {
      if (result.status == 401)
        form.setError("password", { message: result.message });
      toast(result.message);
    }
  }

  return (
    <DialogContent className={"md:p-6 rounded"}>
      <DialogHeader>
        <DialogTitle>Change Password</DialogTitle>
        <DialogDescription>Change your password quickly</DialogDescription>
      </DialogHeader>
      <CardContent className={"flex flex-col gap-5"}>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{field.name}</FormLabel>
                  <FormControl>
                    <Input placeholder="example@company.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>new password</FormLabel>
                  <FormControl>
                    <Input type={"password"} placeholder="" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password2"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>verify new password</FormLabel>
                  <FormControl>
                    <Input type={"password"} placeholder="" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className={"w-full"}>
              Submit
            </Button>
          </form>
        </Form>
      </CardContent>
    </DialogContent>
  );
}

export function CreateAccount({ redirectUrl }: { redirectUrl?: string }) {
  const formSchema = z
    .object({
      email: z.string().email({ message: "Email has to be a valid email" }),
      password: z.string().min(8, {
        message: "please have a password longer then 8 char",
      }),
      password2: z.string().min(8, {
        message: "please have a password longer then 8 char",
      }),
    })
    .refine((data) => data.password === data.password2, {
      message: "Passwords must match",
      path: ["password2"], // specify target field for error message
    });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      password2: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const result = await signIn("smtp", {
      password: values.password,
      email: values.email,
      redirect_url: redirectUrl,
      method: "createAccount",
    });

    if (!result) return;

    if (
      "message" in result &&
      typeof result.message == "string" &&
      !result.success
    ) {
      if (result.status == 401)
        form.setError("password", { message: result.message });
      toast("Error", {
        description: result.message,
      });
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create an Account</CardTitle>
        <CardDescription>Create an account to continue!</CardDescription>
      </CardHeader>
      <CardContent className={"flex flex-col gap-5"}>
        <div className={"w-full flex flex-col gap-2"}>
          <Button
            onClick={() =>
              signIn("discord", {
                redirect_url: redirectUrl,
              })
            }
          >
            Sign In With Discord
          </Button>
          <Button
            onClick={() =>
              signIn("google", {
                redirect_url: redirectUrl,
              })
            }
          >
            Sign In With Google
          </Button>
        </div>

        <div className={"w-full h-1 my-2 flex flex-row items-center gap-2"}>
          <div className={"bg-primary rounded w-full h-full"} />
          or
          <div className={"bg-primary rounded  w-full h-full"} />
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{field.name}</FormLabel>
                  <FormControl>
                    <Input placeholder="example@company.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{field.name}</FormLabel>
                  <FormControl>
                    <Input type={"password"} placeholder="" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password2"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>verify password</FormLabel>
                  <FormControl>
                    <Input type={"password"} placeholder="" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className={"w-full"}>
              Submit
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

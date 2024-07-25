import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

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
import { SignupValidationScheme } from "@/lib/validation"
import Loader from "@/components/shared/Loader"
import { Link, useNavigate } from "react-router-dom"
import { useCreateUserAccount, useSignInAccount } from "@/lib/react-query/queriesAndMutations"
import { useUserContext } from "@/context/AuthContext"

const SignupForm = () => {

  const { toast } = useToast()

  const { checkAuthUser, isLoading: isUserLoading } = useUserContext()

  const { mutateAsync: createUserAccount, isPending: isCreatingUser } = useCreateUserAccount()
  const { mutateAsync: signInAccount, isPending: isSigningIn } = useSignInAccount()

  const navigate = useNavigate()

  // 1. Define your form.
  const form = useForm<z.infer<typeof SignupValidationScheme>>({
    resolver: zodResolver(SignupValidationScheme),
    defaultValues: {
      name: 'john smith',
      username: "john",
      email: 'john@example.com',
      password: '12345678'
    },
  })
 
  async function onSubmit(values: z.infer<typeof SignupValidationScheme>) {
    
    console.log("before create user api", localStorage.getItem('cookieFallback'))
    
    const newUser = await createUserAccount(values)
    
    console.log("after create user", localStorage.getItem('cookieFallback'))

    if(!newUser) {
      return toast({
        title: "Sign up failed. Please try again",
      })
    }

    console.log("before sign in", localStorage.getItem('cookieFallback'))

    const session = await signInAccount({ 
      email: values.email, 
      password: values.password
    })

    console.log("after sign in", localStorage.getItem('cookieFallback'))

    if(!session) {
      return toast({
        title: "Sign in failed. Please try again",
      })
    }

    console.log("before auth user", localStorage.getItem('cookieFallback'))

    const isLoggedIn = await checkAuthUser()

    console.log("after auth user", localStorage.getItem('cookieFallback'))

    if(isLoggedIn) {
      form.reset()
      navigate('/')
    } else {
      return toast({
        title: "Sign in failed. Please try again",
      })
    }

  }

  return (
    <Form {...form}>

      <div className="sm:w-420 flex-center flex-col">
        <img src="/assets/images/logo.svg" alt="logo" />
        <h2 className="h3-bold md:h2-bold pt-5 sm:pt-12">
          Create a new account
        </h2>
        <p className="text-light-3 small-medium md:base-regular">
          To use freebook, please enter your details
        </p>

        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5 w-full mt-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input type="text" className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input type="text" className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="text" className="shad-input" {...field} />
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
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="shad-button_primary">
            {
              isCreatingUser ?
                <div className="flex-center gap-2">
                  <Loader/> Loading...
                </div>
              :
                "Sign up"
            }
          </Button>
          <p className="text-small-regular text-light-2 text-center mt-2">
            Already have an account?
            <Link to={'/sign-in'} className="text-primary-500 text-small-semibold ml-1">Log in</Link>
          </p>
        </form>
      </div>
    </Form>
    )
}

export default SignupForm
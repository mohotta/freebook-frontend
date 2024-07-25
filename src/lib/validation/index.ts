import * as z from "zod"

export const SignupValidationScheme = z.object({
    name: z.string().min(2,{ message: 'Name is too short!' }),
    username: z.string().min(2, { message: 'username is too short!' }),
    email: z.string().email(),
    password: z.string().min(8,  { message: 'password should be al least 8 charaters long' })
})

export const SigninValidationScheme = z.object({
    email: z.string().email(),
    password: z.string().min(8,  { message: 'password should be al least 8 charaters long' })
})

export const CreatePostValidationScheme = z.object({
    caption: z.string().max(2200),
    file: z.custom<File[]>(),
    location: z.string().max(2200),
    tags: z.string(),
})

export const ProfileValidation = z.object({
    file: z.custom<File[]>(),
    name: z.string().min(2, { message: "Name must be at least 2 characters." }),
    username: z.string().min(2, { message: "Name must be at least 2 characters." }),
    email: z.string().email(),
    bio: z.string(),
});

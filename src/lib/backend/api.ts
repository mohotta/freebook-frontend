import { INewPost, INewUser, IUpdatePost, IUpdateUser } from "@/types";
import { axiosInstance } from "./config";

export async function createUserAccount(user: INewUser) {

    try {
        
        const response = await axiosInstance.post(
            "/register",
            { user }
        )
        localStorage.setItem("cookieFallback", response.data.token)
        return response.data

    } catch (error) {
        console.log(error)
    }

}

export async function signInAccount(user: {email: string,  password: string}) {
    try {
        
        const response  = await axiosInstance.post(
            "/auth",
            { user }
        )
        localStorage.setItem("cookieFallback", response.data.token)
        return response.data

    } catch (error) {
        console.log(error)
    }
}

export async function signOutUser() {
    localStorage.removeItem("cookieFallback")
}

export async function createPost(post: INewPost) {

    try {
        // TODO: uploading image and get id and link
        const imgUrl = ''
        const imgId = ''

        const response = await axiosInstance.post(
            "/posts/create",
            {
                caption: post.caption,
                tags: post.tags,
                location: post.location, 
                creatorId: post.userId,
                imgUrl: imgUrl,
                imgId: imgId
            }
        )
        return response.data
    } catch (error) {
        console.log(error)
    }
}

export async function getCurrentUser() {
    try {
        const response = await axiosInstance.get(
            "/users/current"
        )
        return response.data
    } catch (error) {
        console.log(error)
    }
}

export async function updatePost(post: IUpdatePost) {
    try {
        const response = await axiosInstance.put(
            `/posts/${post.postId}`,
            {
                caption: post.caption,
                tags: post.tags,
                imgId: post.imageId,
                imgUrl: post.imageUrl,
                location: post.location
            }
        )
        return response.data
    } catch (error) {
        console.log(error)
    }
}

export async function deletePost(postId: string, imgId: string) {
    try {
        // TODO: remove image from bucket
        const response = await axiosInstance.delete(
            `/posts/${postId}`
        )
        return response.data
    } catch (error) {
        console.log(error)
    }
}

export async function getRecentPosts() {
    try {
        const response = await axiosInstance.get(
            "/posts/recent",
            {
                params: { page: 0, limit: 20 }
            }
        )
        return response.data        
    } catch (error) {
        console.log(error)
    }
}

export async function likePost(postId: string) {
    try {
        const response = await axiosInstance.patch(
            "/posts/like",
            {
                params: { postId: postId }
            }
        )
        return response.data
    } catch (error) {
        console.log(error)
    }
}

export async function unlikePost(postId: string) {
    try {
        const response = await axiosInstance.patch(
            "/posts/unlike",
            {
                params: { postId: postId }
            }
        )
        return response.data
    } catch (error) {
        console.log(error)
    }
}

export async function savePost(postId: string) {
    try {
        const response = await axiosInstance.patch(
            "/posts/save",
            {
                params: { postId: postId }
            }
        )
        return response.data
    } catch (error) {
        console.log(error)
    }
}

export async function unsavePost(postId: string) {
    try {
        const response = await axiosInstance.patch(
            "/posts/unsave",
            {
                params: { postId: postId }
            }
        )
        return response.data        
    } catch (error) {
        console.log(error)
    }
}

export async function getPostById(postId: string) {
    try {
        const response = await axiosInstance.get(
            `/posts/${postId}`
        )
        return response.data
    } catch (error) {
        console.log(error)
    }
}

export async function getInfinitePosts({ pageParam }: { pageParam: number }) {
    try {
        const response = await axiosInstance.get(
            '/posts/recent',
            {
                params: { page: pageParam, limit: 10 }
            }
        )
        return response.data
    } catch (error) {
        console.log(error)
    }
}

export async function searchPosts(searchQuery: string) {
    try {
        const response = await axiosInstance.get(
            '/posts/search',
            {
                params: { query: searchQuery }
            }
        )
        return response.data
    } catch (error) {
        console.log(error)
    }
}

export async function getUsers() {
    try {
        const response = await axiosInstance.get(
            '/users'
        )
        return response.data
    } catch (error) {
        console.log(error)
    }
}

export async function getUserById(userId: string) {
    try {
        const response = await axiosInstance.get(
            `/users/${userId}`
        )
        return response.data
    } catch (error) {
        console.log(error)
    }
}

export async function updateUser(user: IUpdateUser) {
    try {
        // TODO: add new file to bucker
        const response = await axiosInstance.put(
            `/users/${user.userId}`,
            {
                name: user.name,
                bio: user.bio,
                imgId: user.imageId,
                imgUrl: user.imageUrl,
            }
        )
        return response.data
    } catch (error) {
        console.log(error)
    }
}

export async function getUserPosts(userId: string) {
    try {
        const response = await axiosInstance.get(
            `/posts/creator/${userId}`
        )
        return response.data
    } catch (error) {
        console.log(error)
    }
}
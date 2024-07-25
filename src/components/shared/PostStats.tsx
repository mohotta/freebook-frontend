import { useGetCurrentUser, useLikePost, useSavePost, useUnsavePost } from '@/lib/react-query/queriesAndMutations'
import { checkIsLiked } from '@/lib/utils'
import { Models } from 'appwrite'
import React, { useEffect, useState } from 'react'
import Loader from './Loader'


type postStatProps = {
    post?: Models.Document
    userId: string
}


const PostStats = ({ post, userId }: postStatProps) => {

    const likesList = post?.likes.map((user: Models.Document) => user.$id)

    const [likes, setLikes] = useState<string[]>(likesList)
    const [saved, setSaved] = useState(false)

    const { mutate: likePost } = useLikePost()
    const { mutate: savePost, isPending: isSaving } = useSavePost()
    const { mutate: unsavePost, isPending: isUnsaving } = useUnsavePost()

    const {data: currentUser} = useGetCurrentUser()

    const savedPostRecord = currentUser?.save.find(
        (record: Models.Document) => record.post.$id === post?.$id
    )

    useEffect(() => {
        setSaved(!!savedPostRecord)
    }, [currentUser])

    const handleLikePost = (e: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
        e.stopPropagation()

        let newLikes = [...likes]
        if (newLikes.includes(userId)) {
            newLikes = newLikes.filter((id) => id !== userId)
        }
        else {
            newLikes.push(userId)
        }
        setLikes(newLikes)
        likePost({postId: post?.$id || '', likesArray: newLikes})
    }

    const handleSavePost = (e: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
        e.stopPropagation();
    
        if (savedPostRecord) {
            setSaved(false);
            return unsavePost(savedPostRecord.$id);
        }
        
        savePost({ userId: userId, postId: post?.$id || '' });
        setSaved(true);
      };

    return (
        <div className='flex justify-between items-center z-20'>
            <div className='flex gap-2 mr-5'>
                <img 
                    src={
                        checkIsLiked(likesList, userId)?
                        "/assets/icons/liked.svg"
                        :
                        "/assets/icons/like.svg"
                    } 
                    alt="like" 
                    width={20}
                    height={20}
                    onClick={handleLikePost}
                    className='cursor-pointer'
                />
                <p className='small-medium lg:base-medium'> {likes.length} </p>
            </div>
            <div className='flex gap-2'>
                {
                    isSaving || isUnsaving ?
                    <Loader/>
                    :
                    <img 
                    src={
                        saved?
                        "/assets/icons/saved.svg"
                        :
                        "/assets/icons/save.svg"
                    } 
                    alt="save" 
                    width={20}
                    height={20}
                    onClick={handleSavePost}
                    className='cursor-pointer'
                />}
            </div>
        </div>
    )
}

export default PostStats
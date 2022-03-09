import Tweets from '../models/TweetsModel.js';
import mongoose from 'mongoose';

export const getTweets = async(req,res) =>{
    try {
        const tweet = await Tweets.find({})
        res.status(200).send(tweet);
    } catch (error) {
        res.status(400).send({message:error.message})
    }
}

export const findSingleTweet = async(req,res) =>{
    const {id} = req.params;
    try {
        const tweet = await Tweets.findById({_id:id})
        res.send(tweet)
    } catch (error) {
        res.send({message:error})
    }
}

export const findallTweetById = async(req,res) =>{
    const {id} = req.params;
    try {
        const tweets = await Tweets.find({_id:id})
        res.send(tweets)
    } catch (error) {
        res.send({message:error.message})
    }
}

export const postTweet = async(req,res) =>{
    const data = req.body;
    const newtweet = await Tweets(data);

    try {
        await newtweet.save()
        res.status(200).send(newtweet)
    } catch (error) {
        res.status(400).send({message:error.message})
    }
}

export const editTweet = async(req,res) =>{
    const {id} = req.params;
    const data = req.body;
    const post = await Tweets.findById({_id:id})
    if(post){
        const updatepost = await Tweets.findByIdAndUpdate({_id:id},data)
        res.send(updatepost)
    }
    else{
        res.send({message:"Post Doesnt exist"})
    }

  
}

export const deleteTweet = async(req,res) => {
    const {id} = req.params;
    const post = await Tweets.findById({_id:id})
    if(post){
            const deletetweet = await Tweets.findByIdAndRemove({_id:id})
            res.send({message:"Deleted Succesfully"});
    }
    else{
        res.send({message:"Post doesnt exist"})
    }

    
}

export const likeTweet = async(req,res) =>{
    const {id} = req.params;
    
    
    
    console.log(String(req.userId))
    const post = await Tweets.findById(id)
    const index = post.likes.findIndex((id) => id === String(req.userId))
   

    if(index == -1){
        post.likes.push(req.userId);
        
    }
    else{
        post.likes = post.likes.filter((id) => id !== String(req.userId))
        
    }

    const updatePost = await Tweets.findByIdAndUpdate(id,post,{new:true});
    res.send(updatePost);
}
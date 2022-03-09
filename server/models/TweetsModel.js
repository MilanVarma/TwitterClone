import mongoose from 'mongoose';

const TweetModel = mongoose.Schema({
    creatorId:String,
    name:String,
    tweet:String,
    likes:{
        type:[String],
        default:[]
    },

    createdAt:{
        type:Date,
        default:new Date()
    }
})

const Tweets = mongoose.model('tweets',TweetModel);
export default Tweets;
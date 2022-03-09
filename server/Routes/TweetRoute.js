import express from 'express';
import {getTweets,postTweet,editTweet,deleteTweet,findSingleTweet, findallTweetById, likeTweet} from '../controllers/Tweets.js'
import {addUser,getSingleUser,login} from '../controllers/Users.js';
import auth from '../middleware/auth.js';
const Router = express.Router();

Router
.route("/tweets")
.post(auth,postTweet)
.get(auth,getTweets)


Router
.route("/tweets/:id")
.get(auth,findSingleTweet)

Router
.route("/edittweet/:id")
.put(auth,editTweet)

Router
.route("/deletetweet/:id")
.delete(auth,deleteTweet)

Router
.route("/addUser")
.post(addUser)

Router
.route("/login")
.post(login)

Router
.route("/SingleUser/:id")
.get(getSingleUser)

Router
.route("/FindTweetsById/:id")
.get(findallTweetById)

Router
.route("/likepost/:id")
.put(auth,likeTweet)

export default Router;
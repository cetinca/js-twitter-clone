import { tweetsData } from "./data"
import { v4 as uuid } from "uuid"

const feed = document.getElementById("feed")
const tweetInput = document.getElementById("tweet-input")

document.addEventListener("click", (e) => {
    const button = e.target.id === "tweet-btn"
    const reply = e.target.dataset.reply
    const like = e.target.dataset.like
    const retweet = e.target.dataset.retweet
    button && handleTweetButton(e.target)
    reply && handleReplyClick(reply)
    like && handleLikeClick(like)
    retweet && handleRetweetClick(retweet)
})

function handleTweetButton(button) {
    if (tweetInput.value) {
        const newTweet = {
            handle: `@Cetin`,
            profilePic: `images/cetin.jpg`,
            likes: 0,
            retweets: 0,
            tweetText: tweetInput.value,
            replies: [],
            isLiked: false,
            isRetweeted: false,
            uuid: uuid(),
        }
        tweetsData.unshift(newTweet)
        tweetInput.value = ""
        tweetInput.focus()
        renderTweets(getFeedHtml(tweetsData))
    }
}

function handleReplyClick(uuid) {
    const newTweet = tweetsData.filter(item => {
        return item.uuid === uuid
    })[0]
    document.getElementById(`replies-${uuid}`).classList.toggle("hidden")
}

function handleLikeClick(uuid) {
    const newTweet = tweetsData.filter(item => {
        return item.uuid === uuid
    })[0]
    if (newTweet.isLiked) {
        newTweet.likes--
    } else {
        newTweet.likes++
    }
    newTweet.isLiked = !newTweet.isLiked
    renderTweets(getFeedHtml(tweetsData))
}

function handleRetweetClick(uuid) {
    const newTweet = tweetsData.filter(item => {
        return item.uuid === uuid
    })[0]
    if (newTweet.isRetweeted) {
        newTweet.retweets--
    } else {
        newTweet.retweets++
    }
    newTweet.isRetweeted = !newTweet.isRetweeted
    renderTweets(getFeedHtml(tweetsData))
}

function getFeedHtml(arr) {
    let feedHtml = ""
    arr.map(tweet => {
        let replies = ""
        tweet.replies.map(reply => {
            replies += `<div class="tweet-reply">
            <div class="tweet-inner">
                <img src="${reply.profilePic}" class="profile-pic">
                    <div>
                        <p class="handle">${reply.handle}</p>
                        <p class="tweet-text">${reply.tweetText}</p>
                    </div>
                </div>
        </div>`
        })

        const liked = tweet.isLiked && "liked" || ""
        const retweeted = tweet.isRetweeted && "retweeted" || ""
        const feed = `<div class="tweet">
        <div class="tweet-inner">
            <img src="${tweet.profilePic}" class="profile-pic">
            <div>
                <p class="handle">${tweet.handle}</p>
                <p class="tweet-text">${tweet.tweetText}</p>
                <div class="tweet-details">
                    <span class="tweet-detail">
                    <i class="fa-solid fa-comment" data-reply="${tweet.uuid}"></i>
                    ${tweet.replies.length}
                    </span>
                    <span class="tweet-detail ${liked}">
                    <i class="fa-solid fa-heart" data-like="${tweet.uuid}"></i>
                    ${tweet.likes}
                    </span>
                    <span class="tweet-detail ${retweeted}">
                    <i class="fa-solid fa-retweet" data-retweet="${tweet.uuid}"></i>
                    ${tweet.retweets}
                    </span>
                </div>   
            </div>            
        </div>
        <div class="hidden" id="replies-${tweet.uuid}">
        ${replies}
        </div> 
        </div>`
        feedHtml += feed
    })
    return feedHtml
}

function renderTweets(tweets) {
    feed.innerHTML = tweets
}

renderTweets(getFeedHtml(tweetsData))

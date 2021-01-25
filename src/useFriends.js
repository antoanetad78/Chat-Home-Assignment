import axios from 'axios';
import { useState, useEffect, useCallback} from 'react'

export const useFriends = () => {
  const [currentUser, setCurrentUser] = useState({})
  const [username, setUsername] = useState('')
  const [feed, setFeed] = useState([])
  const [message, setMessage] = useState({
    text: '',
    author: '',
    time: ''
  })
  const [friend, setFriend] = useState('')
  const readUserName = name => {
    setUsername(name)
  }
  const setMessageFeed = useCallback((conversation) => setFeed(conversation), [setFeed])
  const selectFriend = useCallback(friend=>setFriend(friend),[setFriend])
  const setMessageData = (message) => {
    setMessage({
      text: message,
      author: currentUser.name,
      time: new Date().toLocaleTimeString('nb-NO')
    })
  }
  const onMsgSubmit = async () => {
    if(!message.text){
      return
    }
    // find a way to patch user/:id/friends/:frinedId/conversation
    const res = await axios.patch(`http://locahost:3004/users/${currentUser.id}/friends/${friend}`, {conversation: feed})
    setFeed([
      ...feed,
      message
    ])
    setMessage({
    text: '',
    autor: '',
    time: ''
    })
  }
  useEffect(()=> {
    const fetchUsers = async() => {
      const result = await axios.get(`http://localhost:3004/users?name=${username}`)
      if(!result.data[0]){
        return
      }
      setCurrentUser(result.data[0])
    }
    if(username){
      fetchUsers()
    }
  },[username])
  
  return {
    currentUser,
    readUserName,
    onMsgSubmit,
    setMessageFeed,
    setMessageData,
    selectFriend,
    friend,
    feed,
    message
  }
}
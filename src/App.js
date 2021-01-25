import { useState, useEffect } from 'react'
import './App.css';
import {useFriends} from './useFriends'

function App() {
  const { currentUser, feed, message, friend, setMessageFeed, setMessageData, readUserName, onMsgSubmit, selectFriend } = useFriends()
  const [user, setUser] = useState('')
  useEffect(()=>{
    if(friend) {
      const foundFriend = currentUser.friends.find(f=> f.friendId === friend)
      if(foundFriend){
        setMessageFeed(foundFriend.conversation)
      }
      
    }
    return ()=>{}
  }, [friend, currentUser.friends, setMessageFeed])

  return (
    <div className="App">
      {currentUser.id ? (
        <>
         <ul className="friends-list">
         <header className='headline'>Friends</header>
           {currentUser.friends.map(f=>{
             return <li key={f.friendId} className='friend' onClick={()=>selectFriend(f.friendId)}>{f.name}</li>
           })}
         </ul>
        <div className='chat-window'>
          <div className='messages-feed'>
            <header className='headline'>
              Conversation
             </header>
               {feed && feed.map(message=>{
                 return <div key={message.time} className={message.senderId===currentUser.id ? 'own-message message':'friend-message message'}>
                   <p className='msg-text'>{message.text}</p>
                     <small>Sent by: {message.author}</small>
                     <small>{message.time}</small>
                   </div>
               })}
          </div>
        </div>
        <form onSubmit={e=>{
          e.preventDefault()
          onMsgSubmit(message)
          }} className='message-form' autoComplete="off">
            <input className='input-text' type="text" name="message" id="message-field" value={message.text} onChange={e=>setMessageData(e.target.value)} />
            <button type="submit" className='send-button'>Send</button>
          </form>
       </>   
      ): (
        <>
          <form 
            onSubmit={ e => {
              e.preventDefault()
              readUserName(user)
            }} 
            className='login-form'
          >
            <input type="text" className='input-text' value={user} onChange={e=>setUser(e.target.value)}/>
            <button  type="submit" onClick={()=>readUserName(user)} className='send-button ml-1'>Login</button>
          </form>
        </>
      )}
     
    </div>
  );
}

export default App;

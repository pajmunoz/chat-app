import React from 'react';

class ChatRoom extends React.Component {
    constructor(){
        super()
        this.state = {
            user: 'Pepito',
            messages: [
                {id:0, text:'putututu'},
                {id:1, text:'oppopo'},
                {id:2, text:'asadas'}
            ]
        }
    }


  render() {
    /*destructuring*/
    const {messages} = this.state
    const messageList = messages.map(message => <li key={message.id}>{this.state.user}: {message.text}</li>)

    return (
        <ul>
           {messageList}     
        </ul>
        );
  }
}

export default ChatRoom;

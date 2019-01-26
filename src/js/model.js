const model = {};

model.authUser = undefined;
model.conversations = undefined;
model.selectedConversation = undefined;
model.unListen = undefined;

// param: {Object} {uid: string, displayName: string} authUser
model.loginSuccess = (authUser) => {
  model.authUser = authUser;
};

model.loadConversations = (callback) => {
  const db = firebase.firestore();
  const unListen = db.collection('conversations').where('users', 'array-contains', model.authUser.email)
    .onSnapshot((snapShot) => {
      const docChanges = snapShot.docChanges();
      console.log(docChanges);

      if (model.conversations === undefined) {
        const conversations = snapShot.docChanges().map((item) => ({
          id: item.doc.id,
          ...item.doc.data(),
        }));
  
        model.conversations = conversations;
        model.selectedConversation = conversations[0] ? conversations[0] : {};
        callback(model.conversations, model.selectedConversation)
      } else {
        for (const item of docChanges) {
          if (item.type === 'added') {
            const newConversation = {
              id: item.doc.id,
              ...item.doc.data(),
            };
            if (model.conversations.map((item) => item.id).indexOf(newConversation.id) === -1) {
              model.conversations.push(newConversation);
              if (!model.selectedConversation) {
                model.selectedConversation = newConversation;
              }
              view.addConversation(newConversation);
              view.addNotification(newConversation.id);
            }
          } else if (item.type === 'modified') {
            const conversation = {
              id: item.doc.id,
              ...item.doc.data(),
            };
            
            // update model
            for (let i = 0; i < model.conversations.length; i += 1) {
              if (model.conversations[i].id === conversation.id) {
                model.conversations[i] = conversation;
              }
            }

            // update view
            if (conversation.id === model.selectedConversation.id) {
              if (conversation.messages.length !== model.selectedConversation.messages.length) {
                view.addMessage(conversation.messages[conversation.messages.length - 1]);
                if (conversation.messages[conversation.messages.length - 1].user !== model.authUser.email) {
                  view.addNotification(conversation.id);
                }
              } else {
                view.addConversationMember(conversation.users[conversation.users.length - 1])
                view.addNotification(conversation.id);
              }
            }
          }
        }
      }

      // if (snapShot.docChanges()[0].type === 'added') {
      //   const conversations = snapShot.docChanges().map((item) => ({
      //     id: item.id,
      //     ...item.data(),
      //   }));
      //   model.conversations = conversations;
      //   model.selectedConversation = conversations[0];

      //   // update ui
      //   callback(model.conversations, model.selectedConversation)
      // } else {

      // }

      // const conversations = [];
      // snapShot.forEach((item) => conversations.push({
      //   id: item.id,
      //   ...item.data(),
      // }));

      // model.conversations = conversations;
      // model.selectedConversation = conversations[0];

      // // listen to update
      // conversations.map((conversation) => {
      //   db.collection('conversations').doc(conversation.id).onSnapshot((doc) => {
      //     model.conversations.forEach((item) => {
      //       if (item.id === doc.id && item.messages.length !== doc.data().messages.length) {
      //         item.messages = doc.data().messages;
      //         view.addNotification(item.id);
      //         view.addMessage(doc.data().messages[doc.data().messages.length - 1]);
      //       }
      //     });
      //   });
      // });

      // callback(model.conversations, model.selectedConversation)
    });
  model.unListen = unListen;
};

model.addMessage = (newMessage) => {
  const db = firebase.firestore();
  const newMessageObj = {
    user: model.authUser.email,
    content: newMessage,
    createdAt: new Date().toISOString(),
  };

  db.collection('conversations').doc(model.selectedConversation.id).update({
    messages: firebase.firestore.FieldValue.arrayUnion(newMessageObj),
  });
}

model.createConversation = (conversationInfo, callback) => {
  const db = firebase.firestore();
  const newConversation = {
    name: conversationInfo.conversationName,
    users: [model.authUser.email, conversationInfo.friendEmail],
    messages: [],
    createdAt: new Date().toISOString(),
  };

  db.collection('conversations').add(newConversation);
  view.setActiveScreen('chat');
}

model.changeSelectedConversation = (newSelectedConversationId, callback) => {
  const newSelectedConversation = model.conversations.filter((item) => item.id === newSelectedConversationId)[0]
  model.selectedConversation = newSelectedConversation;
  callback(newSelectedConversation);
};

model.addMember = (newMemberEmail, callback) => {
  const db = firebase.firestore();
  db.collection('conversations').doc(model.selectedConversation.id).update({
    users: firebase.firestore.FieldValue.arrayUnion(newMemberEmail)
  });
  model.selectedConversation.users.push(newMemberEmail);
  callback(newMemberEmail);
};
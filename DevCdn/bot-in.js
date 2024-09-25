     // Chatbot training parameters

     var company = "";
     var companyemail = "";
     var companyemailcc = "";
     var chatbotname = "";
     var welcome = ``;
     var companydata = ``;
     var chatcolor = "";
     var bgcolor = "";
     var inputcolor = "";
     var buttoncolor = "";
     var botcolor = "";
     var usercolor = "";
     var bubblecolor = "";


     //console.log("TEST DATA");
             //console.log(company);
             //console.log(companyemail);
             //console.log(companyemailcc);
             //console.log(chatbotname);
             //console.log(welcome);
             //console.log(companydata);
             //console.log(chatcolor);
             //console.log(bgcolor);
             //console.log(inputcolor);
             //console.log(buttoncolor);
             //console.log(botcolor);
             //console.log(usercolor);
             //console.log(bubblecolor);



             

 fetch('data.json')
         .then(response => response.json())  // Parse the JSON data
         .then(jsonData => {
             
           // Assign values from JSON to the variables
             company = jsonData.company;
             companyemail = jsonData.companyemail;
             companyemailcc = jsonData.companyemailcc;
             chatbotname = jsonData.chatbotname;
             welcome = jsonData.welcome;
             companydata = jsonData.companydata;
             chatcolor = jsonData.chatcolor;
             bgcolor = jsonData.bgcolor;
             inputcolor = jsonData.inputcolor;
             buttoncolor = jsonData.buttoncolor;
             botcolor = jsonData.botcolor;
             usercolor = jsonData.usercolor;
             bubblecolor = jsonData.bubblecolor;



             //console.log("USER DATA");
             //console.log(company);
             //console.log(companyemail);
             //console.log(companyemailcc);
             //console.log(chatbotname);
             //console.log(welcome);
             //console.log(companydata);
             //console.log(chatcolor);
             //console.log(bgcolor);
             //console.log(inputcolor);
             //console.log(buttoncolor);
             //console.log(botcolor);
             //console.log(usercolor);
             //console.log(bubblecolor);

         
 function invertColor(hex, bw) {
   if (hex.indexOf('#') === 0) {
     hex = hex.slice(1);
   }
   // convert 3-digit hex to 6-digits.
   if (hex.length === 3) {
     hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
   }
   if (hex.length !== 6) {
     throw new Error('Invalid HEX color.');
   }
   var r = parseInt(hex.slice(0, 2), 16),
     g = parseInt(hex.slice(2, 4), 16),
     b = parseInt(hex.slice(4, 6), 16);

   if (bw) {
     return (r * 0.299 + g * 0.587 + b * 0.114) > 186
       ? '#000000'
       : '#FFFFFF';
   }

   // invert color components
   r = (255 - r).toString(16);
   g = (255 - g).toString(16);
   b = (255 - b).toString(16);
   // pad each with zeros and return
   return "#" + padZero(r) + padZero(g) + padZero(b) + 30;
 }

 function padZero(str, len) {
   len = len || 2;
   var zeros = new Array(len).join('0');
   return (zeros + str).slice(-len);
 }



     const chatContainer = document.getElementById('chat-container2024');
     const chatIcon = document.getElementById('chat-icon2024');


     document.getElementById("sendButton2024").style.backgroundColor = buttoncolor;
     document.getElementById("sendButton2024").style.color = invertColor(buttoncolor, true);
     document.getElementById("messageInput2024").style.color = invertColor(inputcolor, true);
     document.getElementById("messageInput2024").style.backgroundColor = inputcolor;
     document.getElementById("chatbox2024").style.backgroundColor = chatcolor;
     document.getElementById("chat-container2024").style.backgroundColor = bgcolor;
     document.getElementById("chat-container2024").style.borderColor = invertColor(bgcolor, false);
     document.getElementById("chatbot-bubble2024").style.backgroundColor = bubblecolor;
     document.getElementById("chatbot-bubble2024").style.borderColor = invertColor(bubblecolor, false);
     document.getElementById("chat-icon2024").style.color = invertColor(bubblecolor, true);





     const srcX = 'https://img.icons8.com/?size=100&id=46&format=png&color=' + invertColor(bubblecolor, true).substring(1);
     const srcB = 'https://img.icons8.com/ios-filled/50/' + invertColor(bubblecolor, true).substring(1) + '/chat.png';


     if (chatContainer.style.display === 'none' || chatContainer.style.display === '') {
       chatIcon.src = srcB; // Chat icon
   } else {
       chatIcon.src = srcX; // Close icon
   }



     const chatbox2024 = document.getElementById("chatbox2024");

     const chatId = crypto.randomUUID();

     let receiving = false;

     let responseText = "";

     let websocketResponse = "";


     function createMessageElement(text, alignment) {
       const messageElement = document.createElement("div");
     
       messageElement.style.color = alignment === "left" ? invertColor(botcolor, true) : invertColor(usercolor, true);
       messageElement.style.border = alignment === "left" ? `1px solid ${invertColor(botcolor, true)}` : `1px solid ${invertColor(usercolor, true)}`;
       messageElement.style.backgroundColor = alignment === "left" ? botcolor : usercolor;
     
       messageElement.className = "message-element";
       messageElement.classList.add(alignment === "left" ? "message-bot" : "message-user");
     
       messageElement.textContent = text;
       return messageElement;
     }
     




     function connectWebSocket(systemPrompt, message, task) {
       return new Promise((resolve, reject) => {

         receiving = true;
         const url = "wss://backend.buildpicoapps.com/api/chatbot/chat";
         const websocket = new WebSocket(url);

         websocket.addEventListener("open", () => {
           websocket.send(
             JSON.stringify({
               chatId: chatId,
               appId: "keep-physical",
               systemPrompt: systemPrompt,
               message: message,
             })
           );
         });

         const messageElement = createMessageElement("", "left");
         chatbox2024.appendChild(messageElement);



         let responseText = "";

         websocket.onmessage = (event) => {
           responseText += event.data; // Append incoming data to responseText
           messageElement.textContent = responseText;
           chatbox2024.scrollTop = chatbox2024.scrollHeight;
         };

         websocket.onclose = (event) => {
           if (event.code === 1000) {
             receiving = false;
             resolve(responseText); // Resolve the promise with the final response
           } else {
             messageElement.textContent += "Error getting response from server. Refresh the page and try again.";
             chatbox2024.scrollTop = chatbox2024.scrollHeight;
             receiving = false;
             reject(new Error("WebSocket closed with an error"));
           }
         };

         websocket.onerror = (error) => {
           receiving = false;
           reject(error); // Reject the promise on error
         };
       });
     }

     messageInput2024.addEventListener("keydown", (event) => {
       if (
         event.key === "Enter" &&
         !receiving &&
         messageInput2024.value.trim() !== ""
       ) {
         event.preventDefault();
         sendButton2024.click();
       }
     });

     function welcomeMessageFirstTime(message) {
       const welcomeMessage = message;
       const messageElement = createMessageElement(welcomeMessage, "left");
       chatbox2024.appendChild(messageElement);

     }





     welcomeMessageFirstTime(welcome);




 const sendButton2024 = document.getElementById("sendButton2024");

 sendButton2024.addEventListener("click", async function () {
   const messageInput2024 = document.getElementById("messageInput2024");
   const userInput = messageInput2024.value;
   const prompt = `TASK: if someone asks you anything, your task is to classify the Request in the frame of these given functions: (C= "User asking to Contact the company or he is interested to get one of our products or services ", G= "general info", S= "support ticket if the user have any issue or problem or need help", D= "if the user did input all his data for rdv or Contact", R= "if the user want to do a meet or need an appointement or a rdv or need to see us") and then return response that just looks like this : X , focus on the response form that should be ONLY the letter alone , this X is a variable that can be C, R, D, G or S
   
   User input: ${userInput}`;

   try {
     const response = await fetch(
       `https://a.picoapps.xyz/ask-ai?prompt=${encodeURIComponent(prompt)}`
     );
     if (!response.ok) {
       throw new Error("Network response was not ok");
     }
     const data = await response.json();
     //console.log(data.response);





     if (data.response === "R") {

       //console.log("rdv");

       let systemPrompt = `You are an AI chatbot for ${company} That handle RDVs and appointements section by asking questions about details of the appointement in a short simple text paragraphe where you ask about the fullname of the user, the email,the phone number, the subject of rdv, the timing and date of the meet, and if it is online or inplace. and dont use numbers for questions , just ask diectly the question in a simple text form.       `;

       if (!receiving && messageInput2024.value.trim() !== "") {
         const messageText = messageInput2024.value.trim();
         messageInput2024.value = "";
         const messageElement = createMessageElement(
           messageText,
           "right"
         );
         chatbox2024.appendChild(messageElement);
         chatbox2024.scrollTop = chatbox2024.scrollHeight;

         // Use await to get the response from connectWebSocket
         websocketResponse = await connectWebSocket(systemPrompt, messageText, "R");
         //console.log(websocketResponse); // Log the WebSocket response

       }
     } else {
       if (data.response === "C") {
         //console.log("contact");

         let systemPrompt = `
       
       You are an AI chatbot for ${company} That handle company communication and contact section by asking questions about details of the message you need to deliver in form of short simple text paragraphe : like the name of the user, the email, the phone number, the subject and the message`;


         if (!receiving && messageInput2024.value.trim() !== "") {
           const messageText = messageInput2024.value.trim();
           messageInput2024.value = "";
           const messageElement = createMessageElement(
             messageText,
             "right"
           );
           chatbox2024.appendChild(messageElement);
           chatbox2024.scrollTop = chatbox2024.scrollHeight;
           // Use await to get the response from connectWebSocket
           websocketResponse = await connectWebSocket(systemPrompt, messageText, "C");
           //console.log(websocketResponse); // Log the WebSocket response

         }
       } else {
         if (data.response === "S") {
           //console.log("support");

           let systemPrompt = `You are an AI chatbot for ${company} That handle support questions and try to help user by giving them usefull infos that can support them or help them, and always you tell them that the issue was redirected to support office and they have been notified with the user issue . Some of Company Data and contact infos that can help you support the user : 
 ${companydata}
 
`;


           if (!receiving && messageInput2024.value.trim() !== "") {
             const messageText = messageInput2024.value.trim();

             const messageElement = createMessageElement(
               messageText,
               "right"
             );
             chatbox2024.appendChild(messageElement);
             chatbox2024.scrollTop = chatbox2024.scrollHeight;
             // Use await to get the response from connectWebSocket
             const we = await connectWebSocket(systemPrompt, messageText, "S");


             var body = '<br/> >> user message : ' + messageText + '<br/> <br/> <br/> >> chatbot response : ' + we + '<br/> <br/> <br/> <br/> <br/> ';



             //MY SMTP API CALL CODE

             const isHtml = true;
             const response = await fetch('https://mail-api-eight.vercel.app/api/send-email', {
               method: 'POST',
               headers: {
                 'Content-Type': 'application/json'
               },
               body: JSON.stringify({
                 to: companyemail,
                 cc: companyemailcc,
                 subject: "Support Request",
                 message: body,
                 isHtml: isHtml
               })
             });

             const result = await response.json();

             if (response.ok) {
               alert(`Notification sent to ${company} Support`);
             } else {
               alert('Error in sending Mail !!!');
             }



             messageInput2024.value = "";

           }
         } else {
           if (data.response === "G") {
             //console.log("general");

             let systemPrompt = `
 You are ${chatbotname}, an AI chatbot for ${company} and made by ${company}, you only talk about ${company} , if the user ask any other question no related to ${company} you kindly tell him you cant because you are only trained on ${company} data , Ask the user's name and then address them with the name in the conversation. give short well-formatted answers with spaces and jump lines after each question to make the text visually appealing and focus on giving short summerized answers, and only talk in subjects related to ${company} and you never say you are developed by OpenAI or you are based on the GPT, you always say ${company} made you.  
 Some of Company general Data :${companydata}`;

             if (!receiving && messageInput2024.value.trim() !== "") {
               const messageText = messageInput2024.value.trim();
               messageInput2024.value = "";
               const messageElement = createMessageElement(
                 messageText,
                 "right"
               );
               chatbox2024.appendChild(messageElement);
               chatbox2024.scrollTop = chatbox2024.scrollHeight;

               // Use await to get the response from connectWebSocket
               const web = await connectWebSocket(systemPrompt, messageText, "G");

             }

           } else {
             if (data.response === "D") {
               //console.log("SMTP");


               if (messageInput2024.value.trim() !== "") {
                 const messageText = messageInput2024.value.trim();
                 const messageElement = createMessageElement(
                   messageText,
                   "right"
                 );
                 chatbox2024.appendChild(messageElement);
                 chatbox2024.scrollTop = chatbox2024.scrollHeight;
               }




               const smtpprompt = `>TASK: if someone asks you anything, your task is to extract the user's name, email, phone number, the subject from The User input and the Previous chatbot question, Then if the user seems like he want an rdv make a paragraphe called message that contain the subject of rdv, the timing and date of the meet, and if it is online or inplace. and if it is just a normale contact Just put the message from the user's input. all in form of a Json Like this :
         {
           "name": "xxxx",
           "email": "xxxx",
           "phone": "xxxx",
           "subject": "xxxx",
           "message": "xxxx"
         }
         
         >DATA : Here is the Previous chatbot question so you can understand more the subject and the message: ${websocketResponse}
         >DATA : The User input is : ${messageInput2024.value}`;

               messageInput2024.value = "";

               //console.log(smtpprompt);

               try {
                 const res = await fetch(
                   `https://a.picoapps.xyz/ask-ai?prompt=${encodeURIComponent(smtpprompt)}`
                 );
                 if (!res.ok) {
                   throw new Error("Network response was not ok");
                 }
                 const d = await res.json();
                 //console.log(d.response);

                 const jsonStartIndex = d.response.indexOf('{');
                 const jsonContent = d.response.substring(jsonStartIndex);
                 const parsedData = JSON.parse(jsonContent);

                 const name = parsedData.name;
                 const email = parsedData.email;
                 const phone = parsedData.phone;
                 const subject = parsedData.subject;
                 const message = parsedData.message;

                 var body = '<br/> >> E-mail : ' + email + '<br/> >> Name : ' + name + '<br/> >> Phone Number : ' + phone + '<br/><br/>------------------------------------------------------------------------------------<br/> subject : ' + subject + '<br/>------------------------------------------------------------------------------------<br/><br/>' + message + '<br/> <br/> <br/> <br/> <br/> ';



                 //MY SMTP API CALL CODE

                 const isHtml = true;
                 const response = await fetch('https://mail-api-eight.vercel.app/api/send-email', {
                   method: 'POST',
                   headers: {
                     'Content-Type': 'application/json'
                   },
                   body: JSON.stringify({
                     to: companyemail,
                     cc: companyemailcc,
                     subject: subject,
                     message: body,
                     isHtml: isHtml
                   })
                 });

                 const result = await response.json();

                 if (response.ok) {
                   //alert('Email sent successfully!');
                   const messageElement = createMessageElement(`Your Request was sent successfully to ${company} Team, Thank you For your time, and feel free to ask me anything else you need, ${chatbotname} always at your service`, "left");
                   chatbox2024.appendChild(messageElement);
                   chatbox2024.scrollTop = chatbox2024.scrollHeight;
                 } else {
                   //alert('Failed to send email: ' + result.error);
                   const messageElement = createMessageElement("Your Request was Not Sent, Please try again later!", "left");
                   chatbox2024.appendChild(messageElement);
                   chatbox2024.scrollTop = chatbox2024.scrollHeight;
                 }



               } catch (error) {
                 console.error("Error:", error);
               }


             }
           }
         }
       }
     }
   } catch (error) {
     console.error("Error:", error);
   }
 });

 function toggleChat() {
     const chatContainer = document.getElementById('chat-container2024');
     const chatIcon = document.getElementById('chat-icon2024');
     

     //console.log(srcB);
     //console.log(srcX);

     if (chatContainer.style.display === 'none' || chatContainer.style.display === '') {
         chatContainer.style.display = 'block';
         chatIcon.src = srcX; // Close icon
     } else {
         chatContainer.style.display = 'none';
         chatIcon.src = srcB; // Chat icon
     }
 }


 document.getElementById("chatbot-bubble2024").addEventListener("click", () => {
     toggleChat();
 });

})
         .catch(error =>{ console.error('Error fetching JSON data:', error);
         alert('Error fetching data.json!!! check the file name and root, it should be data.json or go build a new one on https://botin.surge.sh/chatbotmaker');
       
       });

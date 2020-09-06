import { Alert } from "react-native";

export function createAlert(title, messages, simple) {
  let message = "";
  if (simple) {
    message = messages;
  } else {
    message = splitMessages(messages);
  }

  Alert.alert(title, message, [{ text: "OK" }], {
    cancelable: false,
  });
}

function splitMessages(messages) {
  let splited_message = "";
  if (Object.keys(messages)[0] != 0) {
    Object.keys(messages).forEach((key, index) => {
      messages[key].forEach((error) => {
        splited_message = splited_message + "- " + error + "\n";
      });
    });
  } else {
    splited_message = messages[0];
  }
  return splited_message;
}

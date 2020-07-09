import { Alert } from "react-native";

export function createAlert(messages) {
  let message = "";
  if (Array.isArray(messages)) {
    message = splitMessages(messages);
  } else {
    message = messages;
  }

  Alert.alert("Oups !", message, [{ text: "OK" }], {
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

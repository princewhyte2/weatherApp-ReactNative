import React from "react";
import { StyleSheet, TextInput, View } from "react-native";

interface props {
  placeholder: string;
  onSubmit: (city: string) => void;
  //onSubmit: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

function SearchInput({ placeholder, onSubmit }: props) {
  const [value, setValue] = React.useState(() => "");
  function handleChangeText(location: string) {
    // We need to do something with newLocation
    setValue(location);
  }

  function handleSubmit() {
    if (!value) return;
    onSubmit(value);
    setValue("");
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.textInput}
        clearButtonMode="always"
        autoCorrect={false}
        value={value}
        placeholder={placeholder}
        underlineColorAndroid="transparent"
        placeholderTextColor="white"
        onChangeText={handleChangeText}
        onSubmitEditing={handleSubmit}
      />
    </View>
  );
}
export default SearchInput;

const styles = StyleSheet.create({
  container: {
    height: 40,
    marginTop: 20,
    backgroundColor: "#666",
    marginHorizontal: 40,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  textInput: {
    flex: 1,
    color: "white",
  },
});

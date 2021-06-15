import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  ActivityIndicator,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import SearchInput from "./components/SearchInput";
import { fetchLocationId, fetchWeather } from "./utils/api";
import getImageForWeather from "./utils/getImageForWeather";

export default function App() {
  const [location, setLocation] = React.useState("");
  const [temperature, setTemperature] = React.useState(0);
  const [weather, setWeather] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(false);

  //React.useEffect(() => setLocation("San Francisco"));
  const handleUpdateLocation = async (city: string) => {
    if (!city) return;
    setLoading(true);
    // async () => {
    try {
      const locationId = await fetchLocationId(city);
      console.log("working", locationId);
      const { location, weather, temperature } = await fetchWeather(locationId);
      setLoading(false);
      setError(false);
      setLocation(location);
      setWeather(weather);
      setTemperature(temperature);
    } catch (error) {
      setLoading(false);
      setError(true);
    }
    // };
    setLocation(city);
  };

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <StatusBar style="light" />
      <ImageBackground
        source={getImageForWeather(weather)}
        style={styles.imageContainer}
        imageStyle={styles.image}
      >
        <View style={styles.detailsContainer}>
          <ActivityIndicator animating={loading} color="white" size="large" />
          {!loading && (
            <View>
              {error && (
                <Text style={[styles.smallText, styles.textstyle]}>
                  Could not load weather , please try a different city.
                </Text>
              )}
              {!error && (
                <View>
                  <Text style={[styles.largeText, styles.textstyle]}>
                    {location}
                  </Text>
                  <Text style={[styles.smallText, styles.textstyle]}>
                    {weather}
                  </Text>
                  <Text style={[styles.largeText, styles.textstyle]}>
                    {`${Math.round(temperature)}°`}
                  </Text>
                </View>
              )}
              <SearchInput
                placeholder="Search any city"
                onSubmit={handleUpdateLocation}
              />
            </View>
          )}
        </View>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#34495e",
  },
  textstyle: {
    textAlign: "center",
    fontFamily: Platform.OS == "ios" ? "AvenirNext-Regular" : "Roboto",
    color: "white",
  },
  largeText: {
    fontSize: 44,
  },
  smallText: {
    fontSize: 18,
  },
  imageContainer: {
    flex: 1,
  },
  image: {
    flex: 1,
    resizeMode: "cover",
  },
  detailsContainer: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.2)",
    paddingHorizontal: 20,
  },
});

import { Button, Text, View, StyleSheet } from "react-native";
import Geolocation from "@react-native-community/geolocation";
import { useEffect, useState } from "react";
import { PanicAlert } from "@/api/types";
import { AddPanicAlert } from "@/api";
import { getErrorMessage, throttleFunc } from "./utils";

export default function Index() {
  const [location, setLocation] = useState({
    latitude: 0,
    longitude: 0,
  });
  const [error, setError] = useState<string | null>();
  const [disableBtn, setDisableBtn] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (location.latitude !== 0 && location.longitude !== 0) {
      throttleFunc(createPanicAlert, 60000);
    }
  }, [location]);

  const getCurrentUserLocation = () => {
    Geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLocation({ latitude, longitude });
        setError(null);
      },
      (err) => {
        console.error(err);
        setError(err.message);
      },
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  };

  const createPanicAlert = () => {
    const today = new Date();

    const request: PanicAlert = {
      latitude: location.latitude,
      longitude: location.longitude,
      userId: 1,
      location: "Randburg",
      createdAt: today.toString(),
      updatedAt: today.toString(),
      status: "NEW",
    };

    try {
      AddPanicAlert(request);
    } catch (error) {
      const message = getErrorMessage(error);
      setError(message);
    }
  };

  const handlePanicClick = () => {
    getCurrentUserLocation();
    setDisableBtn(true);
    setMessage("Alert has been dispatched, we will be in contact soon");

    setTimeout(() => {
      setDisableBtn(false);
    }, 60000);
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text style={styles.heading}>In Panic</Text>

      <View style={styles.btn}>
        <Button
          title={disableBtn ? "PANIC!!" : "Click me"}
          onPress={handlePanicClick}
          disabled={disableBtn}
          color="#fb2c36"
        />
      </View>
      {message ? <Text>{message}</Text> : null}
      {error ? <Text>{error}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  btn: {
    borderRadius: "99px",
  },

  heading: {
    marginBottom: 32,
    fontSize: 48,
    fontWeight: 400,
  },
});

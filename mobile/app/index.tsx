import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import Geolocation from "@react-native-community/geolocation";
import { useEffect, useState } from "react";
import { PanicAlert, Responder } from "@/api/types";
import { AddPanicAlert } from "@/api";
import { getErrorMessage, throttleFunc } from "./utils";
import { format } from "date-fns";

export default function Index() {
  const [location, setLocation] = useState({
    latitude: 0,
    longitude: 0,
  });
  const [error, setError] = useState<string | null>();
  const [disableBtn, setDisableBtn] = useState(false);
  const [message, setMessage] = useState("");

  const createPanicAlert = async () => {
    const today = format(new Date(), "yyyy-MM-dd HH:mm:ss");

    const request: PanicAlert = {
      latitude: location.latitude,
      longitude: location.longitude,
      createdAt: today,
      updatedAt: today,
      status: "NEW",
      // User details from partner (per their users)
      userId: 10,
      userFullName: "Web Barbie",
      userContact: 27734657799,
    };

    try {
      const response = await AddPanicAlert(request);

      if (!error) {
        setDisableBtn(true);
        setMessage(
          `Alert has been dispatched to your current location - VehicleInfo ${response.responderVehicle} Contact: ${response.responderContact}`
        );
        setTimeout(() => {
          setDisableBtn(false);
        }, delay);
      }
    } catch (error) {
      const message = getErrorMessage(error);
      setError(message);
    }
  };

  const delay = 10000; // ⏰ This can be longer, leaving it as 10 sec for testing

  useEffect(() => {
    if (location.latitude !== 0 && location.longitude !== 0) {
      createPanicAlert();
    }
  }, [location]);

  const getCurrentUserLocation = () => {
    // DEMO: For when the location is not working as expected
    if (process.env.EXPO_PUBLIC_RUN_DEBUG === "true") {
      // Midrand
      setLocation({ latitude: -25.9819, longitude: 28.1329 });
      setError(null);
      return;
    }

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

  const handlePanicClick = () => {
    getCurrentUserLocation();
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

      <TouchableOpacity
        style={disableBtn ? styles.panicBtnDisabled : styles.panicBtn}
        onPress={handlePanicClick}
        disabled={disableBtn}
      >
        <Text style={styles.panicBtnText}>
          {disableBtn ? "PANIC!!" : "Click me"}
        </Text>
      </TouchableOpacity>

      {message ? <Text style={styles.message}>{message}</Text> : null}
      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  panicBtn: {
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: "#fb2c36",
  },
  panicBtnDisabled: {
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: "lightgray",
  },
  panicBtnText: {
    color: "white",
  },
  message: {
    marginTop: 12,
  },
  error: {
    marginTop: 12,
    color: "#fb2c36",
  },

  heading: {
    marginBottom: 32,
    fontSize: 48,
    fontWeight: 400,
  },
});

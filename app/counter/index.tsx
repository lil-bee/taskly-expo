import { intervalToDuration, isBefore } from "date-fns";
import * as Notifications from "expo-notifications";
import { useEffect, useState } from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import TimeSegment from "../../components/TimeSegment";
import { theme } from "../../theme";
import { registerForPushNotificationsAsync } from "../../utils/registerForPushNotificationsAsync";

// 10 seconds from now
const timestamp = Date.now() + 10 * 1000;

type CountdownStatus = {
  isOverdue: boolean;
  distance: ReturnType<typeof intervalToDuration>;
};

export default function CounterScreen() {
  const [status, setStatus] = useState<CountdownStatus>({
    isOverdue: false,
    distance: {},
  });
  useEffect(() => {
    const intervalId = setInterval(() => {
      const isOverdue = isBefore(timestamp, Date.now());
      const distance = intervalToDuration(
        isOverdue
          ? { end: Date.now(), start: timestamp }
          : { start: Date.now(), end: timestamp }
      );
      setStatus({ isOverdue, distance });
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const scheduleNotification = async () => {
    const result = await registerForPushNotificationsAsync();
    if (result === "granted") {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: "Im a notif from your app! 📨",
        },
        trigger: {
          type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
          seconds: 5,
        },
      });
    } else {
      Alert.alert(
        "Unable to schedule notification",
        "Enavle the notifications permission for Expo Go in Settings"
      );
    }
  };

  return (
    <View
      style={[styles.container, status.isOverdue ? styles.containterLate : ""]}
    >
      {!status.isOverdue ? (
        <Text style={styles.heading}>Thing due in</Text>
      ) : (
        <Text style={[styles.heading, styles.whiteText]}>Thing Overdue by</Text>
      )}
      <View style={styles.row}>
        <TimeSegment
          textStyle={status.isOverdue ? styles.whiteText : undefined}
          unit="days"
          number={status.distance.days ?? 0}
        />
        <TimeSegment
          textStyle={status.isOverdue ? styles.whiteText : undefined}
          unit="Hours"
          number={status.distance.hours ?? 0}
        />
        <TimeSegment
          textStyle={status.isOverdue ? styles.whiteText : undefined}
          unit="minutes"
          number={status.distance.minutes ?? 0}
        />
        <TimeSegment
          unit="seconds"
          number={status.distance.seconds ?? 0}
          textStyle={status.isOverdue ? styles.whiteText : undefined}
        />
      </View>

      <TouchableOpacity
        onPress={scheduleNotification}
        style={styles.button}
        activeOpacity={0.8}
      >
        <Text style={styles.buttonText}>Ive done the thing!</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.colorWhite,
  },
  button: {
    backgroundColor: theme.colorBlack,
    padding: 12,
    borderRadius: 6,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  row: {
    flexDirection: "row",
    marginBottom: 24,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 24,
    color: theme.colorBlack,
  },
  containterLate: {
    backgroundColor: theme.colorRed,
  },
  whiteText: {
    color: theme.colorWhite,
  },
});

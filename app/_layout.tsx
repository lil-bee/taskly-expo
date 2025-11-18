import { AntDesign, Feather, FontAwesome5 } from "@expo/vector-icons";
import { Tabs } from "expo-router";

export default function Layout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          title: "Shopping list",
          tabBarIcon: ({ color, size }) => (
            <Feather name="list" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="counter"
        options={{
          title: "counter",
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="clock-circle" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="idea"
        options={{
          title: "my idea",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="lightbulb" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}

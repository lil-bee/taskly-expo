import { StyleSheet, Text, TextStyle, View } from "react-native";

type Props = {
  number: number;
  unit: string;
  textStyle?: TextStyle;
};

function TimeSegment({ number, unit, textStyle }: Props) {
  return (
    <View style={styles.segmentContainer}>
      <Text style={[styles.number, textStyle]}>{number}</Text>
      <Text style={textStyle}>{unit}</Text>
    </View>
  );
}
export default TimeSegment;

const styles = StyleSheet.create({
  segmentContainer: {
    justifyContent: "center",
    alignItems: "center",
    padding: 12,
    margin: 4,
    borderRadius: 6,
  },
  number: {
    fontSize: 24,
    fontWeight: "bold",
    fontVariant: ["tabular-nums"],
  },
});

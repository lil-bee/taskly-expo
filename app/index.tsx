import { useState } from "react";
import { ScrollView, StyleSheet, TextInput } from "react-native";
import ShoppingListItem from "../components/ShoppingListItem";
import { theme } from "../theme";

type ShoppingListItemType = {
  id: string;
  name: string;
};

const initialList: ShoppingListItemType[] = [
  { id: "1", name: "Coffe" },
  { id: "2", name: "Tea" },
  { id: "3", name: "Milk" },
  ...Array.from({ length: 15 }).map((_, i) => ({
    id: `test-${i + 4}`,
    name: `Dummy Item ${i + 4}`,
  })),
];

export default function App() {
  const [shoppingList, setShoppingList] = useState(initialList);
  const [value, setValue] = useState<string>();

  const handleSubmit = () => {
    if (value) {
      const newShoppingList = [
        { id: new Date().toISOString(), name: value },
        ...shoppingList,
      ];
      setShoppingList(newShoppingList);
      setValue("");
    }
  };
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      stickyHeaderIndices={[0]}
    >
      <TextInput
        style={styles.textInput}
        placeholder="E.g Coffee"
        value={value}
        onChangeText={setValue}
        onSubmitEditing={handleSubmit}
        returnKeyType="done"
      />
      {shoppingList.map((item) => (
        <ShoppingListItem name={item.name} key={item.id} />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colorWhite,
    paddingTop: 12,
  },
  contentContainer: {
    paddingBottom: 24,
  },
  textInput: {
    borderColor: theme.colorLightGrey,
    backgroundColor: theme.colorWhite,
    borderWidth: 2,
    padding: 12,
    fontSize: 18,
    marginHorizontal: 12,
    borderRadius: 50,
    marginBottom: 12,
  },
});

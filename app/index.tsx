import { useState } from "react";
import { FlatList, StyleSheet, Text, TextInput, View } from "react-native";
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
    <FlatList
      ListHeaderComponent={
        <TextInput
          style={styles.textInput}
          placeholder="E.g Coffee"
          value={value}
          onChangeText={setValue}
          onSubmitEditing={handleSubmit}
          returnKeyType="done"
        />
      }
      data={shoppingList}
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      stickyHeaderIndices={[0]}
      renderItem={({ item }) => <ShoppingListItem name={item.name} />}
      ListEmptyComponent={
        <View style={styles.listEmptyContainer}>
          <Text>Your shopping list is empty</Text>
        </View>
      }
    ></FlatList>
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
  listEmptyContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 18,
  },
});

import {
  Box,
  FlatList,
  Text,
  VStack,
  HStack,
  IconButton,
  Icon,
  Heading,
  View,
} from "native-base";
import { AntDesign } from "@expo/vector-icons";
import { ICartItem } from "../../models/model";

export interface ICartItems {
  cart: ICartItem[];
  updateCartQuantity: (id: string, quantity: number) => void;
}

export default function CartItems(props: ICartItems) {
  return (
    <FlatList
      maxHeight={"60%"}
      data={props?.cart}
      renderItem={({ item }) => (
        <HStack
          justifyContent="space-between"
          mb="2"
          space={3}
          alignItems="center"
          borderBottomWidth={1}
          borderColor="coolGray.200"
        >
          <View width={40}>
            <VStack width={"100%"}>
              <Box
                borderBottomWidth={0.5}
                borderColor="coolGray.200"
                marginTop={2}
                marginBottom={2}
                paddingBottom={2}
              >
                <Text>{item.title}</Text>
                <Text>₹ {item.price}</Text>
              </Box>

              <Heading size={8} width={"100%"}>
                ₹ {(item?.price * item?.quantity)?.toFixed(2)}
              </Heading>
            </VStack>
          </View>
          <VStack>
            <HStack alignItems="center">
              <IconButton
                icon={
                  <Icon
                    as={AntDesign}
                    name="minuscircleo"
                    color="black"
                    size={5}
                  />
                }
                onPress={() =>
                  props?.updateCartQuantity(item._id, item.quantity - 1)
                }
              />
              <Text mx="2">{item.quantity}</Text>
              <IconButton
                icon={
                  <Icon
                    as={AntDesign}
                    name="pluscircleo"
                    color="black"
                    size={5}
                  />
                }
                onPress={() =>
                  props?.updateCartQuantity(item._id, item.quantity + 1)
                }
              />
            </HStack>
          </VStack>
        </HStack>
      )}
      keyExtractor={(item) => item._id}
    />
  );
}

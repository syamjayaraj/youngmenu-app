import React, { useEffect, useState } from "react";
import { StyleSheet, View, SafeAreaView, Dimensions } from "react-native";
import {
  Box,
  Center,
  FlatList,
  Spinner,
  Text,
  VStack,
  Button,
  HStack,
  IconButton,
  Icon,
} from "native-base";
import { AntDesign } from "@expo/vector-icons";

import SearchBar from "../common/search-bar";
import CategoryList from "../common/category-list";
import { categorySize } from "../../../config";
import { loadItem, loadItemCategory } from "../../../apiService";
import { ICartItem, ICategory, IProduct } from "../../../models/model";
import ProductCard from "../product/product-card";
import ProductDetailsModal from "../product/product-modal";

export default function MenuComponent(props: any) {
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<
    number | undefined
  >();
  const [categoryLoading, setCategoryLoading] = useState<boolean>(false);
  const [initialLoading, setInitialLoading] = useState<boolean>(false);

  const [cart, setCart] = useState<ICartItem[]>([]);
  const [productDetails, setProductDetails] = useState<IProduct | null>();

  const handleSelectCategory = (categoryId: number) => {
    if (categoryId === selectedCategory) {
      setSelectedCategory(undefined);
    } else {
      setSelectedCategory(categoryId);
    }
  };

  useEffect(() => {
    loadItemCategoryFromApi();
  }, []);

  const loadItemCategoryFromApi = async () => {};

  const products: IProduct[] = [
    {
      _id: "1",
      image:
        "https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=1365&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "Veg Burger",
      price: 19.99,
    },
    {
      _id: "2",
      image:
        "https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=1365&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "Chicken Sandwitch",
      price: 29.99,
    },
    {
      _id: "3",
      image:
        "https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=1365&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "Beaf Bhiriyani",
      price: 37.99,
    },
    {
      _id: "4",
      image:
        "https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=1365&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "Chicken Bhiriyani",
      price: 77.99,
    },
    {
      _id: "5",
      image:
        "https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=1365&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "Kozhiye Nirthi Porichath - Extra cheese",
      price: 49.99,
    },
    {
      _id: "6",
      image:
        "https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=1365&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "Sample Product 6",
      price: 88.99,
    },
  ];

  const handleAddToCart = (product: IProduct) => {
    setCart((prevCart: ICartItem[]) => {
      const existingProduct = prevCart.find((item) => item._id === product._id);
      if (existingProduct) {
        return prevCart.map((item) =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  const updateCartQuantity = (productId: string, newQuantity: number) => {
    setCart((prevCart: ICartItem[]) => {
      if (newQuantity <= 0) {
        return prevCart.filter((item) => item._id !== productId);
      } else {
        return prevCart.map((item) =>
          item._id === productId ? { ...item, quantity: newQuantity } : item
        );
      }
    });
  };

  const handleProductDetailsModal = (product: IProduct | null) => {
    if (productDetails?._id) {
      setProductDetails(null);
    } else {
      setProductDetails(product);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View>
        {categoryLoading ? (
          <View
            style={{
              height: 78,
            }}
          ></View>
        ) : (
          <CategoryList
            data={categories}
            onClick={handleSelectCategory}
            selectedCategory={selectedCategory}
          />
        )}

        {productDetails?._id && (
          <ProductDetailsModal
            image={productDetails?.image}
            title={productDetails?.title}
            price={productDetails?.price}
            quantity={
              cart.find((cartItem) => cartItem._id === productDetails._id)
                ?.quantity || 0
            }
            handleAddToCart={handleAddToCart}
            closeProductDetailsModal={handleProductDetailsModal}
          />
        )}
      </View>
      <View style={styles.sectionContainer}>
        {initialLoading ? (
          <View>
            <Spinner color="#2b2b2b" style={styles.loader} />
          </View>
        ) : (
          <View
            style={{
              flexDirection: "row",
              height: Dimensions.get("window").height,
            }}
          >
            <Center flex={5} px="3">
              <FlatList
                data={products}
                renderItem={({ item }: { item: IProduct }) => (
                  <ProductCard
                    image={item.image}
                    title={item.title}
                    price={item.price}
                    quantity={
                      cart.find((cartItem) => cartItem._id === item._id)
                        ?.quantity || 0
                    }
                    handleAddToCart={() => handleAddToCart(item)}
                    showProductDetailsModal={() =>
                      handleProductDetailsModal(item)
                    }
                  />
                )}
                keyExtractor={(item) => item._id}
                numColumns={4}
                columnWrapperStyle={{ justifyContent: "flex-start" }}
              />
            </Center>
            <Box
              flex={2}
              borderLeftWidth={1}
              borderColor="coolGray.200"
              padding="4"
              backgroundColor="white"
            >
              <Text fontSize="xl" mb="4">
                Cart
              </Text>
              <FlatList
                data={cart}
                renderItem={({ item }) => (
                  <HStack
                    justifyContent="space-between"
                    mb="2"
                    alignItems="center"
                  >
                    <VStack>
                      <Text>{item.title}</Text>
                      <Text>${item.price}</Text>
                    </VStack>
                    <HStack alignItems="center">
                      <IconButton
                        icon={<Icon as={AntDesign} name="minuscircleo" />}
                        onPress={() =>
                          updateCartQuantity(item._id, item.quantity - 1)
                        }
                      />
                      <Text mx="2">{item.quantity}</Text>
                      <IconButton
                        icon={<Icon as={AntDesign} name="pluscircleo" />}
                        onPress={() =>
                          updateCartQuantity(item._id, item.quantity + 1)
                        }
                      />
                    </HStack>
                  </HStack>
                )}
                keyExtractor={(item) => item._id}
              />
              <Button colorScheme="teal" mt="4">
                Send to Kitchen
              </Button>
            </Box>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  loader: {
    marginTop: 50,
    marginBottom: 100,
  },
  sectionContainer: {
    flex: 1,
    marginTop: 20,
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 50,
  },
  menu: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 30,
    flex: 3,
    flexWrap: "wrap",
    padding: 5,
  },
  menuCard: {
    borderWidth: 1,
    borderColor: "#f5f5f5",
    width: "20%",
    height: 300,
    margin: 0,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 5,
    elevation: 0.2,
  },
  itemImage: {
    width: "100%",
    height: "80%",
  },
  menuCardText: {
    fontWeight: "normal",
    fontSize: 17,
    color: "#1f1f1f",
    textAlign: "center",
    marginTop: 10,
  },
});

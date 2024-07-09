import React, { useEffect, useState } from "react";
import { StyleSheet, SafeAreaView, Dimensions } from "react-native";
import { Box, Center, Spinner, Text, VStack, View } from "native-base";
import CategoryList from "../common/category-list";
import { ICartItem, ICategory, IProduct } from "../../models/model";
import ProductDetailsModal from "../product/product-modal";
import Total from "./total";
import SendToKitchenButton from "./send-to-kitchen-button";
import CartItems from "./cart-items";
import Products from "./products";

export default function Menu(props: any) {
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
              <Products />
            </Center>
            <Box
              flex={2}
              borderLeftWidth={1}
              borderColor="coolGray.200"
              padding="4"
              backgroundColor="white"
              justifyContent="space-between"
            >
              <VStack space="4" flex={1}>
                <Text fontSize="xl" mb="4">
                  Cart
                </Text>
                <CartItems
                  cart={cart}
                  updateCartQuantity={updateCartQuantity}
                />
                <Total />
                <SendToKitchenButton />
              </VStack>
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

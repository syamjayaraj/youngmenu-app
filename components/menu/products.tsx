import { FlatList, HStack, Heading, Text, View } from "native-base";
import ProductCard from "../product/product-card";
import { ICartItem, IProduct, IStore } from "../../models/model";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchProducts } from "../../services/api-service";
import { addToCart } from "../../actions/products";

export interface IProducts {}

export default function Products(props: IProducts) {
  const dispatch = useDispatch();
  const products: IProduct[] = useSelector(
    (store: IStore) => store.products.items
  );
  const productStatus = useSelector((store: IStore) => store.products.status);
  const error = useSelector((store: IStore) => store.products.error);

  const cart: ICartItem[] = useSelector((store: IStore) => store.cart.items);

  // console.log(products?.data, "products");

  useEffect(() => {
    if (productStatus === "idle") {
      dispatch(fetchProducts());
    }
  }, [productStatus, dispatch]);

  if (productStatus === "loading") {
    return <Text>Loading...</Text>;
  }

  if (productStatus === "failed") {
    return <Text>Error: {error}</Text>;
  }

  return (
    <FlatList
      data={products}
      renderItem={({ item }: { item: IProduct }) => (
        <ProductCard
          image={item.image}
          title={item.title}
          price={item.price}
          quantity={
            cart.find((cartItem: ICartItem) => cartItem._id === item._id)
              ?.quantity || 0
          }
          handleAddToCart={() => addToCart(item)}
          showProductDetailsModal={() => handleProductDetailsModal(item)}
        />
      )}
      keyExtractor={(item) => item._id}
      numColumns={4}
      columnWrapperStyle={{ justifyContent: "flex-start" }}
    />
  );
}

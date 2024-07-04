import React from "react";
import { Image, StyleSheet, TouchableOpacity } from "react-native";
import { Box, Heading, Text, VStack, HStack, Badge } from "native-base";
import { IProductCard } from "../../../models/model";

const ProductCard = ({
  image,
  title,
  price,
  quantity,
  handleAddToCart,
  showProductDetailsModal,
}: IProductCard) => {
  return (
    <TouchableOpacity
      onPress={handleAddToCart}
      onLongPress={showProductDetailsModal}
    >
      <Box
        borderRadius="md"
        overflow="hidden"
        borderWidth="1"
        borderColor={quantity > 0 ? "teal.500" : "coolGray.200"}
        backgroundColor="gray.50"
        margin="1"
        shadow="2"
        flex={1}
        maxWidth="90%"
        position="relative"
        width={150}
      >
        {quantity > 0 && (
          <Badge
            colorScheme="teal"
            rounded="full"
            zIndex={10}
            variant="solid"
            _text={{
              fontSize: 18,
            }}
            style={styles.badge}
          >
            {quantity}
          </Badge>
        )}
        <Image
          source={{ uri: image }}
          style={{ width: "100%", height: 150 }}
          alt={title}
        />
        <VStack space="2" padding="2">
          <Text style={styles.productTitle}>{title}</Text>
          <HStack justifyContent="space-between">
            <Text fontSize="lg" fontWeight="bold">
              ₹ {price}
            </Text>
          </HStack>
        </VStack>
      </Box>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  productTitle: {
    fontSize: 17,
  },
  badge: {
    position: "absolute",
    top: -5,
    right: -5,
    width: 40,
    height: 40,
  },
});

export default ProductCard;

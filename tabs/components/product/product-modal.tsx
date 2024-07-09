import React, { useState } from "react";
import { Image, StyleSheet, TouchableOpacity } from "react-native";
import {
  Box,
  Heading,
  Text,
  VStack,
  HStack,
  Badge,
  Center,
  Button,
  Modal,
} from "native-base";
import { IProductDetailsModal } from "../../../models/model";

const ProductDetailsModal = ({
  image,
  title,
  price,
  quantity,
  handleAddToCart,
  closeProductDetailsModal,
}: IProductDetailsModal) => {
  return (
    <Center>
      <Modal isOpen={true} onClose={closeProductDetailsModal}>
        <Modal.Content maxWidth="900px">
          <Modal.CloseButton />
          <Modal.Body>
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
              style={{ width: "100%", height: 500 }}
              alt={title}
            />
            <VStack space="2" padding="2">
              <Text style={styles.productTitle}>{title}</Text>
              <HStack justifyContent="space-between">
                <Text fontSize="xl" fontWeight="bold">
                  ₹ {price}
                </Text>
              </HStack>
            </VStack>
          </Modal.Body>
        </Modal.Content>
      </Modal>
    </Center>
  );
};

const styles = StyleSheet.create({
  productTitle: {
    fontSize: 20,
  },
  badge: {
    position: "absolute",
    top: -5,
    right: -5,
    width: 40,
    height: 40,
  },
});

export default ProductDetailsModal;

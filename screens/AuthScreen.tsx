import React, { useEffect, useState } from "react";
import { VStack, Box, Heading, Input, Button, Center, Text } from "native-base";
import { useDispatch, useSelector } from "react-redux";
import { postLogin } from "../services/api-service";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AuthScreen = ({ navigation }: any) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const { loading, error, isAuthenticated } = useSelector(
    (store: any) => store.auth
  );

  const handleLogin = async () => {
    dispatch(postLogin({ email, password }) as any);
  };
  console.log(isAuthenticated, "is");
  useEffect(() => {
    if (isAuthenticated) {
      navigation.replace("Main");
    }
  }, [isAuthenticated, navigation]);

  return (
    <Center flex={1} px="3">
      <Box safeArea p="2" py="8" w="90%" maxW="290">
        <Heading
          size="lg"
          fontWeight="600"
          color="coolGray.800"
          textAlign="center"
        >
          Login
        </Heading>
        <VStack space={3} mt="5">
          <Input
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            variant="filled"
            bg="coolGray.100"
            borderRadius="10"
            py="3"
            px="4"
            borderWidth="1"
            _input={{ bg: "coolGray.100" }}
            autoCapitalize="none"
          />
          <Input
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            variant="filled"
            bg="coolGray.100"
            borderRadius="10"
            py="3"
            px="4"
            borderWidth="1"
            _input={{ bg: "coolGray.100" }}
          />
          <Button mt="2" colorScheme="yellow" onPress={handleLogin}>
            Login
          </Button>
          {error && <Text color="red.500">{error}</Text>}
        </VStack>
      </Box>
    </Center>
  );
};

export default AuthScreen;

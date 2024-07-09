import { Text, HStack, Heading, View } from "native-base";

export default function Total(props: any) {
  return (
    <>
      <HStack
        justifyContent="space-between"
        space={3}
        alignItems="center"
        borderBottomWidth={1}
        borderColor="coolGray.200"
      >
        <View width={40}>
          <Text marginBottom={5}>Sub Total</Text>
        </View>
        <View>
          <Heading width="100%" size={10} fontSize={12}>
            ₹ 2100
          </Heading>
        </View>
      </HStack>
      <HStack
        justifyContent="space-between"
        mb="2"
        space={3}
        alignItems="center"
        borderBottomWidth={1}
        borderColor="coolGray.200"
      >
        <View width={40}>
          <Text marginBottom={5}>GST</Text>
        </View>
        <View>
          <Heading width="100%" size={10} fontSize={12}>
            ₹ 200
          </Heading>
        </View>
      </HStack>
      <HStack
        justifyContent="space-between"
        mb="2"
        space={3}
        alignItems="center"
        borderBottomWidth={1}
        borderColor="coolGray.200"
      >
        <View width={40}>
          <Text marginBottom={5}>Total</Text>
        </View>
        <View>
          <Heading width="100%" size={10} fontSize={15}>
            ₹ 2300
          </Heading>
        </View>
      </HStack>
    </>
  );
}

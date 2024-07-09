import { HStack, Button } from "native-base";

export default function SendToKitchenButton(props: any) {
  return (
    <HStack
      justifyContent="space-between"
      mb="2"
      space={1}
      alignItems="center"
      paddingTop={5}
    >
      <Button borderRadius={20} variant="outline" colorScheme="secondary">
        Cancel
      </Button>
      <Button borderRadius={20} width={170} colorScheme="teal">
        Send to Kitchen
      </Button>
    </HStack>
  );
}

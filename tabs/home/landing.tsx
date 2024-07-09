import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Dimensions,
  TouchableOpacity,
  Image,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";

import { Box, Text, ScrollView } from "native-base";
import { loadSliderHome } from "../../apiService";
import { ISliderHome } from "../../models/model";

const { width } = Dimensions.get("window");

export default function Landing(props: any) {
  const [loading, setLoading] = useState(false);
  const [tables, setTables] = useState<any>([]);

  useEffect(() => {
    // loadSliderHomeFromApi();
    setTables([
      {
        id: 1,
        name: "Table 1",
      },
      {
        id: 2,
        name: "Table 2",
      },
      {
        id: 3,
        name: "Table 3",
      },
    ]);
  }, []);

  // const loadSliderHomeFromApi = async (pageParam?: number) => {
  //   setLoading(true);
  //   const response = await loadSliderHome();
  //   if (response) {
  //     setSlider(response?.data);
  //     setLoading(false);
  //   }
  // };

  return (
    <Box bg={"white"} pt={12}>
      <SafeAreaView>
        <ScrollView contentContainerStyle={{ width: "100%" }}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>YoungMenu</Text>
          </View>

          {/* {loading && <ActivityIndicator size="large" color="#00ff00" />} */}
          {!loading && (
            <View style={styles.container}>
              <View style={styles.menu}>
                {tables?.map((table: any) => {
                  return (
                    <TouchableOpacity
                      style={styles.menuCard}
                      onPress={() =>
                        props.navigation.navigate("Menu", {
                          // type: "tables",
                        })
                      }
                    >
                      <Image
                        source={require("../../assets/icons/table.png")}
                        style={styles.icon}
                      />
                      <Text style={styles.menuCardText}>{table?.name}</Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
    </Box>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    // marginTop: 100,
    marginRight: 0,
    width: 400,
  },
  titleContainer: {
    padding: 20,
  },
  title: {
    fontWeight: "bold",
    fontSize: 25,
    color: "#2b2b2b",
    marginLeft: 10,
    paddingTop: 17,
  },
  container: {
    padding: 20,
  },
  searchInput: {
    backgroundColor: "#ffffff",
    borderRadius: 10,
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
    width: "30%",
    height: 100,
    margin: 0,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 5,
    elevation: 0.2,
  },
  iconContainer: {
    backgroundColor: "white",
    // borderRadius: "50%",
    padding: 15,
  },
  icon: {
    width: 50,
    height: 50,
  },
  menuCardText: {
    fontWeight: "normal",
    fontSize: 17,
    color: "#1f1f1f",
    textAlign: "center",
    marginTop: 10,
  },
  subTitle: {
    fontWeight: "bold",
    fontSize: 20,
    marginTop: 20,
    marginBottom: 30,
  },
  sectionContainer: {
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#f5f5f5",
    padding: 10,
  },
  sectionContent: {
    padding: 10,
  },
  sectionTitle: {
    fontWeight: "normal",
    fontSize: 17,
    marginTop: 20,
  },
});

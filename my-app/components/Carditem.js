import React, { useState } from "react";
import { Image } from "expo-image";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useEffect } from "react";
import {View, Text, Modal, TextInput, Button, TouchableOpacity} from "react-native"

export const Carditem=()=> {
  const [open, setOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [posts, setPosts] = useState([]);
  const [newText, setText] = useState("");
  const [editText, setEditText] = useState("");
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

  useEffect(() => {
    fetch("http://192.168.4.93:3000/api/get-post")
      .then((res) => res.json())
      .then((data) => {
        setPosts(data.documents);
   
      });
  }, []);
  const createPost = async () => {
    try {
      const { data } = await fetch("http://192.168.4.93:3000/api/create-post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: newText,
        }),
      });
      console.log("this is creatr thing")
    } catch (error) {
      console.error(error);
    }
  };
  // const editPost = async () => {
  //   try {
  //     const { data } = await fetch("http://192.168.4.93:3000/api/update-post", {
  //       method: "PUT",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         text: newText,
  //       }),
  //     });
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };
  const deletePost = async () => {
    try {
      // const { data } = await fetch(
      //   `http://192.168.4.93:3000/api/delete-post?id=6493cbd9b4552e3290d6b189`,
      //   {
      //     method: "DELETE",
      //     headers: {
      //       "Content-Type": "application/json",
      //     },
      //     body: JSON.stringify({
      //     }),
      //   }.then((data)=>{
      //     console.log(data)
      //   })
        
      // )
      console.log("deeeeletePost")
    } catch (error) {
      console.error(error);
    }
  };

  

  return (

      <View
        style={{
          backgroundColor: "#E4E5E7",
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
      
       {posts.map((people) => {
          return (
            <View
              style={{
                justifyContent: "center",
                flexDirection: "column",
                backgroundColor: "white",
                width: "100%",
                height: 180,
                marginBottom: 10,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  width: "100%",
                  alignItems: "center",
                  marginBottom: 20,
                }}
              >
                <Image
                  style={{
                    width: 80,
                    height: 80,
                    borderRadius: 35,
                    marginRight: 20,
                  }}
                  source={require("../assets/oldman.jpeg")}
                  contentFit="cover"
                  transition={1000}
                />
                <View>
                  <Text
                    style={{
                      justifyContent: "center",
                      alignItems: "center",
                      fontSize: 18,
                      width: 180,
                    }}
                  >
                    {people._id}
                  </Text>
                  <Text style={{ fontSize: 15 }}>6 Minutes Ago</Text>
                </View>
                <View style={{ paddingLeft: 90, position: "relative" }}>
                  <TouchableOpacity onPress={() => setMenuOpen(!menuOpen)}>
                    <Ionicons
                      name="md-ellipsis-vertical"
                      size={20}
                      color="#888"
                    />
                  </TouchableOpacity>
                  <View
                    style={{
                      display: menuOpen ? "flex" : "none",
                      position: "absolute",
                      width: 100,
                      right: 0,
                      top: 30,
                      borderWidth: 1,
                      backgroundColor: "#CCC",
                    }}
                  >
                    {/* <Text
                      style={{ padding: 10 }}
                      onPress={() => setEditModal(!editModal)}
                      title="Edit"
                    >Edit</Text> */}
                    <Text
                      style={{ padding: 10 }}
                      onPress={() => setDeleteModal(!deleteModal)}
                      title="Delete"
                    >
                      Delete
                    </Text>
                  </View>
                </View>
              </View>
              <Text
                style={{
                  justifyContent: "flex-start",
                  fontSize: 30,
                  marginBottom: 20,
                }}
              >
                {people.text}
              </Text>
            </View>
          );
        })}

        <View style={{ position: "absolute", bottom: 20, right: 20 }}>
          <View
            style={{
              width: 60,

              height: 60,

              backgroundColor: "green",

              position: "absolute",

              bottom: 20,

              right: 20,

              justifyContent: "center",

              alignItems: "center",
            }}
          >
            <Ionicons
              name="add"
              size={34}
              color="black"
              onPress={() => setModalVisible(!modalVisible)}
            />
          </View>
          <Modal transparent={true} visible={modalVisible}>
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "rgba(0,0,0,5",
              }}
            >
              <View
                style={{
                  backgroundColor: "#fff",
                  padding: 20,
                  width: "90%",
                  borderRadius: 10,
                }}
              >
                <Text>Modal</Text>
                <TextInput
                  onChangeText={(newText) => {
                    setText(newText);
                  }}
                  style={{ borderWidth: 1 }}
                />
                <Button title="Close" onPress={() => setModalVisible(false)} />
                <Button title="Submit" onPress={createPost} />
              </View>
            </View>
          </Modal>
          <Modal transparent={true} visible={editModal}>
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "rgba(0,0,0,5",
              }}
            >
              <View
                style={{
                  backgroundColor: "#fff",
                  padding: 20,
                  width: "90%",
                  borderRadius: 10,
                }}
              >
                <TextInput
                  onChangeText={(editText) => {
                    setEditText(editText);
                  }}
                  style={{ borderWidth: 1 }}
                />
                <Button title="Close" onPress={() => setEditModal(false)} />
                <Button title="Submit" />
              </View>
            </View>
          </Modal>
          <Modal transparent={true} visible={deleteModal}>
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "rgba(0,0,0,5",
              }}
            >
              <View
                style={{
                  backgroundColor: "#fff",
                  padding: 20,
                  width: "90%",
                  borderRadius: 10,
                }}
              >
                <Text>Do you want to Delete?</Text>
                <Button title="Close" onPress={() => setDeleteModal(false)} />
                <Button title="Delete" onPress={deletePost}/>
              </View>
            </View>
          </Modal>
        </View>
      </View>
 
  );
}

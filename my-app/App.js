import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { Image } from "expo-image";
import { Button } from "react-native";
import { Video } from "expo-av";
import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useEffect } from "react";

import {
  TouchableOpacity,
  Dimensions,
  ScrollView,
  TextInput,
} from "react-native";
import { Alert, Modal, StyleSheet, Text, Pressable, View } from "react-native";


export const Card=({posts, id, text, onDeleteComplete, onEditComplete})=>{

  const [open, setOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [deleteComplete, setDeleteComplete]= useState(false)
  const [editComplete, setEditComplete]= useState(false)

  const [editText, setEditText] = useState("");
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

  const getposts=()=>{
    useEffect(() => {
      fetch("http://192.168.4.144:3000/api/get-post")
        .then((res) => res.json())
        .then((data) => {
          setPosts(data.documents);
     
        });
    }, []);
  }


  
  
  const editPost = async () => {
    try {
      const { data } = await fetch(
        `http://192.168.4.144:3000/api/update-post?id=${id}`, 
        {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: editText,
        }),
      }
      );
      console.log("update post")
      onEditComplete()
    } catch (error) {
      console.error(error);
    }
  };
  const deletePost = async () => {
    try {
      const { data } = await fetch(
        `http://192.168.4.144:3000/api/delete-post?id=${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
          }),
        }
        
      )
      console.log("deeeeletePost")
      onDeleteComplete()
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
                  source={require("./assets/oldman.jpeg")}
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
                    {id}
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
                      right: 10,
                      top: 30,   
                      backgroundColor: "#E4E5E7",
                    }}
                  >
                    <Text
                      style={{ padding: 5, paddingBottom: 40 }}
                      onPress={() => setEditModal(!editModal)}
                      title="Edit"
                    >Edit</Text>
                    <Text
                      style={{ padding: 5 }}
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
                {text}
              </Text>
            </View>
      

        <View style={{ position: "absolute", bottom: 20, right: 20 }}>
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
                <Button title="Submit" onPress={editPost}/>
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







export default function App() {
  const [posts, setPosts] = useState([]);
  const [postvalue, setPostvalue]= useState(0)
  const [modalVisible, setModalVisible] = useState(false);
  const [newText, setText] = useState("");

  useEffect(()=>{
    fetchdata()
  })

  const fetchdata=()=>{
        fetch("http://192.168.4.144:3000/api/get-post")
        .then((res) => res.json())
        .then((data) => {
          setPosts(data.documents);
     
        });
      } 




  const createPost = async () => {
    try {
      const { data } = await fetch("http://192.168.4.144:3000/api/create-post", {
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


  return (
    <ScrollView style={{ height: "100%", marginTop: 60 }}>
      <View
        style={{
          backgroundColor: "#E4E5E7",
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >

   
       {posts.map((p, index) => {
          return (
       <Card
       posts={p}
       id={p._id}
       text={p.text}
       key={index}
       onDeleteComplete={()=> fetchdata()}
       onEditComplete={()=> fetchdata()}
       />
          );
        })}
        
      </View>
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
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  item: {
    padding: 30,
    fontSize: 15,
    marginTop: 5,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});

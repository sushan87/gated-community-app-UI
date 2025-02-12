import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
const ContentList = () => {
  const [contents, setContents] = useState([]);
  useEffect(() => {
    fetch('https://sushanreactnativelocal.droplocal.oupsupport.com/contents')
      .then(response => response.json())
      .then(data => setContents(data))
      .catch(error => console.error(error));
  }, []);
  return (
    <View style={styles.container}>
      <FlatList
        data={contents}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.item} onPress={() => console.log(item)}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.content}>{item.content}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center', }, item: { padding: 16, borderBottomWidth: 1, borderBottomColor: '#ccc', }, title: { fontWeight: 'bold', fontSize: 18, marginBottom: 8, }, content: { fontSize: 14, }, });
export default ContentList;
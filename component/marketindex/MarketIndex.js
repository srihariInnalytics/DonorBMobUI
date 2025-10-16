import React from 'react';
import { View, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { Card, Text } from 'react-native-paper';


const data = [
  { name: 'Nifity', currentPrice: '23456.70' },
  { name: 'BankNifity', currentPrice: '343.70' },
  { name: 'Sensex', currentPrice: '3434.70' },
  
];

const App = () => {
  return (
    <>
    <View style={styles.container}>
      <FlatList
        style={{ padding: 5, backgroundColor:'#fefbfb', borderRadius:4 }}
        data={data}
        keyExtractor={(item, index) => index.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (<>
            <TouchableOpacity>
          <Card style={styles.card}>
           <Card.Content>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemPrice}>{item.currentPrice}</Text>
            </Card.Content>
          </Card>
          </TouchableOpacity>  
          </>   
        )}
      />
    </View>
    </>);
};

const styles = StyleSheet.create({

    container:{
     padding:1
    },
  card: {
    marginRight: 10,
    borderRadius: 8,
    elevation: 5,
    width: 140,
    height: 80, 
    justifyContent: 'left',
    alignItems: 'left',
    backgroundColor:'white',
  },
  itemName: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#000', 
  },
  itemPrice: {
    fontSize: 14,
    color: '#d42a2a', 
    marginTop: 5,
    fontWeight: '690', 
  },
});

export default App;

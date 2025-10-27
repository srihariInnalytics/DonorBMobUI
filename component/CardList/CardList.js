import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { colors } from '../../component/config/config'; // your color file

const CardList = ({ data }) => {
  const renderItem = ({ item }) => {
    return (
      <View style={styles.card}>
        {Object.entries(item).map(([key, value], index) => (
          <View key={index} style={styles.row}>
            <Text style={styles.keyText}>{key} :</Text>
            <Text style={styles.valueText}>{String(value)}</Text>
          </View>
        ))}
      </View>
    );
  };

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={(_, index) => index.toString()}
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: colors.primary,
    borderRadius: 12,
    padding: 16,
    marginBottom: 14,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 3,
    elevation: 2,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  keyText: {
    color: colors.primary,
    fontWeight: '600',
    fontSize: 15,
    width: 100, // fixed width for alignment
  },
  valueText: {
    color: '#333',
    fontSize: 15,
    flex: 1,
  },
});

export default CardList;

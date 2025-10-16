import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
// import { connectToWebSocket } from '../../websocket/liveStreamData';
import { Button, Divider, TextInput } from 'react-native-paper';

const App = () => {
    const [liveData, setLiveData] = useState([
        {
          token: 44969,
          symbol: 'NIFTY06FEB2523600PE',
          name: 'NIFTY',
          expiry: '06FEB2025',
          strike: 23600.0,
          lotsize: 75,
          instrumenttype: 'OPTIDX',
          exch_seg: 'NFO',
          tick_size: 5.0,
          time_to_expiry: 0.172134,
          subscription_mode: '',       
          exchange_type: '',          
          sequence_number: '',        
          exchange_timestamp: '',     
          last_traded_price: '',     
          open_interest: ''           
        },
        {
          token: 44968,
          symbol: 'NIFTY06FEB2523600CE',
          name: 'NIFTY',
          expiry: '06FEB2025',
          strike: 23600.0,
          lotsize: 75,
          instrumenttype: 'OPTIDX',
          exch_seg: 'NFO',
          tick_size: 5.0,
          time_to_expiry: 0.172134,
          subscription_mode: '',
          exchange_type: '',
          sequence_number: '',
          exchange_timestamp: '',
          last_traded_price: '',
          open_interest: ''
        },
        {
          token: 44970,
          symbol: 'NIFTY06FEB2523650CE',
          name: 'NIFTY',
          expiry: '06FEB2025',
          strike: 23650.0,
          lotsize: 75,
          instrumenttype: 'OPTIDX',
          exch_seg: 'NFO',
          tick_size: 5.0,
          time_to_expiry: 0.172134,
          subscription_mode: '',
          exchange_type: '',
          sequence_number: '',
          exchange_timestamp: '',
          last_traded_price: '',
          open_interest: ''
        },
        {
          token: 44971,
          symbol: 'NIFTY06FEB2523650PE',
          name: 'NIFTY',
          expiry: '06FEB2025',
          strike: 23650.0,
          lotsize: 75,
          instrumenttype: 'OPTIDX',
          exch_seg: 'NFO',
          tick_size: 5.0,
          time_to_expiry: 0.172134,
          subscription_mode: '',
          exchange_type: '',
          sequence_number: '',
          exchange_timestamp: '',
          last_traded_price: '',
          open_interest: ''
        },
        {
          token: 44973,
          symbol: 'NIFTY06FEB2523700PE',
          name: 'NIFTY',
          expiry: '06FEB2025',
          strike: 23700.0,
          lotsize: 75,
          instrumenttype: 'OPTIDX',
          exch_seg: 'NFO',
          tick_size: 5.0,
          time_to_expiry: 0.172134,
          subscription_mode: '',
          exchange_type: '',
          sequence_number: '',
          exchange_timestamp: '',
          last_traded_price: '',
          open_interest: ''
        },
        {
          token: 44972,
          symbol: 'NIFTY06FEB2523700CE',
          name: 'NIFTY',
          expiry: '06FEB2025',
          strike: 23700.0,
          lotsize: 75,
          instrumenttype: 'OPTIDX',
          exch_seg: 'NFO',
          tick_size: 5.0,
          time_to_expiry: 0.172134,
          subscription_mode: '',
          exchange_type: '',
          sequence_number: '',
          exchange_timestamp: '',
          last_traded_price: '',
          open_interest: ''
        },
        {
          token: 44974,
          symbol: 'NIFTY06FEB2523750CE',
          name: 'NIFTY',
          expiry: '06FEB2025',
          strike: 23750.0,
          lotsize: 75,
          instrumenttype: 'OPTIDX',
          exch_seg: 'NFO',
          tick_size: 5.0,
          time_to_expiry: 0.172134,
          subscription_mode: '',
          exchange_type: '',
          sequence_number: '',
          exchange_timestamp: '',
          last_traded_price: '',
          open_interest: ''
        },
        {
          token: 44975,
          symbol: 'NIFTY06FEB2523750PE',
          name: 'NIFTY',
          expiry: '06FEB2025',
          strike: 23750.0,
          lotsize: 75,
          instrumenttype: 'OPTIDX',
          exch_seg: 'NFO',
          tick_size: 5.0,
          time_to_expiry: 0.172134,
          subscription_mode: '',
          exchange_type: '',
          sequence_number: '',
          exchange_timestamp: '',
          last_traded_price: '',
          open_interest: ''
        },
        {
          token: 44979,
          symbol: 'NIFTY06FEB2523800PE',
          name: 'NIFTY',
          expiry: '06FEB2025',
          strike: 23800.0,
          lotsize: 75,
          instrumenttype: 'OPTIDX',
          exch_seg: 'NFO',
          tick_size: 5.0,
          time_to_expiry: 0.172134,
          subscription_mode: '',
          exchange_type: '',
          sequence_number: '',
          exchange_timestamp: '',
          last_traded_price: '',
          open_interest: ''
        },
        {
          token: 44976,
          symbol: 'NIFTY06FEB2523800CE',
          name: 'NIFTY',
          expiry: '06FEB2025',
          strike: 23800.0,
          lotsize: 75,
          instrumenttype: 'OPTIDX',
          exch_seg: 'NFO',
          tick_size: 5.0,
          time_to_expiry: 0.172134,
          subscription_mode: '',
          exchange_type: '',
          sequence_number: '',
          exchange_timestamp: '',
          last_traded_price: '',
          open_interest: ''
        },
        {
          token: 44981,
          symbol: 'NIFTY06FEB2523850PE',
          name: 'NIFTY',
          expiry: '06FEB2025',
          strike: 23850.0,
          lotsize: 75,
          instrumenttype: 'OPTIDX',
          exch_seg: 'NFO',
          tick_size: 5.0,
          time_to_expiry: 0.172134,
          subscription_mode: '',
          exchange_type: '',
          sequence_number: '',
          exchange_timestamp: '',
          last_traded_price: '',
          open_interest: ''
        },
        {
          token: 44980,
          symbol: 'NIFTY06FEB2523850CE',
          name: 'NIFTY',
          expiry: '06FEB2025',
          strike: 23850.0,
          lotsize: 75,
          instrumenttype: 'OPTIDX',
          exch_seg: 'NFO',
          tick_size: 5.0,
          time_to_expiry: 0.172134,
          subscription_mode: '',
          exchange_type: '',
          sequence_number: '',
          exchange_timestamp: '',
          last_traded_price: '',
          open_interest: ''
        }
      ]);
    
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredUserList, setFilteredUserList] = useState(liveData);

    // useEffect(() => {
    //     connectToWebSocket(setLiveData);
    // }, []);

    const handleSearch = (query) => {
        //.log(query, "---ccc")
        setSearchQuery(query);
        if (query.trim() === '') {
            setFilteredUserList(liveData); 
        } else {
            const filteredList = liveData.filter(item =>
                String(item.symbol).toLowerCase().includes(String(query).toLowerCase())
            );
            setFilteredUserList(filteredList);
        }
    };

    const renderItem = ({ item }) => (
        <View style={styles.dataContainer}>
            <View style={styles.row}>
                <Text style={styles.symbolText}>{item.symbol}</Text>
                <Text style={styles.tokenText}>{item.token}</Text>
            </View>
            <View style={styles.row}>
                <Text style={styles.dataText}>Strike Price: {item.strike}</Text>
                <Text style={styles.dataText}>LTP: {item.last_traded_price}</Text>
            </View>
            <View style={styles.row}>
                <Button mode="contained" style={{ backgroundColor: '#2b5e73' }}>
                    BUY
                </Button>
                <Button mode="contained" style={{ backgroundColor: '#912b30' }}>
                    SELL
                </Button>
            </View>
            <Divider style={{ marginTop: 20 }} />
        </View>
    );

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.searchInput}
                placeholder="Search by Symbol..."
                value={searchQuery}
                onChangeText={handleSearch}
                theme={{
                    colors: {
                        primary: '#2b5e73',
                        error: '#912b30',
                    },
                }}
            />
            <FlatList
                data={filteredUserList} // Use filtered list here
                keyExtractor={(item) => item.token.toString()}
                renderItem={renderItem}
                contentContainerStyle={styles.scrollContainer}
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fefbfb',
        paddingTop: 10,
        paddingBottom: 10,
    },
    searchInput: {
        marginBottom: 10,
        width: '100%',
        height: 45,
        backgroundColor: '#f0f0f0',
    },
    dataContainer: {
        padding: 10,
        backgroundColor: '#fff',
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        marginBottom: 10,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    tokenText: {
        fontSize: 12,
        color: '#333',
        fontWeight: 'bold',
    },
    symbolText: {
        fontSize: 13,
        color: '#333',
    },
    dataText: {
        fontSize: 13,
        color: '#333',
        marginVertical: 4,
    },
    scrollContainer: {
        paddingHorizontal: 10,
    },
});

export default App;

import React, { useState } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    LayoutAnimation,
} from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function Dashboard() {
    const [openIndex, setOpenIndex] = useState(null);
    const navigation = useNavigation();

    const toggle = (index) => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setOpenIndex(openIndex === index ? null : index);
    };

    const onChildPress = (child) => {
        console.log( child.navigate);
        navigation.navigate(String(child.navigate))
    };

    const menuData = [
        {
            name: "Sales",
            color: "#6A5ACD", // Soft Indigo
            icon: <MaterialIcons name="point-of-sale" size={26} color="#6A5ACD" />,
            children: [
                {
                    name: "Packing",
                    icon: <MaterialIcons name="inventory" size={24} color="#6A5ACD" />,
                    navigate: "PackingList",
                },
            ],
        },

        {
            name: "Inventory",
            color: "#FF7043", // Deep Orange
            icon: <MaterialIcons name="warehouse" size={26} color="#FF7043" />,
            children: [
                {
                    name: "Fibre Stock Transfer",
                    icon: <MaterialIcons name="move-to-inbox" size={24} color="#FF7043" />,
                    navigate: "FibreStockTransferScreen",
                },
                {
                    name: "Yarn Stock Transfer",
                    icon: <MaterialIcons name="swap-horiz" size={24} color="#FF7043" />,
                    navigate: "YarnStockTransferScreen",
                },
            ],
        },

        {
            name: "Purchase",
            color: "#009688", // Teal
            icon: <MaterialIcons name="shopping-cart" size={26} color="#009688" />,
            children: [
                {
                    name: "Inward Inspection",
                    icon: (
                        <MaterialIcons name="assignment-turned-in" size={24} color="#009688" />
                    ),
                    navigate: "InwardInspectionScreen",
                },
                {
                    name: "Material Issue",
                    icon: <MaterialIcons name="outbox" size={24} color="#009688" />,
                    navigate: "MaterialIssueScreen",
                },
                {
                    name: "Material Consumption",
                    icon: <MaterialIcons name="receipt-long" size={24} color="#009688" />,
                    navigate: "MaterialConsumptionScreen",
                },
                {
                    name: "Material Return",
                    icon: <MaterialIcons name="assignment-return" size={24} color="#009688" />,
                    navigate: "MaterialReturnScreen",
                },
            ],
        },

        {
            name: "Fibre Packing",
            color: "#42A5F5", // Blue
            icon: <MaterialIcons name="inventory-2" size={26} color="#42A5F5" />,
            children: [
                {
                    name: "Fibre Packing List",
                    icon: <MaterialIcons name="list-alt" size={24} color="#42A5F5" />,
                    navigate: "FibrePackingListScreen",
                },
            ],
        },
    ];


    return (
        <View style={{ padding: 20 }}>

            <View style={styles.container}>
                {menuData.map((parent, index) => (
                    <View key={index}>
                        {/* Parent Section */}
                        <TouchableOpacity
                            style={[styles.parentRow, { borderLeftColor: parent.color }]}
                            onPress={() => toggle(index)}
                        >
                            <View>
                                <Text style={styles.parentText}>{parent.name}</Text>
                            </View>

                            <Ionicons
                                name={openIndex === index ? "chevron-up" : "chevron-down"}
                                size={26}
                                color={parent.color}
                            />
                        </TouchableOpacity>

                        {/* Children */}
                        {openIndex === index && (
                            <View style={styles.childContainer}>
                                {parent.children.map((child, idx) => (
                                    <TouchableOpacity
                                        key={idx}
                                        style={[styles.childCard, { borderLeftColor: parent.color }]}
                                        onPress={() => onChildPress(child)}
                                    >
                                        <View style={styles.iconBox}>{child.icon}</View>

                                        <View style={{ flex: 1 }}>
                                            <Text style={styles.childName}>{child.name}</Text>

                                        </View>

                                        <Ionicons
                                            name="arrow-forward-circle"
                                            size={26}
                                            color={parent.color}
                                        />
                                    </TouchableOpacity>
                                ))}
                            </View>
                        )}
                    </View>
                ))}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    title: {
        fontSize: 28,
        fontWeight: "bold",
        marginBottom: 18,
        color: "#333",
    },

    container: {
        marginTop: 10,
    },

    parentRow: {
        padding: 18,
        borderRadius: 14,
        marginBottom: 10,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#ffffff",
        borderLeftWidth: 6,
    },

    parentText: {
        fontSize: 18,
        fontWeight: "700",
        color: "#222",
    },

    subtitle: {
        fontSize: 12,
        color: "#777",
        marginTop: 3,
    },

    childContainer: {
        marginBottom: 15,
        marginTop: 5,
        paddingLeft: 5,
    },

    childCard: {
        backgroundColor: "#ffffff",
        padding: 18,
        borderRadius: 14,
        marginBottom: 12,
        flexDirection: "row",
        alignItems: "center",

        borderLeftWidth: 6,

        elevation: 4,
        shadowColor: "#000",
        shadowOpacity: 0.12,
        shadowRadius: 6,
        shadowOffset: { width: 0, height: 3 },
    },

    iconBox: {
        marginRight: 12,
        backgroundColor: "rgba(0,0,0,0.05)",
        padding: 10,
        borderRadius: 10,
    },

    childName: {
        fontSize: 16,
        fontWeight: "600",
        color: "#333",
    },

    routeName: {
        fontSize: 12,
        color: "#888",
        marginTop: 3,
    },
});

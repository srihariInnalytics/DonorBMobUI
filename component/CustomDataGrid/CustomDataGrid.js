import React, { useState } from "react";
import { View, StyleSheet, ScrollView, TextInput } from "react-native";
import { DataTable } from "react-native-paper";
import { colors } from "../../component/config/config";

const CustomDataTable = ({ columns = [], rows = [] }) => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [search, setSearch] = useState("");

    // 🔍 Search filter
    const filteredRows = rows.filter((row) =>
        columns.some((col) =>
            String(row[col.field] || "")
                .toLowerCase()
                .includes(search.toLowerCase())
        )
    );

    const numberOfPages = Math.ceil(filteredRows.length / rowsPerPage);

    const paginatedRows = filteredRows.slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
    );

    return (
        <View style={styles.container}>

            {/* 🔍 Search */}
            <TextInput
                style={styles.searchBox}
                placeholder="Search..."
                placeholderTextColor="#777"
                value={search}
                onChangeText={(text) => {
                    setSearch(text);
                    setPage(0);
                }}
            />

            {/* 🔥 Horizontal Scroll Wrapper */}
            <ScrollView horizontal={true}>

                {/* 🔥 Vertical Scroll inside */}
                <ScrollView style={{ maxHeight: "75%" }}>
                    <DataTable>

                        {/* Header */}
                        <DataTable.Header style={styles.headerRow}>
                            {columns.map((col, idx) => (
                                <DataTable.Title
                                    key={idx}
                                    style={{ flex: col.flex || 1, minWidth: 120 }}
                                    textStyle={styles.headerText}
                                >
                                    {col.headerName}
                                </DataTable.Title>
                            ))}
                        </DataTable.Header>

                        {/* Rows */}
                        {paginatedRows.map((row, rIdx) => (
                            <DataTable.Row key={rIdx}>
                                {columns.map((col, cIdx) => (
                                    <DataTable.Cell
                                        key={cIdx}
                                        style={{ flex: col.flex || 1, minWidth: 120 }}
                                    >
                                        {row[col.field] ?? ""}
                                    </DataTable.Cell>
                                ))}
                            </DataTable.Row>
                        ))}

                    </DataTable>
                </ScrollView>

            </ScrollView>

            {/* 🔥 Fixed Bottom Pagination */}
            <View style={styles.paginationContainer}>
                <DataTable.Pagination
                    page={page}
                    numberOfPages={numberOfPages}
                    onPageChange={(newPage) => setPage(newPage)}
                    label={`${page * rowsPerPage + 1}-${Math.min(
                        (page + 1) * rowsPerPage,
                        filteredRows.length
                    )} of ${filteredRows.length}`}
                    numberOfItemsPerPage={rowsPerPage}
                    onItemsPerPageChange={setRowsPerPage}
                    showFastPagination
                    numberOfItemsPerPageList={[10, 25, 50]}
                    selectPageDropdownLabel={"Rows"}
                />
            </View>

        </View>
    );
};

export default CustomDataTable;

const styles = StyleSheet.create({
    container: {
        marginTop: 10,
        paddingHorizontal: 1,
        paddingBottom: 0,
    },

    searchBox: {
        borderWidth: 1,
        borderColor: "#ccc",
        padding: 10,
        borderRadius: 8,
        marginBottom: 10,
        color: "black",
    },

    headerRow: {
        backgroundColor: colors.primary,
    },

    headerText: {
        color: "white",
        fontWeight: "bold",
        fontSize: 14,
    },

    paginationContainer: {
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 0,
        position: "absolute",
        bottom: 0,
        backgroundColor: "white",
    },
});

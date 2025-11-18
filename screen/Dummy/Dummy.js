import React from 'react'
import { View, Text } from 'react-native'
import CustomDataGrid from '../../component/CustomDataGrid/CustomDataGrid'

export default function Dummy() {
    const MainData = [
    {
        DocumentNo: "DOC-001",
        VendorName: "Sri Textiles",
        Status: "Completed"
    },
    {
        DocumentNo: "DOC-002",
        VendorName: "Vel Weaving Mills",
        Status: "Pending"
    },
    {
        DocumentNo: "DOC-003",
        VendorName: "Anand Fabrics",
        Status: "Approved"
    },
    {
        DocumentNo: "DOC-004",
        VendorName: "Shree Looms",
        Status: "Rejected"
    },
    {
        DocumentNo: "DOC-005",
        VendorName: "Classic Threads",
        Status: "In Progress"
    },
     {
        DocumentNo: "DOC-001",
        VendorName: "Sri Textiles",
        Status: "Completed"
    },
    {
        DocumentNo: "DOC-002",
        VendorName: "Vel Weaving Mills",
        Status: "Pending"
    },
    {
        DocumentNo: "DOC-003",
        VendorName: "Anand Fabrics",
        Status: "Approved"
    },
    {
        DocumentNo: "DOC-004",
        VendorName: "Shree Looms",
        Status: "Rejected"
    },
    {
        DocumentNo: "DOC-005",
        VendorName: "Classic Threads",
        Status: "In Progress"
    },
     {
        DocumentNo: "DOC-001",
        VendorName: "Sri Textiles",
        Status: "Completed"
    },
    {
        DocumentNo: "DOC-002",
        VendorName: "Vel Weaving Mills",
        Status: "Pending"
    },
    {
        DocumentNo: "DOC-003",
        VendorName: "Anand Fabrics",
        Status: "Approved"
    },
    {
        DocumentNo: "DOC-004",
        VendorName: "Shree Looms",
        Status: "Rejected"
    },
    {
        DocumentNo: "DOC-005",
        VendorName: "Classic Threads",
        Status: "In Progress"
    },
     {
        DocumentNo: "DOC-001",
        VendorName: "Sri Textiles",
        Status: "Completed"
    },
    {
        DocumentNo: "DOC-002",
        VendorName: "Vel Weaving Mills",
        Status: "Pending"
    },
    {
        DocumentNo: "DOC-003",
        VendorName: "Anand Fabrics",
        Status: "Approved"
    },
    {
        DocumentNo: "DOC-004",
        VendorName: "Shree Looms",
        Status: "Rejected"
    },
    {
        DocumentNo: "DOC-005",
        VendorName: "Classic Threads",
        Status: "In Progress"
    }, {
        DocumentNo: "DOC-001",
        VendorName: "Sri Textiles",
        Status: "Completed"
    },
    {
        DocumentNo: "DOC-002",
        VendorName: "Vel Weaving Mills",
        Status: "Pending"
    },
    {
        DocumentNo: "DOC-003",
        VendorName: "Anand Fabrics",
        Status: "Approved"
    },
    {
        DocumentNo: "DOC-004",
        VendorName: "Shree Looms",
        Status: "Rejected"
    },
    {
        DocumentNo: "DOC-005",
        VendorName: "Classic Threads",
        Status: "In Progress"
    }
];

    return (
        <View>
            <CustomDataGrid
                columns={[
                    { field: "DocumentNo", headerName: "Document No", flex: 1 },
                    { field: "VendorName", headerName: "Vendor", flex: 1 },
                    { field: "Status", headerName: "Status", flex: 1 },
                      { field: "DocumentNo", headerName: "Document No", flex: 1 },
                    { field: "VendorName", headerName: "Vendor", flex: 1 },
                    // { field: "Statssus", headerName: "Status", flex: 1 },
                ]}
                rows={MainData}
            />

        </View>
    )
}

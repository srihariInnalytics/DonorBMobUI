import React from 'react'
import { View, Text } from 'react-native'
import CustomDataGrid from '../../component/CustomDataGrid/CustomDataGrid'

export default function Dummy() {
    const MainData = []

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

import React from 'react'
import { View, Text } from 'react-native'
import { SafeAreaView, Alert } from 'react-native';
//components
import BloodRequestList from '../../component/BloodRequestList/BloodRequestList'

export default function BloodRequests() {

    const sampleData = [
  {
    bloodType: 'A+',
    city: 'Chennai',
    hospital: 'Apollo Hospitals',
    urgency: 'High',
    unitsNeeded: 3,
    postedOn: '2 hrs ago',
  },
  {
    bloodType: 'B-',
    city: 'Coimbatore',
    hospital: 'KMCH Medical Center',
    urgency: 'Medium',
    unitsNeeded: 2,
    postedOn: '5 hrs ago',
  },
  {
    bloodType: 'O+',
    city: 'Madurai',
    hospital: 'Velammal Hospital',
    urgency: 'Low',
    unitsNeeded: 1,
    postedOn: 'Yesterday',
  },
  {
    bloodType: 'AB+',
    city: 'Tiruchirappalli',
    hospital: 'GH Trichy',
    urgency: 'High',
    unitsNeeded: 4,
    postedOn: '1 hr ago',
  },
];


    return (
        <View>
            <BloodRequestList data={sampleData} onViewPress={() => console.log("view clicked")} />
        </View>
    )
}

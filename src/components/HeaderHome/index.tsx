import React, { useState } from 'react';
import { Picker } from '@react-native-picker/picker';

import MenuIcon from "../../../assets/images/menu.svg";
import NotificationIcon from "../../../assets/images/notificationIcon.svg";

import styles from './styles';
import { ScrollView, TouchableOpacity, View } from 'react-native';
import Colors from '../../constants/Colors';
import { Chip, SearchBar } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';

export default function HeaderHome({ navigation }: any) {
    const [city, setCity] = useState("current")

    const [search, setSearch] = useState("")

    const chipColors = [
        "#F59762",
        "#F0635A",
        "#29D697",
        "#46CDFB"
    ]

    return (
        <View style={styles.root}>
            <View style={styles.topContent}>
                <MenuIcon onPress={()=>navigation.openDrawer()} width={50} height={20} />
                <Picker
                    mode='dialog'
                    style={{ width: 150, marginTop: -20, color: Colors.light.background }}
                    dropdownIconColor="white"
                    selectedValue={city} onValueChange={(e) => setCity(e)}>
                    <Picker.Item label="Quibdó" value="current" />
                    <Picker.Item label="Barranquilla" value="barranquilla" />
                    <Picker.Item label="Medellín" value="medellin" />
                    <Picker.Item label="Bógota" value="bogota" />
                    <Picker.Item label="Cartagena" value="cartagena" />
                </Picker>
                <NotificationIcon width={50} height={20} />
            </View>
            <View>
                <SearchBar style={{ borderColor: "transparent", color: "#ffffff", }} containerStyle={{ backgroundColor: "transparent", borderTopWidth: 0,borderBottomWidth: 0,  }} inputContainerStyle={{ backgroundColor: "transparent" }} value={search} onChangeText={(e) => setSearch(e)} lightTheme placeholder='Buscar...' />
            </View>
            <ScrollView showsHorizontalScrollIndicator={false} horizontal  style={styles.wrapperCategories}>
                <Chip  buttonStyle={{backgroundColor: chipColors[Math.floor(Math.random() * (3 - 0)) + 0]}}  title="Cultura"  TouchableComponent={TouchableOpacity } containerStyle={styles.chipContainer} />
                <Chip buttonStyle={{backgroundColor: chipColors[Math.floor(Math.random() * (3 - 0)) + 0]}} title="Deporte" TouchableComponent={TouchableOpacity} containerStyle={styles.chipContainer}  />
                <Chip buttonStyle={{backgroundColor: chipColors[Math.floor(Math.random() * (3 - 0)) + 0]}} title="Música"  TouchableComponent={TouchableOpacity} containerStyle={styles.chipContainer} />
                <Chip buttonStyle={{backgroundColor: chipColors[Math.floor(Math.random() * (3 - 0)) + 0]}} title="Comida" TouchableComponent={TouchableOpacity} containerStyle={styles.chipContainer} />
                <Chip buttonStyle={{backgroundColor: chipColors[Math.floor(Math.random() * (3 - 0)) + 0]}} title="Salud"  TouchableComponent={TouchableOpacity} containerStyle={styles.chipContainer} />
            </ScrollView>
        </View>
    );
}

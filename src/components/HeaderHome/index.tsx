import React, { useState } from 'react';
import { Picker } from '@react-native-picker/picker';

import MenuIcon from "../../../assets/images/menu.svg";
import NotificationIcon from "../../../assets/images/notificationIcon.svg";

import styles from './styles';
import { ScrollView, TouchableOpacity, View } from 'react-native';
import Colors from '../../constants/Colors';
import { Chip, Icon, SearchBar } from 'react-native-elements';


const chipColors = [
    "#F59762",
    "#F0635A",
    "#29D697",
    "#46CDFB",
    Colors.darkBlueText
]

export default function HeaderHome({ navigation,handleSearch, clickRightIcon = () => null }: any) {
    const [city, setCity] = useState("current")

    const [search, setSearch] = useState("")

    const onSearch = (text:string) => {
        setSearch(text);
        handleSearch && handleSearch(text);
    }


    return (
        <View style={styles.root}>
            <View style={styles.topContent}>
                <MenuIcon onPress={()=>navigation.openDrawer()} width={50} height={20} />
                <Picker
                    mode='dialog'
                    style={{ width: 150, marginTop: -20, color: Colors.light.background }}
                    dropdownIconColor="white"
                    selectedValue={city} 
                    onValueChange={(e) => setCity(e)}>
                    <Picker.Item label="Quibdó" value="current" />
                    <Picker.Item label="Barranquilla" value="barranquilla" />
                    <Picker.Item label="Medellín" value="medellin" />
                    <Picker.Item label="Bógota" value="bogota" />
                    <Picker.Item label="Cartagena" value="cartagena" />
                </Picker>
                <Icon onPress={clickRightIcon} type='material-community' name='barcode-scan' size={25}  color="white"/>
            </View>
            <View>
                <SearchBar style={{ borderColor: "transparent", color: "#ffffff", }} containerStyle={{ backgroundColor: "transparent", borderTopWidth: 0,borderBottomWidth: 0,  }} inputContainerStyle={{ backgroundColor: "transparent" }} value={search} onChangeText={onSearch} lightTheme placeholder='Buscar...' />
            </View>
            { <ScrollView showsHorizontalScrollIndicator={false} horizontal  style={styles.wrapperCategories}>
                <Chip  buttonStyle={{backgroundColor: chipColors[Math.floor(Math.random() * (4 - 0)) + 0]}}  title="Cultura"  TouchableComponent={TouchableOpacity } containerStyle={styles.chipContainer} />
                <Chip buttonStyle={{backgroundColor: chipColors[Math.floor(Math.random() * (4 - 0)) + 0]}} title="Deporte" TouchableComponent={TouchableOpacity} containerStyle={styles.chipContainer}  />
                <Chip buttonStyle={{backgroundColor: chipColors[Math.floor(Math.random() * (4 - 0)) + 0]}} title="Música"  TouchableComponent={TouchableOpacity} containerStyle={styles.chipContainer} />
                <Chip buttonStyle={{backgroundColor: chipColors[Math.floor(Math.random() * (4 - 0)) + 0]}} title="Comida" TouchableComponent={TouchableOpacity} containerStyle={styles.chipContainer} />
                <Chip buttonStyle={{backgroundColor: chipColors[Math.floor(Math.random() * (4 - 0)) + 0]}} title="Salud"  TouchableComponent={TouchableOpacity} containerStyle={styles.chipContainer} />
            </ScrollView> }
        </View>
    );
}

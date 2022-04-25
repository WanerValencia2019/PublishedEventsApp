import { View, Text, StyleSheet, Dimensions, ScrollView } from 'react-native'
import React from 'react'
import InputScrollView from 'react-native-input-scroll-view';
import { Input } from 'react-native-elements';
import MultiSelect from 'react-native-multiple-select';
import { fonts } from '../../constants/Texts';
import Colors from '../../constants/Colors';

const { width } = Dimensions.get("screen");

const InfoStep = () => {
    const [selectedItems, setSelectedItems] = React.useState([]);
    const items = [{
        id: '92iijs7yta',
        name: 'Ondo'
    }, {
        id: 'a0s0a8ssbsd',
        name: 'Ogun'
    }, {
        id: '16hbajsabsd',
        name: 'Calabar'
    }, {
        id: 'nahs75a5sg',
        name: 'Lagos'
    }, {
        id: '667atsas',
        name: 'Maiduguri'
    }, {
        id: 'hsyasajs',
        name: 'Anambra'
    }, {
        id: 'djsjudksjd',
        name: 'Benue'
    }, {
        id: 'sdhyaysdj',
        name: 'Kaduna'
    }, {
        id: 'suudydjsjd',
        name: 'Abuja'
    }
    ];
    const onSelectedItemsChange = (selectedItems: any) => {
        setSelectedItems(selectedItems);
    };
    return (
        <View style={styles.root}>
            <InputScrollView >
                <Input placeholder='Titulo' />
                <Input placeholder='Descripción' maxLength={400} numberOfLines={7} multiline />
                <Input placeholder='Cantidad de entradas' />
                <View>
                    <MultiSelect
                        items={items}
                        uniqueKey="id"
                        onSelectedItemsChange={onSelectedItemsChange}
                        selectedItems={selectedItems}
                        selectText="Categorías"
                        searchInputPlaceholderText="Buscar..."
                        onChangeInput={(text) => console.log(text)}
                        altFontFamily={fonts.Roboto_500Medium}
                        tagRemoveIconColor="#CCC"
                        tagBorderColor={Colors.darkBlue}
                        tagTextColor={Colors.darkBlueText}
                        selectedItemTextColor="#CCC"
                        selectedItemIconColor="#CCC"
                        itemTextColor="#000"
                        displayKey="name"
                        searchInputStyle={{ color: '#CCC' }}
                        submitButtonColor={Colors.blue}
                        submitButtonText="Guardar"

                        styleInputGroup={{
                            paddingLeft: width * 0.03,
                            paddingRight: width * 0.03,
                        }}
                        styleMainWrapper={{
                            paddingLeft: width * 0.03,
                            paddingRight: width * 0.03,
                        }}
                        
                    />
                </View>
            </InputScrollView>
        </View>
    )
}

const { height } = Dimensions.get("screen");

const styles = StyleSheet.create({
    root: {
        marginTop: height * 0.05,
        marginBottom: height * 0.12,
    }
})

export default InfoStep;
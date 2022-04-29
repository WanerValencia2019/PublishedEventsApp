import { View, Text, StyleSheet, Dimensions, ScrollView } from 'react-native'
import React, { useEffect } from 'react'
import InputScrollView from 'react-native-input-scroll-view';
import { FAB, Icon, Input } from 'react-native-elements';
import MultiSelect from 'react-native-multiple-select';
import { fonts } from '../../constants/Texts';
import Colors from '../../constants/Colors';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { getCategories, newEventInfoUpdate } from '../../redux/events/actions';
import { Controller, useForm } from 'react-hook-form';
import { showToast } from '../../redux/toast/actions';

const { width } = Dimensions.get("screen");


interface InfoStepTypes {
    title: string,
    description: string,
    space_availables: any,
}

const InfoStep = ({ handleBack, handleNext }: any) => {
    const { handleSubmit, register, formState: { errors }, control, setValue } = useForm<InfoStepTypes>();
    const [selectedItems, setSelectedItems] = React.useState([]);
    const dispatch = useAppDispatch();
    const { categories, newEvent } = useAppSelector(state => state.events)

    useEffect(() => {
        dispatch(getCategories())
    }, [])

    useEffect(() => {
        console.log(newEvent.info);

        if (newEvent.info.title) {
            setValue('title', newEvent.info.title)
        }
        if (newEvent.info.description) {
            setValue('description', newEvent.info.description)
        }
        if (newEvent.info.space_availables) {
            setValue('space_availables', String(newEvent.info.space_availables))
        }
    }, [newEvent.info])

    const onSelectedItemsChange = (selectedItems: any) => {
        setSelectedItems(selectedItems);
    };

    const onSubmit = (data: InfoStepTypes) => {
        const categories = selectedItems;
        if(categories.length === 0) {
            dispatch(showToast({message: "Debes seleccionar al menos una categoria", type: "error"}))
            return ;
        }
        dispatch(newEventInfoUpdate({
            title: data.title,
            description: data.description,
            space_availables: Number(data.space_availables),
            categories,
        }))
        handleNext();
    }

    return (
        <View style={styles.root}>
            <InputScrollView style={{ marginBottom: 65 }}>
                <Controller
                    control={control}
                    {...register("title", {
                        required: {
                            value: true,
                            message: "Este campo es requerido"
                        }
                    })}
                    name='title'
                    render={({ field }) => (
                        <Input
                            {...field}
                            onChangeText={(text) => setValue("title", text)}
                            errorMessage={errors.title?.message}
                            placeholder='Titulo' />
                    )}
                />
                <Controller
                    control={control}
                    {...register("description", {
                        required: {
                            value: true,
                            message: "Este campo es requerido"
                        }
                    })}
                    name='description'
                    render={({ field }) => (
                        <Input
                            {...field}
                            onChangeText={(text) => setValue("description", text)}
                            errorMessage={errors.description?.message}
                            placeholder='Descripción'
                            maxLength={400}
                            numberOfLines={6} multiline
                        />
                    )}
                />
                <Controller
                    control={control}
                    {...register("space_availables", {
                        required: {
                            value: true,
                            message: "Este campo es requerido"
                        },
                        pattern: {
                            value: /^[0-9]+$/,
                            message: "Este campo solo acepta numeros"
                        }
                    })}
                    name='space_availables'
                    render={({ field }) => (
                        <Input
                            {...field}
                            onChangeText={(text) => setValue("space_availables", text)}
                            errorMessage={errors.space_availables?.message}
                            placeholder='Cantidad de entradas'
                        />
                    )}
                />
                <View>
                    <MultiSelect
                        items={categories.map(category => ({ id: category.id, name: category.name }))}
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
            <View style={{ position: "absolute", left: 0, bottom: 10 }}>
                <FAB onPress={handleBack} disabled={true} iconPosition='left' icon={<Icon type='material-community' name='arrow-left' color={Colors.light.background} />} title="Anterior" color={Colors.orange} />
            </View>
            <View style={{ position: "absolute", right: 0, bottom: 10 }}>
                <FAB onPress={handleSubmit(onSubmit)} disabled={false} title="Siguiente" color={Colors.blue} iconPosition='right' icon={<Icon type='material-community' name='arrow-right' color={Colors.light.background} />} />
            </View>
        </View>
    )
}

const { height } = Dimensions.get("screen");

const styles = StyleSheet.create({
    root: {
        marginTop: height * 0.05,
        marginBottom: height * 0.05,
    }
})

export default InfoStep;
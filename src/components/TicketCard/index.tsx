import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { Card } from 'react-native-elements'

import styles from "./styles";
import { formatValue } from '../../utils';

interface TicketCardProps {
    name: string,
    description: string,
    price: number,
    isFree?: boolean,
    onClick: Function,
    tickets_available?: any,
}

const TicketCard: React.FC<TicketCardProps> = ({ description = "", isFree = false, name = "", price = 0, tickets_available = null, onClick = () => null }) => {
    
    return (
        <TouchableOpacity onPress={() => onClick()}>
            <Card containerStyle={styles.cardContainer}>
                <Text style={styles.name}>{name}</Text>
                <Text style={styles.description}>{description}</Text>
                <View style={{display:"flex",flexDirection:"row", justifyContent: "space-between" }}>
                    <Text style={isFree ? styles.freePrice : styles.price}>{isFree ? "GRATIS" : formatValue(price)}</Text>
                    {tickets_available != null  && <Text style={styles.tickets_available}>
                        {
                            tickets_available === 0 ? "No hay entradas disponibles": tickets_available === 1 ? `${tickets_available} entrada disponible` : `${tickets_available} entradas disponibles`
                        }
                    </Text>}
                </View>
            </Card>
        </TouchableOpacity>
    )
}

export default TicketCard
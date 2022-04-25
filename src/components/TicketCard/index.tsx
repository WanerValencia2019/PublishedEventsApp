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
}

const TicketCard: React.FC<TicketCardProps> = ({ description, isFree = false, name, price = 0 }) => {
    return (
        <TouchableOpacity>
            <Card containerStyle={styles.cardContainer}>
                <Text style={styles.name}>Palco v2</Text>
                <Text style={styles.description}>Disfrutarás de la mejor compañia</Text>
                <Text style={isFree ? styles.freePrice:styles.price}>{isFree ? "GRATIS": formatValue(price)}</Text>
            </Card>
        </TouchableOpacity>
    )
}

export default TicketCard
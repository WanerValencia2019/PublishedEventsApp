import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { generateString } from '../../utils';
import TicketCard from '../../components/TicketCard';
import SelectTicketQuantity from '../../components/SelectTicketQuantity';
import { useAppDispatch } from '../../hooks/redux';
import { showToast } from '../../redux/toast/actions';

const ViewTickets = ({ navigation, route }: any) => {
    const event = route.params.event
    const [visible, setVisible] = useState(false);
    const [ticket_id, setTicket_id] = useState('');
    const [title, setTitle] = useState('');
    const [availableTickets, setAvailableTickets] = useState(0);
    const [price, setPrice] = useState(0);

    const dispatch = useAppDispatch();

    const clickToSelect = (ticket: any) => {
        setTitle(ticket.name);
        setVisible(true);
        setTicket_id(ticket.id);
        setAvailableTickets(ticket?.availables - ticket?.ticket_sales);
        setPrice(ticket.unit_price);
    }

    useEffect(() => {
      dispatch(showToast({ message_two:"Instrucciones", message: "Presiona una entrada para comprar", type: "info" }));
    }, [])

    return (
        <View>
            {
                event?.tickets && event?.tickets.map((ticket: any, index: number) => (
                    <TicketCard onClick={()=>clickToSelect(ticket)} tickets_available={ticket?.availables - ticket?.ticket_sales} key={generateString()} description={ticket.description} name={ticket.name} isFree={Number(ticket.unit_price) === 0} price={ticket.unit_price} />
                ))
            }
            <SelectTicketQuantity unit_price={price} title={title} ticket_id={ticket_id} availableTickets={availableTickets} visible={visible} setVisible={setVisible}  />
        </View>
    )
}

export default ViewTickets;
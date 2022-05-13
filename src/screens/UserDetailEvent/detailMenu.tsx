import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { View } from 'react-native';
import { Icon } from 'react-native-elements';
import { Button, Menu, Divider, Provider } from 'react-native-paper';
import Colors from '../../constants/Colors';
import { paragraphs } from '../../constants/Texts';
import { useAppDispatch } from '../../hooks/redux';
import { logout } from '../../redux/auth/actions';

const EventDetailMenu = ({ eventId }: any) => {
  const [visible, setVisible] = React.useState(false);
  const dispatch = useAppDispatch();
  const navigation:any = useNavigation();

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);

  const logoutUser = () => {
    dispatch(logout());
  }

  return (
    <View>
      <Menu
        visible={visible}
        onDismiss={closeMenu}
        anchor={<Icon onPress={openMenu} type="material-community" name="dots-vertical" />}>
        <Menu.Item onPress={() => navigation.navigate("ListEventAssistants", {eventId})} title="Asistentes" titleStyle={{ fontSize: paragraphs.pMedium, color: Colors.darkBlueText }} icon={() => <Icon type='material-community' name="account-multiple-check-outline" color={Colors.darkBlueText} />} />
        <Menu.Item onPress={() => { }} title="Estadisticas" titleStyle={{ fontSize: paragraphs.pMedium, color: Colors.darkBlueText }} icon={() => <Icon type='material-community' name="database" color={Colors.darkBlueText} />} />
        <Menu.Item onPress={() => { }} title="Mensajes" titleStyle={{ fontSize: paragraphs.pMedium, color: Colors.darkBlueText }} icon={() => <Icon type='material-community' name="message-outline" color={Colors.darkBlueText} />} />
        <Divider />
        <Menu.Item onPress={() => { }} title="Editar" titleStyle={{ fontSize: paragraphs.pMedium, color: Colors.darkBlueText }} icon={() => <Icon type='material-community' name="pencil-outline" color={Colors.darkBlueText} />} />
        <Menu.Item onPress={() => { }} title="Eliminar" icon={() => <Icon type='material-community' name="delete-outline" color="red" />} titleStyle={{ fontSize: paragraphs.pMedium, color: "red" }} />
      </Menu>
    </View>
  );
};

export default EventDetailMenu;
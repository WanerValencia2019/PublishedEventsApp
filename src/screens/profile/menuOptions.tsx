import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { View } from 'react-native';
import { Icon } from 'react-native-elements';
import { Button, Menu, Divider, Provider } from 'react-native-paper';
import Colors from '../../constants/Colors';
import { paragraphs } from '../../constants/Texts';
import { useAppDispatch } from '../../hooks/redux';
import { logout } from '../../redux/auth/actions';

const MenuOptions = () => {
  const [visible, setVisible] = React.useState(false);
  const dispatch = useAppDispatch();
  const navigation:any = useNavigation();

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);

  const logoutUser = () => {
    dispatch(logout());
}

React.useEffect(() => {
  return () => {
    closeMenu()
  };
}, [])

  return (
      <View>
        <Menu
          visible={visible}
          onDismiss={closeMenu}
          anchor={<Icon onPress={openMenu} type="material-community" name="dots-vertical" />}>
          <Menu.Item onPress={() => navigation.navigate("BillingProfile")} title="Perfil de pagos" icon="account-cash-outline" titleStyle={{fontSize: paragraphs.pMedium}}  />
          <Menu.Item onPress={() => {}} title="Configuración" icon="cog-outline" titleStyle={{fontSize: paragraphs.pMedium}}  />
          <Divider />
          <Menu.Item onPress={logoutUser} title="Cerrar sesión" titleStyle={{fontSize: paragraphs.pMedium}}  icon="logout" />
        </Menu>
      </View>
  );
};

export default MenuOptions;
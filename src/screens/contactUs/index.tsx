import { Alert, Linking, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { fonts, headers, paragraphs } from '../../constants/Texts'
import Colors from '../../constants/Colors'
import { Icon } from 'react-native-elements'

const ContactUs = () => {
  const developBy = [
    {
      name: "Waner Andrés Valencia Moreno",
      profession: "Desarrollador FullStack",
      email: "valenciawaner@gmail.com",
      phone: "+57 3014219131",
      socialNetworks: [
        {
          icon: "linkedin",
          url: "https://www.linkedin.com/in/waner-andres-valencia-moreno-9367a0149/"
        },
        {
          icon: "github",
          url: "https://github.com/WanerValencia2019"
        },
        {
          icon: "facebook",
          url: "https://web.facebook.com/wander.valenciamoreno"
        },
      ]
    },
    {
      name: "Elkin Daniel Cuesta Mosquera",
      profession: "Desarrollador Frontend",
      email: "elkin10cuesta@gmail.com",
      phone: "+57 322 6115572",
      socialNetworks: [
        {
          icon: "facebook",
          url: "https://web.facebook.com/elkinleinaD.cuestamosquera"
        }
      ]
    }
  ]

  const openSocialNetwork = async (url: string) => {
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
    } else {
      Alert.alert(`No se pudo abrir la url: ${url}`);
    }
  }

  return (
    <View style={styles.root}>
      <Text style={styles.text}>Published Events</Text>
      <Text style={styles.description}>Esta aplicación fue creada por una pareja de Ingenieros de Sistemas, que buscan el mejor de la calidad de vida de los habitantes del departamento del Chocó, Colombia por medio de la innovación tecnologica. </Text>
      <View>
        {
          developBy.map((developer) => (
            <View style={styles.userCard}>
              <Text selectable style={styles.fullName}>{developer.name}</Text>
              <Text selectable style={styles.allText}>{developer.profession}</Text>
              <Text selectable style={styles.allText}>{developer.email}</Text>
              <Text selectable style={styles.allText}>{developer.phone}</Text>
              <View style={styles.iconContainer}>
                {
                  developer.socialNetworks.map((social, i) => (
                    <Icon onPress={() => openSocialNetwork(social.url)} type='material-community' name={social.icon} color={Colors.darkGray} size={40} containerStyle={{ paddingLeft: i === 0 ? 0 : 12 }} />
                  ))
                }
              </View>
            </View>
          ))
        }
      </View>
    </View>
  )
}

export default ContactUs

const styles = StyleSheet.create({
  root: {
    flex: 1,
    marginLeft: 10,
    marginRight: 10,
  },
  text: {
    fontSize: headers.h4,
    fontFamily: fonts.Roboto_500Medium,
    color: Colors.blue,
    marginTop: 10,
    textAlign: 'center'
  },
  description: {
    fontSize: paragraphs.pLarge,
    fontFamily: fonts.Roboto_400Regular,
    color: Colors.darkBlue,
    marginTop: 10,
    textAlign: 'justify',
  },
  userCard: {
    backgroundColor: "white",
    padding: 10,
    marginTop: 10,
    elevation: 2,
    shadowColor: "#fff",
    shadowOffset: {
      width: 18,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 1,
    borderRadius: 10
  },
  fullName: {
    fontFamily: fonts.Roboto_500Medium,
    fontSize: paragraphs.pMedium
  },
  allText: {
    fontFamily: fonts.Roboto_300Light,
    fontSize: paragraphs.pMedium,
    paddingTop: 5,
    paddingBottom: 5
  },
  iconContainer: {
    display: "flex",
    flexDirection: "row",
    padding: 5,
  }
})
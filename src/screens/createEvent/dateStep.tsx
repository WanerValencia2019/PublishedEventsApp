import { View, Text, Dimensions, StyleSheet } from 'react-native'
import React from 'react'
import DateTimePicker from '@react-native-community/datetimepicker';
import { fonts, headers, paragraphs } from '../../constants/Texts';
import Colors from '../../constants/Colors';
import { Button, Icon } from 'react-native-elements';

import dayjs from 'dayjs';
import 'dayjs/locale/es';

const DateStep = () => {
  const [limitDate, setLimitDate] = React.useState<any>(new Date());
  const [limitTime, setLimitTime] = React.useState<any>(new Date());
  const [startDate, setStartDate] = React.useState<any>(new Date());
  const [startTime, setStartTime] = React.useState<any>(new Date());
  const [endDate, setEndDate] = React.useState<any>(new Date());
  const [endTime, setEndTime] = React.useState<any>(new Date());

  const [showLimitDate, setShowLimitDate] = React.useState(false);
  const [showLimitTime, setShowLimitTime] = React.useState(false);
  const [showStartDate, setShowStartDate] = React.useState(false);
  const [showStartTime, setShowStartTime] = React.useState(false);
  const [showEndDate, setShowEndDate] = React.useState(false);
  const [showEndTime, setShowEndTime] = React.useState(false);


  return (
    <View style={styles.root}>
      <View>
        <Text style={styles.titleSection}>Fecha limite de venta</Text>
        <View>
          <View style={styles.wrapperDateButtons}>
            <Button onPress={() => setShowLimitDate((prev) => !prev)} containerStyle={styles.btnContainerStyle} buttonStyle={styles.btnStyle} titleStyle={styles.btnTitleStyle} iconPosition="right" icon={<Icon type='material-community' name='calendar' color={Colors.darkBlueText} iconStyle={{ marginLeft: width * 0.04 }} />} type='outline' title={limitDate.toLocaleDateString()} />
            <Button onPress={() => setShowLimitTime((prev) => !prev)}  buttonStyle={styles.btnStyle} titleStyle={styles.btnTitleStyle} containerStyle={{ marginLeft: width * 0.05, ...styles.btnContainerStyle }} iconPosition="right" icon={<Icon type='material-community' name='clock-outline' color={Colors.darkBlueText} iconStyle={{ marginLeft: width * 0.04 }} />} type='outline' title={dayjs(limitTime).format("h:mm A")} />
          </View>
          {showLimitDate &&
            <DateTimePicker
              value={limitDate}
              mode='date'
              is24Hour={false}
              onChange={(e, date) => { 
                console.log(date);
                setLimitDate(date)
                setShowLimitDate((prev) => !prev)
              }}
            />
          }
          {showLimitTime &&
            <DateTimePicker
              value={limitTime}
              mode='time'
              is24Hour={false}
              onChange={(e, date) => { 
                setLimitTime(date)
                setShowLimitTime(false)
              }}
            />
          }
        </View>
      </View>
      <View>
        <Text style={styles.titleSection}>Fecha de inicio</Text>
        <View>
          <View style={styles.wrapperDateButtons}>
            <Button onPress={() => setShowStartDate((prev) => !prev)} containerStyle={styles.btnContainerStyle} buttonStyle={styles.btnStyle} titleStyle={styles.btnTitleStyle} iconPosition="right" icon={<Icon type='material-community' name='calendar' color={Colors.darkBlueText} iconStyle={{ marginLeft: width * 0.04 }} />} type='outline' title={startDate.toLocaleDateString()} />
            <Button  onPress={() => setShowStartTime((prev) => !prev)} buttonStyle={styles.btnStyle} titleStyle={styles.btnTitleStyle} containerStyle={{ marginLeft: width * 0.05, ...styles.btnContainerStyle }} iconPosition="right" icon={<Icon type='material-community' name='clock-outline' color={Colors.darkBlueText} iconStyle={{ marginLeft: width * 0.04 }} />} type='outline' title={dayjs(startTime).format("h:mm A")} />
          </View>
          {showStartDate && 
            <DateTimePicker
              value={startDate}
              mode='date'
              is24Hour={false}
              onChange={(e, date) => {
                setStartDate(date)
                setShowStartDate((prev) => !prev)
              }}
            />
          }
          {showStartTime && 
            <DateTimePicker
              value={startTime}
              mode='time'
              is24Hour={false}
              onChange={(e, date) => {
                setStartTime(date)
                setShowStartTime(false)
              }
            }
            />
          }
        </View>
      </View>
      <View>
        <Text style={styles.titleSection}>Finalización del evento</Text>
        <View>
          <View style={styles.wrapperDateButtons}>
            <Button onPress={() => setShowEndDate((prev) => !prev)} containerStyle={styles.btnContainerStyle} buttonStyle={styles.btnStyle} titleStyle={styles.btnTitleStyle} iconPosition="right" icon={<Icon type='material-community' name='calendar' color={Colors.darkBlueText} iconStyle={{ marginLeft: width * 0.04 }} />} type='outline' title={endDate.toLocaleDateString()} />
            <Button onPress={() => setShowEndTime((prev) => !prev)} buttonStyle={styles.btnStyle} titleStyle={styles.btnTitleStyle} containerStyle={{ marginLeft: width * 0.05, ...styles.btnContainerStyle }} iconPosition="right" icon={<Icon type='material-community' name='clock-outline' color={Colors.darkBlueText} iconStyle={{ marginLeft: width * 0.04 }} />} type='outline' title={dayjs(endTime).format("h:mm A")} />
          </View>
          {showEndDate &&
            <DateTimePicker
              value={endDate}
              mode='date'
              is24Hour={false}
              onChange={(e, date) => {
                setEndDate(date)
                setShowEndDate((prev) => !prev)
              }}
            />
          }
          {showEndTime &&
            <DateTimePicker
              value={endTime}
              mode='time'
              is24Hour={false}
              onChange={(e, date) => {
                setEndTime(date)
                setShowEndTime(false)
              }
            }
            />
          }
        </View>
      </View>
    </View>
  )
}

const { height, width } = Dimensions.get("screen");

const styles = StyleSheet.create({
  root: {
    marginTop: height * 0.02,
    marginBottom: height * 0.12,
  },
  titleSection: {
    fontSize: headers.h5,
    fontFamily: fonts.Roboto_500Medium,
    color: Colors.darkBlueText,
    paddingTop: height * 0.03,
  },
  subtitleSection: {
    fontSize: paragraphs.pMedium,
    fontFamily: fonts.Roboto_400Regular,
    color: Colors.darkBlueText,
    marginLeft: width * 0.01,
  },
  btnStyle: {
    borderColor: Colors.darkBlueText
  },
  btnTitleStyle: {
    color: Colors.darkBlueText
  },
  btnContainerStyle: {
    width: width * 0.4,
  },
  wrapperDateButtons: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    marginTop: height * 0.02
  }
})

export default DateStep;
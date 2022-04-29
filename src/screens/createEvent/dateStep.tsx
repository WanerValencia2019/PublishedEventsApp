import { View, Text, Dimensions, StyleSheet } from 'react-native'
import React, { useEffect } from 'react'
import DateTimePicker from '@react-native-community/datetimepicker';
import { fonts, headers, paragraphs } from '../../constants/Texts';
import Colors from '../../constants/Colors';
import { Button, FAB, Icon } from 'react-native-elements';

import dayjs from 'dayjs';
import 'dayjs/locale/es';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { createEvent, newEventDates } from '../../redux/events/actions';
import { useNavigation } from '@react-navigation/native';

const DateStep = ({ handleBack, handleNext }: any) => {
  const dispatch = useAppDispatch();
  const { newEvent } = useAppSelector(state => state.events)
  const navigation:any = useNavigation()

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

  useEffect(() => {
    if (newEvent.dates.limit !== "") {
      setLimitDate(new Date(newEvent.dates.limit))
      setLimitTime(new Date(newEvent.dates.limit))
    } else if (newEvent.dates.start !== "") {
      setStartDate(new Date(newEvent.dates.start))
      setStartTime(new Date(newEvent.dates.start))
    }
    else if (newEvent.dates.end !== "") {
      setEndDate(new Date(newEvent.dates.end))
      setEndTime(new Date(newEvent.dates.end))
    }
  }, [])

  const finish = () => {
    dispatch(createEvent({...newEvent, navigate: navigation.navigate}))
  }

  return (
    <View style={styles.root}>
      <View>
        <Text style={styles.titleSection}>Fecha limite de venta</Text>
        <View>
          <View style={styles.wrapperDateButtons}>
            <Button onPress={() => setShowLimitDate((prev) => !prev)} containerStyle={styles.btnContainerStyle} buttonStyle={styles.btnStyle} titleStyle={styles.btnTitleStyle} iconPosition="right" icon={<Icon type='material-community' name='calendar' color={Colors.darkBlueText} iconStyle={{ marginLeft: width * 0.04 }} />} type='outline' title={limitDate.toLocaleDateString()} />
            <Button onPress={() => setShowLimitTime((prev) => !prev)} buttonStyle={styles.btnStyle} titleStyle={styles.btnTitleStyle} containerStyle={{ marginLeft: width * 0.05, ...styles.btnContainerStyle }} iconPosition="right" icon={<Icon type='material-community' name='clock-outline' color={Colors.darkBlueText} iconStyle={{ marginLeft: width * 0.04 }} />} type='outline' title={dayjs(limitTime).format("h:mm A")} />
          </View>
          {showLimitDate &&
            <DateTimePicker
              value={limitDate}
              mode='date'
              is24Hour={false}
              onChange={(e, date) => {
                const date_only = date?.toISOString().split("T")[0]
                const time_only = limitTime?.toISOString().split("T")[1]
                const full_date = date_only + "T" + time_only;
                setLimitDate(date)
                setShowLimitDate(false)
                dispatch(newEventDates({
                  limit: full_date
                }))
              }}
            />
          }
          {showLimitTime &&
            <DateTimePicker
              value={limitTime}
              mode='time'
              is24Hour={false}
              onChange={(e, date) => {
                const time_only = date?.toISOString().split("T")[1]
                const date_only = limitDate?.toISOString().split("T")[0]
                const full_date = date_only + "T" + time_only;
                setLimitTime(date)
                setShowLimitTime(false)
                dispatch(newEventDates({
                  limit: full_date
                }))
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
            <Button onPress={() => setShowStartTime((prev) => !prev)} buttonStyle={styles.btnStyle} titleStyle={styles.btnTitleStyle} containerStyle={{ marginLeft: width * 0.05, ...styles.btnContainerStyle }} iconPosition="right" icon={<Icon type='material-community' name='clock-outline' color={Colors.darkBlueText} iconStyle={{ marginLeft: width * 0.04 }} />} type='outline' title={dayjs(startTime).format("h:mm A")} />
          </View>
          {showStartDate &&
            <DateTimePicker
              value={startDate}
              mode='date'
              is24Hour={false}
              onChange={(e, date) => {
                const date_only = date?.toISOString().split("T")[0]
                const time_only = startTime?.toISOString().split("T")[1]
                const full_date = date_only + "T" + time_only;
                setStartDate(date)
                setShowStartDate(false)
                dispatch(newEventDates({
                  start: full_date
                }))
              }}
            />
          }
          {showStartTime &&
            <DateTimePicker
              value={new Date(startTime)}
              mode='time'
              is24Hour={false}
              onChange={(e, date) => {
                const time_only = date?.toISOString().split("T")[1]
                const date_only = startDate?.toISOString().split("T")[0]
                const full_date = date_only + "T" + time_only;
                setStartTime(date)
                setShowStartTime(false)
                dispatch(newEventDates({
                  start: full_date
                }))
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
                const date_only = date?.toISOString().split("T")[0]
                const time_only = endTime?.toISOString().split("T")[1]
                const full_date = date_only + "T" + time_only;
                setEndDate(date)
                setShowEndDate(false)
                dispatch(newEventDates({
                  end: full_date
                }))
              }}
            />
          }
          {showEndTime &&
            <DateTimePicker
              value={endTime}
              mode='time'
              is24Hour={false}
              onChange={(e, date) => {
                const time_only = date?.toISOString().split("T")[1]
                const date_only = endDate?.toISOString().split("T")[0]
                const full_date = date_only + "T" + time_only;
                setEndTime(date)
                setShowEndTime(false)
                dispatch(newEventDates({
                  end: full_date
                }))
              }
              }
            />
          }
        </View>
      </View>
      <View style={{ position: "absolute", left: 0, right: 0, bottom: height * 0.3 }}>
        <View style={{ position: "absolute", left: 0, bottom: 10 }}>
          <FAB onPress={handleBack} disabled={false} iconPosition='left' icon={<Icon type='material-community' name='arrow-left' color={Colors.light.background} />} title="Anterior" color={Colors.orange} />
        </View>
        <View style={{ position: "absolute", right: 0, bottom: 10 }}>
          <FAB onPress={finish} disabled={false} title="Finalizar" color={Colors.darkBlueText} iconPosition='right' icon={<Icon type='material-community' name='arrow-right' color={Colors.light.background} />} />
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
    height
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
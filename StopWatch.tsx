import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';

function getCurrentime() {
  const date = new Date()
  return date.getTime()
}

type lapProps = {
  name : string,
  time : string
};

function Lap(props : lapProps) : React.JSX.Element {
  return (<View style = {styles.lap}>
    <View style = {{flex : 1, alignItems : 'flex-start', padding : 10}}>
      <Text style = {styles.lapText}> {props.name} </Text>
    </View>
    <View style = {{flex : 1, alignItems : 'flex-end', padding : 10}}>
      <Text style = {styles.lapText}> {props.time} </Text>
    </View>
  </View>)
}
function Stopwatch () : React.JSX.Element {
  const [preTime, setPreTime] = useState(0);
  const [startTime, setStartTime] = useState(0);
  const [timer, setTimer] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [laps, setLaps] = useState([]);
  let lapid = 1
  useEffect(() => {
    if (isRunning) {
        const interval = setInterval(() => {
            let curTime = getCurrentime()
            console.log(preTime)
            console.log(curTime)
            setTimer(curTime + preTime - startTime)
        }, 70)
        return () => clearInterval(interval)
    }
  }, [isRunning]) 
  const startStopwatch = () => {
    const curTime = getCurrentime();
    if (!isRunning) {
      setStartTime(curTime);
      console.log(startTime);
      setIsRunning(true);
    } else {
      setIsRunning(false); 
      setTimer(preTime + curTime - startTime);
      setPreTime(preTime + curTime - startTime);
      setStartTime(curTime);
    }
  };
  const resetStopWatch = () => {
    if (!isRunning) {
      setTimer(0);
      setPreTime(0)
      setStartTime(getCurrentime())
      setLaps([])
    } else {
      setTimer(preTime + getCurrentime() - startTime);
      let timestr = formatTime()
      setLaps([...laps, [timestr]])
    }
  }
  const formatTime = () => {
    let t = Math.floor(timer / 10);
    const secPer100 = t % 100; t = Math.floor(t / 100);
    const sec = t % 60; t = Math.floor(t / 60);
    const min = t
    return `${String(min).padStart(2, '0')}:${String(sec).padStart(2, '0')},${String(secPer100).padStart(2, '0')}`;
  }
  return (
    <View style={styles.container}>
      <View style = {styles.topContainer}>
        <Text style={styles.timer}>{formatTime()}</Text>
      </View>
      <View style = {styles.midContainer}>
        <View style = {styles.leftContainer}>
          <TouchableOpacity style = {styles.button} onPress = {resetStopWatch}>
            <Text style = {styles.buttonText}> {isRunning ? 'Lap' : 'Reset'} </Text>
          </TouchableOpacity>
        </View>
        <View style = {styles.rightContainer}>
          <TouchableOpacity style = {styles.button} onPress={startStopwatch}>
            <Text style = {styles.buttonText}> {isRunning ? 'Stop' : 'Start'} </Text>  
          </TouchableOpacity>
        </View>
      </View>
      <View style = {styles.bottomContainer}>
      {laps.map((lapTime, index) => (
        <Lap name={"Lap " + (index+1).toString()} time={lapTime}></Lap>  
      ))}
      </View>
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor : '#101010'
  },
  topContainer : {
    flex: 3,
    justifyContent : 'center',
    alignItems : 'center'
  },
  midContainer : {
    flex: 1,
    alignItems : 'center',
    justifyContent : 'center',
    flexDirection : 'row'
  },
  bottomContainer : {
    flex: 3,
    backgroundColor : '#101010'
  },
  leftContainer : {
    flex: 1,
    alignItems : 'flex-start',
    paddingLeft : 40
  },
  rightContainer : {
    flex: 1,
    alignItems : 'flex-end',
    paddingRight : 40
  },
  timer: {
    fontSize: 80,
    color : 'white'
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  button: {
    padding: 10,
    width:100,
    height:100,
    borderRadius: 50,
    borderWidth : 3,
    borderColor : 'white',
    backgroundColor : 'green',
    alignItems:'center',
    justifyContent:'center',
  },
  buttonText: {
    color: 'white',
    fontSize:20,
  },
  lap : {
    flexDirection: 'row',
    borderWidth:1,
    borderColor:'white'
  },
  lapText : {
    color : 'white',
    fontSize : 20
  }
});

export default Stopwatch;

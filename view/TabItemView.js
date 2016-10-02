
import React, { Component } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
} from 'react-native';

export default class TabItemView extends Component{
  render(){
    return(
      <ScrollView>
        <View style={ styles.container}>
          {this.props.contents}
        </View>
      </ScrollView>
    );
  }
  // toastMessage(alertMessage){
  //     ToastAndroid.show(alertMessage,ToastAndroid.SHORT);
  // }
}

const styles=StyleSheet.create({
  container: {
    flex: 1,
  }
});

module.exports = TabItemView;
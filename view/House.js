
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
} from 'react-native';

  export default class House extends Component{
    render(){
      var house = this.props.house; 
      return(
         <View style={ styles.house }>
        <Image style={ styles.houseImage } source={ { uri: house.img_url } } />
        <View style={ styles.houseInfo }>
          <Text style={ styles.houseName }>
            { house.lister_name}
          </Text>
          <View style={ styles.housePrice }>
            <Text style={ styles.houseScoreHeader }>
              PRICE
            </Text>
            <Text style={ [styles.houseScoreValue, styles.won] }>
              { house.price_formatted }
            </Text>
          </View>
          <View style={ styles.houseScore }>
            <Text style={ styles.houseScoreHeader }>
              BEDROOM
            </Text>
            <Text style={ [styles.houseScoreValue, styles.lost] }>
              { house.bedroom_number }
            </Text>
          </View>
          <View style={ styles.houseScore }>
            <Text style={ styles.houseScoreHeader }>
              BATHROOM
            </Text>
            <Text style={ styles.houseScoreValue }>
              { house.bathroom_number }
            </Text>
          </View>
        </View>
      </View>
      );
    }
  }

const styles=StyleSheet.create({
  house: {
    flex: 1,
    margin: 10,
    borderRadius: 3,
    overflow: 'hidden'
  },
  houseInfo: {
    borderLeftColor: 'rgba( 0, 0, 0, 0.1 )',
    borderLeftWidth: 1,
    borderRightColor: 'rgba( 0, 0, 0, 0.1 )',
    borderRightWidth: 1,
    borderBottomColor: 'rgba( 0, 0, 0, 0.1 )',
    borderBottomWidth: 1,
    padding: 10,
    alignItems: 'center',
    flexDirection: 'row'
  },
  houseImage: {
    flex: 1,
    height: 200
  },
  houseName: {
    fontSize: 18,
    flex: 1,
    paddingLeft: 5
  },
  housePrice: {
    flex: 0.4,
  },
  houseScore: {
    flex: 0.35,
    alignItems: 'center'
  },
  houseScoreHeader: {
    color: 'rgba( 0, 0, 0, 0.3 )',
    fontSize: 10,
    fontWeight: 'bold'
  },
  houseScoreValue: {
    color: 'rgba( 0, 0, 0, 0.6 )',
    fontSize: 16
  },
  won: {
    color: '#93C26D'
  },
  lost: {
    color: '#DD4B39'
  }
});

module.exports = House;


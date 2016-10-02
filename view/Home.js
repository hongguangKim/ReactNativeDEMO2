
import React, { Component } from 'react';
import ScrollableTabView,{ ScrollableTabBar } from 'react-native-scrollable-tab-view';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  TouchableHighlight,
  InteractionManager,
  ActivityIndicator,
  StatusBar,
  Platform,
} from 'react-native';

var House = require('./House');
var TabItemView = require('./TabItemView');
var tabItems = [
    {title:'beijing',name:'北京'},
    {title:'london',name:'伦敦'},
    {title:'shanghai',name:'上海'},
];
var houses =new Array();
export default class Home extends Component{

  constructor(props){
    super(props);
    this.state={
        list: [],
        currentIndex: 0,
        message:'',
    };
  }

  urlForQueryAndPage(key, value, pageNumber) {
      var data = {
          country: 'uk',
          pretty: '1',
          encoding: 'json',
          listing_type: 'buy',
          action: 'search_listings',
          page: pageNumber
      };
      data[key] = value;
      var querystring = Object.keys(data)
        .map(key => key + '=' + encodeURIComponent(data[key]))
        .join('&');
      return 'http://api.nestoria.co.uk/api?' + querystring;
    };

	_executeQuery(query,index) {
		fetch(query)
		.then(response => response.json())
		.then(json => this.setState({ list: json.response.listings,currentIndex:index}))
		.catch(error => 
			this.setState({
				message: 'Something bad happened ' + error
		}));
	}

  fetchData(i){
      if(houses[i]==undefined||this.state.list.length==0){
        this.setState({list:[],currentIndex:i});   
        var query = this.urlForQueryAndPage('place_name',tabItems[i].title, 1);
        this._executeQuery(query,i);
      }else{
        console.log(houses);
        this.setState({list:houses[i]}); 
      }
  }

  createContents(){
    let contents;
    console.log('createContents:'+this.state.list.length);
    if (!this.state.list.length) {
      contents = (
        <View style={ styles.loading }>
          <Text style={ styles.loadingText }>Loading</Text>
          <ActivityIndicator />
        </View>
      )
    } else {
      var { list, currentIndex } = this.state;
      if(houses[currentIndex]==undefined||houses[currentIndex].length==0)
        houses[currentIndex] = list;
      var house = list.map((house,i) => <House house={ house } key={i}  />);
      contents = (
        <View style={styles.container}>
          { house }
        </View>
      )
    }
    return contents;
  }

  componentDidMount(){
    var index = this.state.currentIndex;
    this.fetchData(index);
  }

  render(){
    const{navigator}=this.props;
    var contents = this.createContents();
    console.log('render:');
    return(
      <View style={styles.container}>
      <StatusBar
       backgroundColor='#1a191f'
       barStyle='light-content'
       animated={true}
       hidden={false}
      />
      {Platform.OS=='ios'?<View style={{height:15,backgroundColor:'#ce3d3a'}}/>:null}
      <ScrollableTabView
      initialPage={0}
      scrollWithoutAnimation={false}
      renderTabBar={()=><ScrollableTabBar
                    underlineColor='#ce3d3a'
                    activeTextColor='#fff'
                    inactiveTextColor='rgba(255, 255, 255, 0.7)'
                    underlineHeight={0}
                    textStyle={{ fontSize: 15 }}
                    tabStyle={{ paddingBottom: 0 }}
                    backgroundColor='#ce3d3a'
                    tabStyle={{paddingLeft:12,paddingRight:12}}
                   />}
	    onChangeTab={(obj) => { 
          this.fetchData(obj.i);
        }
      }
      >
     {
      tabItems.map((item,i)=><TabItemView tabLabel={item.name} key={i} index={i} contents={contents}/>)
     }
     </ScrollableTabView>
     </View>
    );
  }
}

const styles=StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  loadingText: {
    fontSize: 14,
    marginBottom: 20
  },
});

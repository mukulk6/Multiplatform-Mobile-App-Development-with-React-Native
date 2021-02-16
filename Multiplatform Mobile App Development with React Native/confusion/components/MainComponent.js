import React, {Component } from 'react';
import Menu from './MenuComponent';
import Home from './HomeComponent';
import About from './AboutComponent';
import Contact from './ContactComponent';
import Reservation from './ReservationComponent';
import Favorites from './FavoriteComponent';
import Login from './LoginComponent';
import {DISHES} from '../shared/dishes';
import {View,Platform,Image,StyleSheet,ScrollView, SafeAreaView,Text,NetInfo,ToastAndroid} from 'react-native';
import Dishdetail from './DishDetailComponent';
import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';
import { createDrawerNavigator,DrawerItems } from 'react-navigation-drawer';
import {Icon} from 'react-native-elements';
import { connect } from 'react-redux';
import { fetchDishes, fetchComments, fetchPromos, fetchLeaders,addComment,postComment } from '../redux/ActionCreators';

const mapStateToProps = state => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    promotions: state.promotions,
    leaders: state.leaders
  }
}

const mapDispatchToProps = dispatch => ({
  fetchDishes: () => dispatch(fetchDishes()),
  fetchComments: () => dispatch(fetchComments()),
  fetchPromos: () => dispatch(fetchPromos()),
  fetchLeaders: () => dispatch(fetchLeaders()),
})

const HomeNavigator = createStackNavigator({
    Home: { screen: Home }
  }, {
    navigationOptions: ({ navigation }) => ({
      headerStyle: {
          backgroundColor: "#512DA8"
      },
      headerTitleStyle: {
          color: "#fff"            
      },
      headerTintColor: "#fff"  
    })
});

const CustomDrawerContentComponent = (props) => (
  <ScrollView>
    <SafeAreaView style = {styles.container}
    forceInSet ={{top:'always',horizontal:'never'}} />
    <View style={styles.drawerHeader}>
      <View style={{flex:1}}>
        <Image source={require('./images/logo.png')}
        style={styles.drawerImage} />
      </View>
      <View style={{flex:2}}>
        <Text style={styles.drawerHeaderText}>Ristorante Con Fusion</Text>
      </View>
    </View>
    <DrawerItems {...props}></DrawerItems>
  </ScrollView>
)

const MenuNavigator = createStackNavigator({
    Menu : {screen : Menu,navigationOptions:({navigation})=>({
      headerLeft:<Icon name="menu" size={24} color='white' onPress={()=>navigation.toggleDrawer()} />
    })},
    Dishdetail : {screen:Dishdetail}
},
{
    initialRouteName : 'Menu',
    navigationOptions:{
        headerStyle:{backgroundColor:'#512DA8'},
        headerTintStyle:{
            color:'#fff'
        }
    }
})

const ContactNavigator = createStackNavigator({
  Contact : {screen:Contact}
},
{
  navigationOptions:({navigation})=>({
      headerStyle:{backgroundColor:'#512DA8'},
      headerTintStyle:{
          color:'#fff'
      },
      headerLeft:<Icon name="menu" size={24} color='white' onPress={()=>navigation.toggleDrawer()} />
  })
})

const AboutUsNavigator = createStackNavigator({
  About: { screen: About }
}, {
      navigationOptions: ({ navigation }) => ({
          headerStyle: {
              backgroundColor: "#512DA8"
          },
          headerTitleStyle: {
              color: "#fff"
          },
          headerTintColor: "#fff",
          headerLeft: <Icon name='menu' size={24}
              color='white'
              onPress={() => navigation.toggleDrawer()}
          />
      })
  });

  const ReservationNavigator = createStackNavigator({
    Reservation: { screen: Reservation }
  }, {
        navigationOptions: ({ navigation }) => ({
            headerStyle: {
                backgroundColor: "#512DA8"
            },
            headerTitleStyle: {
                color: "#fff"
            },
            headerTintColor: "#fff",
            headerLeft: <Icon name='menu' size={24}
                color='white'
                onPress={() => navigation.toggleDrawer()}
            />
        })
    });

    const FavoritesNavigator = createStackNavigator({
      Favorites: { screen: Favorites }
    }, {
          navigationOptions: ({ navigation }) => ({
              headerStyle: {
                  backgroundColor: "#512DA8"
              },
              headerTitleStyle: {
                  color: "#fff"
              },
              headerTintColor: "#fff",
              headerLeft: <Icon name='menu' size={24}
                  color='white'
                  onPress={() => navigation.toggleDrawer()}
              />
          })
      });

      const LoginNavigator = createStackNavigator({
        Login: { screen: Login }
      }, {
            navigationOptions: ({ navigation }) => ({
                headerStyle: {
                    backgroundColor: "#512DA8"
                },
                headerTitleStyle: {
                    color: "#fff"
                },
                headerTintColor: "#fff",
                headerLeft: <Icon name='menu' size={24}
                    color='white'
                    onPress={() => navigation.toggleDrawer()}
                />
            })
        });

  const MainNavigator = createDrawerNavigator({
    Login: 
    { screen: LoginNavigator,
      navigationOptions: {
        title: 'sign-in',
        drawerLabel: 'Login',
        drawerIcon :({tintColor})=> (
          <Icon name='home' type='font-awesome' size={24} color={tintColor} />
        )
      }
    },
    Home: 
      { screen: HomeNavigator,
        navigationOptions: {
          title: 'Home',
          drawerLabel: 'Home',
          drawerIcon :({tintColor})=> (
            <Icon name='home' type='font-awesome' size={24} color={tintColor} />
          )
        }
      },
      About:{
        screen:AboutUsNavigator,
        navigationOptions : {
          title:'About',
          drawerLabel:'About',
          drawerIcon :({tintColor})=> (
            <Icon name='info-circle' type='font-awesome' size={24} color={tintColor} />)
        }
      },
    Menu: 
      { screen: MenuNavigator,
        navigationOptions: {
          title: 'Menu',
          drawerLabel: 'Menu',
          drawerIcon :({tintColor})=> (
            <Icon name='list' type='font-awesome' size={24} color={tintColor} />)
        }, 
      },
    Contact:
    {
      screen: ContactNavigator,
        navigationOptions: {
          title: 'Contact Us',
          drawerLabel: 'Contact Us',
          drawerIcon :({tintColor})=> (
            <Icon name='address-card' type='font-awesome' size={22} color={tintColor} />)
        },
    },
    Reservation:
    {
      screen:ReservationNavigator,
      navigationOptions: {
        title: 'Reserve Table',
        drawerLabel: 'Reserve Table',
        drawerIcon :({tintColor})=> (
          <Icon name='cutlery' type='font-awesome' size={24} color={tintColor} />)
      },
    },
    Favorites:
    {
      screen:FavoritesNavigator,
      navigationOptions: {
        title: 'My Favorites',
        drawerLabel: 'My Favorites',
        drawerIcon :({tintColor})=> (
          <Icon name='heart-o' type='font-awesome' size={24} color={tintColor} />)
      },
    },
  },

  {
    initialRouteName:'Home',
  drawerBackgroundColor: '#D1C4E9',
  contentComponent:CustomDrawerContentComponent
    })

// const MainAppNavigator = createAppContainer(MainNavigator);

class Main extends Component {
  componentDidMount(){
    this.props.fetchDishes();
    this.props.fetchComments();
    this.props.fetchLeaders();
    this.props.fetchPromos();
    NetInfo.getConectionInfo().then((connectionInfo) => {
      ToastAndroid.show('Initial Network Connectivity Type: '
          + connectionInfo.type + ', effectiveType: ' + connectionInfo.effectiveType,
          ToastAndroid.LONG)
  });

  NetInfo.addEventListener('connectionChange',this.handleConnectivity)
  }

  componentWillUnmount()
  {
    NetInfo.removeEventListener('connectionChange',this.handleConnectivity)
  }

  handleConnectivityChange = (connectionInfo)=> {
    switch(connectionInfo.type)
    {
      case 'none':
        ToastAndroid.show('You are now offline!', ToastAndroid.LONG);
        break;
      case 'wifi':
        ToastAndroid.show('You are now connected to WiFi!', ToastAndroid.LONG);
        break;
      case 'cellular':
        ToastAndroid.show('You are now connected to Cellular!', ToastAndroid.LONG);
        break;
      case 'unknown':
        ToastAndroid.show('You now have unknown connection!', ToastAndroid.LONG);
        break;
      default:
        break;

    }
  }
onDishSelect(dishId){
    this.setState({selectedDish:dishId})
}
    render(){
        return(
          <View style={{ flex: 1, paddingTop: Platform.OS === 'ios' }}>
            <MainNavigator />
            </View>
        );
    }

}

const styles = StyleSheet.create({
  container:{
    flex:1
  },
  drawerHeader:{
    backgroundColor: '#512DA8',
    height: 140,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    flexDirection: 'row'
  },
  drawerHeaderText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold'
  },
  drawerImage: {
    margin: 10,
    width: 80,
    height: 60
  }

})
export default connect(mapStateToProps,mapDispatchToProps)(Main);
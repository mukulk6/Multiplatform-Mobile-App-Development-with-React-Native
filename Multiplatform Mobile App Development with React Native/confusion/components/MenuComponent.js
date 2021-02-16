import React, {Component } from 'react';
import {View,FlatList} from 'react-native';
import {Tile,Image} from 'react-native-elements';
import { DISHES } from '../shared/dishes';
import {connect} from 'react-redux';
import {Loading} from './LoadingComponent';
import * as Animatable from 'react-native-animatable';

const mapStateToProps = state => {
    return{
        dishes:state.dishes,
        comments:state.comments
    }

}

class Menu extends Component{

    static navigationOptions = {
        title:'Menu'
    }
    
    render()
    {
        const renderMenuItem = ({item,index}) => {
            return(
                <Animatable.View animation = "fadeInRightBig" duration={2000}>
                <Tile key={index}
                title={item.name}
                caption={item.description}
                featured
                imageSrc={{uri:baseUrl + item.image}}
                onPress={() => navigate('Dishdetail', { dishId: item.id })} />
            </Animatable.View>
            );
        };

        const {navigate} = this.props.navigation;

        if(this.props.dishes.isLoading){
            return(
                <Loading />
            )
        }
        else if(this.props.dishes.errMess){
            return(
                <View>            
                    <Text>{props.dishes.errMess}</Text>
                </View>            
            );
        }
        else
        {
            return(
                <FlatList
                data={this.props.dishes.dishes}
                renderItem={renderMenuItem}
                keyExtractor={item=>item.id.toString()} />
            );
        }
 
    }  

}

export default connect(mapStateToProps)(Menu);
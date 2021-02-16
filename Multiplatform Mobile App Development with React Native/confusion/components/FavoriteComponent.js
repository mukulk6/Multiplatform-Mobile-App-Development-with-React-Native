
import React, {Component } from 'react';
import {View,FlatList, Alert} from 'react-native';
import {Tile,Image, ListItem} from 'react-native-elements';
import { DISHES } from '../shared/dishes';
import {connect} from 'react-redux';
import {Loading} from './LoadingComponent'
import { baseUrl } from '../shared/baseUrl';
import Swipeable from 'react-native-gesture-handler';
import {deleteFavorite} from '../redux/ActionCreators';
import * as Animatable from 'react-native-animatable';

const mapStateToProps = state => {
    return{
        dishes:state.dishes,
        favorites:favorites
    }

}

const mapDispatchToProps = dispatch => ({
    deleteFavorite:(dishId) => dispatch(deleteFavorite(dishId))
});

class Favorites extends Component {
    static navigationOptions = {
        title : 'My Favorites'
    }
render()
{
    const {navigate} = this.props.navigation;



    const RenderMenuItem = ({item,index})=> {
        const rightButton = [
            {
                text: 'Delete', 
                type: 'delete',
                onPress: () => {
                    Alert.alert(
                        'Delete Favorite?',
                        'Are you sure you wish to delete the favorite dish ' + item.name + '?',
                        [
                            { 
                                text: 'Cancel', 
                                onPress: () => console.log(item.name + 'Not Deleted'),
                                style: ' cancel'
                            },
                            {
                                text: 'OK',
                                onPress: () => this.props.deleteFavorite(item.id)
                            }
                        ],
                        { cancelable: false }
                    );
                    
                }
            }
        ];
        return(
            <Swipeable rightThreshold={rightButton} close={true}>
                <Animatable.View animation = "fadeInRightBig" duration={2000}>
            <ListItem key={index} title={item.name} subtitle={item.description} hideCheveron={true} onPress={()=>navigate('Dishdetail',{dishId:item.id})} leftAvatar={{source:{uri:baseUrl + item.image}}} />
            </Animatable.View>
            </Swipeable>
            )
    }

    if(this.props.dishes.isLoading){
        return(
            <Loading />
        )
    }
    else if(this.props.errMess)
    {
        return(
            <View>
                <Text>{this.props.dishes.errMess}</Text>
            </View>
        )
    }
    else{
        return(
            <Flatlist data = {this.props.dishes.dishes.filter(dish => this.props.favorites.some(el=>el===dish.id))}
            renderItem = {renderItem}
            keyExtractor={item => item.id.toString()} />
        )
    }
}
}

export default connect(mapStateToProps,mapDispatchToProps)(Favorites);
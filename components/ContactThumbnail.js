import React from 'react';
import { StyleSheet, View, TouchableOpacity, Text, Image, } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import PropTypes from 'prop-types';
import colors from '../utility/colors';

const ContactThumbnail = ({name = '', phone = '', avatar = '', email='', cell='', textColor = 'white', onPress = null, style='' }) =>
{
    const colorStyle = {
        color: textColor,
    };

    const ImageComponent = onPress ? TouchableOpacity : View;

    return (
        <View style = {styles.container}>
            <ImageComponent onPress = {onPress}>
                <Image
                    source ={{
                        uri: avatar,
                    }}
                    style = {styles.avatar}
                />
            </ImageComponent>
            {name !== '' && <Text style = {[styles.name, colorStyle, style]}>{name}</Text>}

            {phone !== '' && (
                <View style = {styles.phoneSection}>
                    <Icon name="phone" size={16} style = {{color: textColor, marginRight:8}} />
                    <Text style = {[styles.phone, colorStyle]}>{phone}</Text>
                </View>
            )}
            {cell !== '' && (
            <View style = {styles.phoneSection}>
                <Icon
                    name='person'
                    size={20}
                    style={{
                    color: 'white',
                }}/>
                <Text style = {{fontSize:14, color:'white', marginLeft: 8}}>{cell}</Text>
            </View>
            )}
            {email !== '' && (
            <View style = {styles.phoneSection}>
                <Icon
                    name='email'
                    size={24}
                    style={{
                    color: 'white',
                }}/>
                <Text style = {{fontSize:16, color:'white', marginLeft: 8}}>{email}</Text>
            </View>
            )}
        </View>
    );
}

export default ContactThumbnail;

ContactThumbnail.propTypes = {
    name: PropTypes.string,
    avatar: PropTypes.string,
    phone: PropTypes.string,
    onPress: PropTypes.func,
};

// ContactThumbnail.defaultProps = {
//     name: '',
//     phone: '',
//     textColor: 'white',
//     onPress: null,
// }

const styles = StyleSheet.create({
    container: {
        paddingVertical: 30,
        marginHorizontal: 15,
        alignItems: 'center',
        justifyContent: 'center',
        
    },
    avatar: {
        width: 90,
        height: 90,
        borderRadius: 45,
        borderColor: "white",
        borderWidth: 2,
    },
    name: {
        fontSize: 20,
        marginTop: 24,
        marginBottom: 2,
        fontWeight: 'bold',
    },
    phoneSection:{
        flexDirection:'row',
        marginBottom:4
    }
});
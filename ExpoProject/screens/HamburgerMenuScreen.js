import React from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';

const HamburgerMenu = ({ onPress }) => {
    return (
        <TouchableOpacity onPress={onPress}>
            <Ionicons name='md-menu' size={32} color='silver' />
        </TouchableOpacity>
    );
};

export default HamburgerMenu
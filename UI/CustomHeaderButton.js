import React from "react";
import {HeaderButton} from 'react-navigation-header-buttons';
import {AntDesign} from '@expo/vector-icons';
import {colors} from './../assets/colors';

const CustomHeaderButton = props => {
    return (
        <HeaderButton {...props} IconComponent={AntDesign} iconSize={23} color={colors.lemon}></HeaderButton>
    )
}   

export default CustomHeaderButton;
import React from 'react';
import {View} from 'react-native';
import PrimaryAccordion from './components/PrimaryAccordion';
import SecondaryAccordion from './components/SecondaryAccordion';

const Accordions = ({handleLayout, handleOpen}) => {
  return (
    <View className="mt-4">
      <PrimaryAccordion handleLayout={handleLayout} handleOpen={handleOpen} />
      <SecondaryAccordion handleLayout={handleLayout} handleOpen={handleOpen} />
    </View>
  );
};

export default Accordions;

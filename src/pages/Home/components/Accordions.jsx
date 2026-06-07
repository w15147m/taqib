import React from 'react';
import {View} from 'react-native';
import SearchAccordion from './components/SearchAccordion';
import PrimaryAccordion from './components/PrimaryAccordion';
import SecondaryAccordion from './components/SecondaryAccordion';

const Accordions = ({handleLayout, handleOpen}) => {
  return (
    <View className="mt-4">
      <SearchAccordion handleLayout={handleLayout} handleOpen={handleOpen} />
      <PrimaryAccordion handleLayout={handleLayout} handleOpen={handleOpen} />
      <SecondaryAccordion handleLayout={handleLayout} handleOpen={handleOpen} />
    </View>
  );
};

export default Accordions;

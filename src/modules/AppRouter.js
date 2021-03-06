/*eslint-disable react/prop-types*/

import React from 'react';
import CounterViewContainer from './counter/CounterViewContainer';
import ApprovedViewContainer from './counter/ApprovedViewContainer';
import AvoidViewContainer from './counter/AvoidViewContainer';
import ContactedViewContainer from './counter/ContactedViewContainer';
import ConcernsViewContainer from './counter/ConcernsViewContainer';
import AboutViewContainer from './counter/AboutViewContainer';
import ScannerViewContainer from './scanner/ScannerViewContainer';
import IngredientViewContainer from './scanner/IngredientViewContainer';

/**
 * AppRouter is responsible for mapping a navigator scene to a view
 */
export default function AppRouter(props) {
  const key = props.scene.route.key;

  if (key === 'Home') {
    return <CounterViewContainer />;
  }

  if (key === 'Avoid') {
    return <AvoidViewContainer />;
  }

  if (key === 'Approved') {
    return <ApprovedViewContainer />;
  }

  if (key === 'About') {
    return <AboutViewContainer />;
  }

  if (key === 'Contacted') {
    return <ContactedViewContainer />;
  }

  if (key === 'Concerns') {
    return <ConcernsViewContainer />;
  }

  if (key === 'Ingredients') {
    return <IngredientViewContainer />;
  }

  if (key === 'Scanner') {
    return <ScannerViewContainer />;
  }

  if (key === 'Color') {
    return <ScannerViewContainer />;
  }

  throw new Error('Unknown navigation key: ' + key);
}

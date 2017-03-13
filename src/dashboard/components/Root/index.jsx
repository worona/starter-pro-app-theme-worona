/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import * as deps from '../../deps';
import StarterThemeForm from './StarterThemeForm';
import Menu from './Menu';

export default () => {
  const RootContainer = deps.elements.RootContainer;
  return (
    <RootContainer mobilePreview>
      <h1>Starter Pro Theme</h1>
      <h3>Appereance</h3>
      <hr />
      <StarterThemeForm />
      <h3>Menu</h3>
      <hr />
      <Menu />
    </RootContainer>
  );
}

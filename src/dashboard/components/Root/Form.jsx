/* eslint-disable jsx-a11y/no-static-element-interactions, react/no-unused-prop-types */
import React from 'react';
import { flow } from 'lodash/fp';
import { reduxForm, Field, FieldArray } from 'redux-form';
import { connect } from 'react-redux';
import * as deps from '../../deps';
import * as selectors from '../../selectors';
import ColorPicker from './ColorPicker';
import FrontPage from './FrontPage';
import Menu from './Menu';

class StarterProThemeForm extends React.Component {
  constructor(props) {
    super(props);
    this.submitSettings = this.submitSettings.bind(this);
  }

  submitSettings(values, dispatch) {
    dispatch(
      deps.actions.saveSettingsRequested(values, {
        siteId: this.props.siteId,
        name: 'starter-pro-app-theme-worona',
      }),
    );
  }

  render() {
    const { pristine, waiting, handleSubmit } = this.props;
    return (
      <form onSubmit={handleSubmit(this.submitSettings)}>
        <Field name="color" component={ColorPicker} label="Theme Color" />
        <Field
          name="displayFeaturedImage"
          component={deps.elements.Switch}
          label="Display featured image?"
          type="checkbox"
        />
        <FrontPage label="Front Page" />
        <FieldArray name="menu" component={Menu} label="Menu" />
        <deps.elements.Button
          color="primary"
          size="large"
          type="submit"
          disabled={pristine}
          loading={waiting}
        >
          Save
        </deps.elements.Button>
      </form>
    );
  }
}

StarterProThemeForm.propTypes = {
  handleSubmit: React.PropTypes.func.isRequired,
  waiting: React.PropTypes.bool,
  siteId: React.PropTypes.string,
  pristine: React.PropTypes.bool,
  initialValues: React.PropTypes.shape({
    chosenColor: React.PropTypes.string,
    displayFeaturedImage: React.PropTypes.bool,
  }),
};

const mapStateToFormProps = state => {
  const themeSettings = selectors.getThemeSettings(state);
  return {
    initialValues: {
      color: themeSettings.color,
      displayFeaturedImage: themeSettings.displayFeaturedImage,
      menu: themeSettings.menu,
      frontPage: themeSettings.frontPage,
    },
    waiting: deps.selectors.getSavingSettings(state) === 'starter-pro-app-theme-worona',
    siteId: deps.selectors.getSelectedSiteId(state),
    chosenColor: state.theme.reduxForm.StarterProThemeForm &&
      state.theme.reduxForm.StarterProThemeForm.values &&
      state.theme.reduxForm.StarterProThemeForm.values.chosenColor,
  };
};

export default flow(
  reduxForm({
    form: 'StarterProThemeForm',
    fields: ['chosenColor', 'displayFeaturedImage'],
    getFormState: state => state.theme.reduxForm,
    enableReinitialize: true,
  }),
  connect(mapStateToFormProps),
)(StarterProThemeForm);

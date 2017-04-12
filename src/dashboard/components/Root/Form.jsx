/* eslint-disable jsx-a11y/no-static-element-interactions, react/no-unused-prop-types */
import React from 'react';
import { flow } from 'lodash/fp';
import { reduxForm, Field, FieldArray } from 'redux-form';
import { connect } from 'react-redux';
import * as deps from '../../deps';
import * as selectors from '../../selectors';
import validate from './validate';
import ColorPicker from './Fields/ColorPicker';
import FrontPage from './Fields/FrontPage';
import Menu from './Fields/Menu';
import Language from './Fields/Language';
import styles from './style.css';

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
    const { pristine, waiting, handleSubmit, invalid } = this.props;
    return (
      <form onSubmit={handleSubmit(this.submitSettings)}>
        <span className={styles.sectionTitle}>Style</span>
        <Field name="color" component={ColorPicker} label="Theme Color" />
        <Field
          name="displayFeaturedImage"
          component={deps.elements.Switch}
          label="Display featured image?"
          type="checkbox"
        />
        <Field
          name="displayCategories"
          component={deps.elements.Switch}
          label="Display categories?"
          type="checkbox"
        />
        <Field
          name="rtl"
          component={deps.elements.Switch}
          label="Right-to-left text direction?"
          type="checkbox"
        />
        <Language />
        <FrontPage label="Front Page" />
        <FieldArray name="menu" component={Menu} label="Menu" />
        <span className={styles.section}>
          <deps.elements.Button
            color="primary"
            size="large"
            type="submit"
            disabled={waiting || pristine || invalid}
            loading={waiting}
          >
            Save
          </deps.elements.Button>
        </span>
      </form>
    );
  }
}

StarterProThemeForm.propTypes = {
  handleSubmit: React.PropTypes.func.isRequired,
  waiting: React.PropTypes.bool,
  siteId: React.PropTypes.string,
  pristine: React.PropTypes.bool,
  invalid: React.PropTypes.bool,
  initialValues: React.PropTypes.shape({
    color: React.PropTypes.string,
    displayFeaturedImage: React.PropTypes.bool,
    displayCategories: React.PropTypes.bool,
    menu: React.PropTypes.arrayOf(React.PropTypes.object),
    frontPage: React.PropTypes.shape({}),
  }),
};

const mapStateToProps = state => {
  const themeSettings = selectors.getThemeSettings(state);
  return {
    initialValues: {
      color: themeSettings.color,
      displayFeaturedImage: themeSettings.displayFeaturedImage,
      displayCategories: themeSettings.displayCategories,
      menu: themeSettings.menu,
      frontPage: themeSettings.frontPage,
      language: themeSettings.language,
      rtl: themeSettings.rtl,
    },
    waiting: deps.selectors.getSavingSettings(state) === 'starter-pro-app-theme-worona',
    siteId: deps.selectors.getSelectedSiteId(state),
  };
};

export default flow(
  reduxForm({
    form: 'StarterProThemeForm',
    getFormState: state => state.theme.reduxForm,
    enableReinitialize: true,
    validate,
  }),
  connect(mapStateToProps),
)(StarterProThemeForm);

import React from 'react';
import withStyles from 'withStyles';
import { reduxForm, Field } from 'redux-form';
import { translate } from 'react-i18next';

import { Select } from '@components/Select';

import styles from './styles.scss';

@withStyles(styles)
@translate()
@reduxForm()
export default class QueryFieldFilterForm extends React.Component {
  constructor() {
    super();
    this.state = {
      active: '',
    };
  }
  render() {
    const {
      data,
      shouldSortData = true,
      name,
      handleSubmit,
      disabled,
      placeholder,
      t,
    } = this.props;

    if (shouldSortData) {
      data.sort((a, b) => a.name.localeCompare(b.name));
    }

    return (
      <form handleSubmit={handleSubmit}>
        <div>
          <Field
            searchable
            disabled={disabled}
            type="text"
            name={name}
            component={Select}
            emptyText={t('Not found')}
            placeholder={placeholder}
            onChangeSearch={val => this.setState({ active: val })}
            options={
              data
                .filter(i =>
                  i.name.toLowerCase().includes(this.state.active.toLowerCase()))
                .map(i => ({
                  name: i.id,
                  title: i.name,
                }))
            }
          />
        </div>
      </form>
    );
  }
}

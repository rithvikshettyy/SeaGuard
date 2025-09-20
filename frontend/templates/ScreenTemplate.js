// Template for adding translations to any screen

import React from 'react';
import { View, Text } from 'react-native';
import { useTranslation } from '../hooks/useTranslation';

const ScreenTemplate = () => {
  // Initialize translations for this screen
  const t = useTranslation('ScreenName'); // Replace 'ScreenName' with actual screen name

  return (
    <View>
      {/* Use translations with the t function */}
      <Text>{t('title')}</Text>
      
      {/* For nested translations */}
      <Text>{t('section.subsection.key')}</Text>
      
      {/* For dynamic content */}
      <Text>{`${t('prefix')}: ${someValue}`}</Text>
      
      {/* For error messages */}
      {error && <Text>{t('errors.someError')}</Text>}
      
      {/* For buttons */}
      <Button title={t('buttons.submit')} onPress={handleSubmit} />
      
      {/* For input placeholders */}
      <TextInput placeholder={t('inputs.placeholder')} />
    </View>
  );
};

export default ScreenTemplate;
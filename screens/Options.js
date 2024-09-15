import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Animated } from 'react-native';
import DetailListItem from '../components/DetailListItem';
import { useTranslation } from 'react-i18next';
import i18n from '../i18n';
import colors from '../utility/colors';

const Options = () => {
  const { t, i18n } = useTranslation();
  const [changeLanguage, setChangeLanguage] = useState(false);
  const scale = useState(new Animated.Value(0))[0]; 

  useEffect(() => {
    Animated.parallel([
      Animated.timing(scale, {
        toValue: changeLanguage ? 1 : 0, 
        duration: 300, 
        useNativeDriver: true, 
      }),
    ]).start();
  }, [changeLanguage]);

  return (
    <View style={styles.container}>
      {/* <DetailListItem title={t('update_profile') || 'Default Title'} /> */}
      <DetailListItem
        title={t('change_language') || 'Default Title'}
        onPress={() => setChangeLanguage(!changeLanguage)}
      />
      <Animated.View
        style={[
          styles.languageContainer,
          {
            transform: [
              { scale }, 
            ],
          },
        ]}
      >
        {changeLanguage && (
          <>
            <TouchableOpacity onPress={() => [i18n.changeLanguage('en'), setChangeLanguage(false)]}>
              <Text style={styles.languageText}>English</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => [i18n.changeLanguage('vi'), setChangeLanguage(false)]}>
              <Text style={styles.languageText}>Tiếng Việt</Text>
            </TouchableOpacity>
          </>
        )}
      </Animated.View>
      <DetailListItem title={t('sign_out') || 'Default Title'} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  languageContainer: {
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    padding: 10,
  },
  languageText: {
    fontSize: 16,
    padding: 10,
  },
});

export default Options;

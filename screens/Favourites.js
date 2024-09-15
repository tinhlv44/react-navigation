import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
  TextInput,
} from 'react-native';
import { fetchContacts } from '../utility/api';
import ContactThumbnail from '../components/ContactThumbnail';
import i18n from '../i18n';
import { useTranslation } from 'react-i18next';
const keyExtractor = ({ phone }) => phone;

const Favorites = ({ navigation }) => {
  // State
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const { t } = useTranslation();
  // Load data
  useEffect(() => {
    setLoading(true);
    fetchContacts()
      .then((contacts) => {
        setContacts(contacts);
        setLoading(false);
        setError(false);
      })
      .catch((e) => {
        setLoading(false);
        setError(true);
      });
  }, []);

  const filteredContacts = contacts
    .sort((a, b) => a.name.localeCompare(b.name))
    .filter(contact => contact.name.toLowerCase().includes(searchQuery.toLowerCase()));

  const renderFavoriteThumbnail = ({ item }) => {
    const { avatar, name } = item;
    return (
      <ContactThumbnail
        avatar={avatar}
        name={name}
        textColor={'black'}
        style={{fontSize: 12}}
        onPress={() => navigation.navigate('Profile', { contact: item })}
      />
    );
  };

  const favorites = contacts.filter((contact) => contact.favorite);

  return (
    <View style={styles.container}>
      {loading && <ActivityIndicator size="large" />}
      {error && <Text>Error...</Text>}
      {!loading && !error && (
        favorites.length > 0 ? (
          <>
            <TextInput
              style={styles.searchInput}
              placeholder={t('search-by-name')}
              value={searchQuery}
              onChangeText={setSearchQuery} 
            />
            <FlatList
              data={favorites}
              keyExtractor={keyExtractor}
              numColumns={3}
              contentContainerStyle={styles.list}
              renderItem={renderFavoriteThumbnail}
            />       
          </>
        ) : (
          <View style={{alignItems:'center'}}>
            <Text style={{fontSize:20}}>{t('no-favorites')}</Text>
          </View>
        )
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    justifyContent: 'center',
    flex: 1,
    //marginTop:40
  },
  list: {
    alignItems: 'center',
  },
  searchInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    margin: 10,
    borderRadius: 5,
  },
});

export default Favorites;

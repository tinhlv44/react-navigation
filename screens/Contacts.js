import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, ActivityIndicator, TextInput } from 'react-native';
import { fetchContacts } from '../utility/api';
import ContactListItem from '../components/ContactListitem';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';

const keyExtractor = ({ phone }) => phone;

const Contacts = ({ navigation }) => {
  // state
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const { t } = useTranslation();

  // Load data
  useEffect(() => {
    setLoading(true); // Set loading to true when fetching data
    fetchContacts()
      .then(contacts => {
        setContacts(contacts);
        setLoading(false);
        setError(false);
      })
      .catch(e => {
        console.log(e);
        setLoading(false);
        setError(true);
      });
  }, []);

  // Hàm để thay đổi trạng thái favorite của một contact
  const toggleFavorite = (phone) => {
    setContacts(prevContacts =>
      prevContacts.map(contact =>
        contact.phone === phone ? { ...contact, favorite: !contact.favorite } : contact
      )
    );
  };

  const filteredContacts = contacts
    .sort((a, b) => a.name.localeCompare(b.name))
    .filter(contact => contact.name.toLowerCase().includes(searchQuery.toLowerCase()));

  const renderContact = ({ item }) => {
    const { name, avatar, phone, favorite } = item;
    return (
      <ContactListItem
        name={name}
        avatar={avatar}
        phone={phone}
        favorite={favorite}
        onPress={() => navigation.navigate("Profile", { contact: item })}
        onFavoriteToggle={() => toggleFavorite(phone)} // Truyền hàm này vào ContactListItem
      />
    );
  };

  return (
    <SafeAreaProvider style={styles.safeArea}>
      <View style={styles.container}>
        {loading && <ActivityIndicator color="blue" size="large" />}
        {error && <Text>Error...</Text>}
        {!loading && !error && (
          <>
            <TextInput
              style={styles.searchInput}
              placeholder={t('search-by-name')}
              value={searchQuery}
              onChangeText={setSearchQuery} 
            />
            <FlatList
              data={filteredContacts} 
              keyExtractor={keyExtractor}
              renderItem={renderContact}
            />
          </>
        )}
      </View>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
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

export default Contacts;

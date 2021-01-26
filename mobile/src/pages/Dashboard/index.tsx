import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/Feather';

import { useAuth } from '../../hooks/auth';
import api from '../../services/api';
import {
  Container,
  Header,
  HeaderTitle,
  ProfileButton,
  UserAvatar,
  UserName,
  ProvidersList,
  ProviderContainer,
  ProviderAvatar,
  ProviderName,
  ProviderInfo,
  ProviderWorkingHours as ProviderTag,
  ProviderInfoText as ProviderTagText,
  ProvidersListTitle,
} from './styles';

export interface Provider {
  id: string;
  name: string;
  avatar_url: string;
}

const Dashboard: React.FC = () => {
  const [providers, setProviders] = useState<Provider[]>([]);

  useEffect(() => {
    api.get('providers').then(response => {
      setProviders(response.data);
    });
  }, []);

  const { signOut, user } = useAuth();

  const { navigate } = useNavigation();

  const navigateToProfile = useCallback(() => {
    navigate('Profile');
  }, [navigate]);

  const navigateToCreateAppointment = useCallback(
    (providerId: string) => {
      navigate('CreateAppointment', { providerId });
    },
    [navigate],
  );

  return (
    <Container>
      <Header>
        <HeaderTitle>
          Bem vindo,
          {'\n'}
          <UserName>{user.name}</UserName>
        </HeaderTitle>
        <ProfileButton onPress={navigateToProfile}>
          <UserAvatar source={{ uri: user.avatar_url }} />
        </ProfileButton>
      </Header>
      <ProvidersList
        data={providers}
        ListHeaderComponent={
          <ProvidersListTitle>Cabelereiros</ProvidersListTitle>
        }
        keyExtractor={provider => provider.id}
        renderItem={({ item: provider }) => (
          <ProviderContainer
            onPress={() => navigateToCreateAppointment(provider.id)}
          >
            <ProviderAvatar source={{ uri: provider.avatar_url }} />
            <ProviderInfo>
              <ProviderName>{provider.name}</ProviderName>
              <ProviderTag>
                <Icon name="calendar" size={14} color="#ff9000" />
                <ProviderTagText>Segunda à sexta</ProviderTagText>
              </ProviderTag>
              <ProviderTag>
                <Icon name="clock" size={14} color="#ff9000" />
                <ProviderTagText>8h às 18h</ProviderTagText>
              </ProviderTag>
            </ProviderInfo>
          </ProviderContainer>
        )}
      />
    </Container>
  );
};

export default Dashboard;

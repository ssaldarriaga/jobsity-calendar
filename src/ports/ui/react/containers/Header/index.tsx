import styled from 'styled-components';
import { useMemo } from 'react';
import { useParams } from 'react-router-dom';

// Components
import { Logo } from './components/Logo';
import { Title } from '../../components/Title';
import { Header } from '../../components/Header';
import { PrimaryButton, ClearButton } from '../../components/Button';

// Domain
import { MonthParamsType } from '../../../../../domain/entities/monthEntities';
import { getMonthNameFromParams } from '../../../../../domain/services/monthService';

const ArrowsContainer = styled.div`
  margin: 0 1rem;
`;

export const HeaderContainer = () => {
  const params = useParams<MonthParamsType>();
  const month = useMemo(() => getMonthNameFromParams(params), [params]);

  return (
    <Header>
      <Logo />
      <PrimaryButton>Today</PrimaryButton>
      <ArrowsContainer>
        <ClearButton>
          <i className="fa fa-arrow-left" aria-hidden="true"></i>
        </ClearButton>
        <ClearButton>
          <i className="fa fa-arrow-right" aria-hidden="true"></i>
        </ClearButton>
      </ArrowsContainer>
      <Title>{`${month} ${params.year}`}</Title>
    </Header>
  );
};

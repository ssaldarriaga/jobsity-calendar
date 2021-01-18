import moment from 'moment';
import { useMemo } from 'react';
import styled from 'styled-components';
import { useParams, Link } from 'react-router-dom';

// Components
import { Logo } from './components/Logo';
import { Title } from '../../components/Title';
import { Header } from '../../components/Header';
import { PrimaryButton } from '../../components/Button';

// Domain
import { MonthParamsType } from '../../../../../domain/entities/monthEntities';
import { getMonthNameFromParams } from '../../../../../domain/services/monthService';

const ArrowsContainer = styled.div`
  margin: 0 1rem;
`;

const StyledLink = styled(Link)`
  align-items: center;
  color: ${({ theme }) => theme.secondaryText};
  cursor: pointer;
  display: inline-flex;
  font-weight: 600;
  font-size: 1.2rem;
  height: 40px;
  min-width: 40px;
  padding: 0 1rem;

  &:hover {
    color: ${({ theme }) => theme.secondaryText};
    opacity: 0.8;
    text-decoratrion: none;
  }
`;

export const HeaderContainer = () => {
  const params = useParams<MonthParamsType>();
  const prevDate = useMemo(
    () => moment().year(parseInt(params.year)).month(params.month).subtract(2, 'months').date(1),
    [params.year, params.month],
  );
  const nextDate = useMemo(() => moment().year(parseInt(params.year)).month(params.month).date(1), [
    params.year,
    params.month,
  ]);
  const month = useMemo(() => getMonthNameFromParams(params), [params]);

  return (
    <Header>
      <Logo />
      <StyledLink to={`/month/${moment().year()}/${moment().month() + 1}/${moment().date()}`}>Today</StyledLink>
      <ArrowsContainer>
        <StyledLink to={`/month/${prevDate.year()}/${prevDate.month() + 1}/1`}>
          <i className="fa fa-arrow-left" aria-hidden="true"></i>
        </StyledLink>
        <StyledLink to={`/month/${nextDate.year()}/${nextDate.month() + 1}/1`}>
          <i className="fa fa-arrow-right" aria-hidden="true"></i>
        </StyledLink>
      </ArrowsContainer>
      <Title>{`${month} ${params.year}`}</Title>
    </Header>
  );
};

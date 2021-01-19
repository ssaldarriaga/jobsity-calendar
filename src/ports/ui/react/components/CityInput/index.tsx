import { ChangeEvent, FC, useEffect, useState } from 'react';
import { useFormikContext, FieldProps } from 'formik';

// Components
import { InputFormGroup } from '../Input';

// Domain
import { City } from '../../../../../domain/entities/cityEntities';
import { fetchCities } from '../../../../../domain/services/citiesService';

export const CityInput: FC<FieldProps> = ({ field, ...rest }) => {
  const { setFieldValue } = useFormikContext();
  const [cities, setCities] = useState<City[]>([]);

  useEffect(() => {
    fetchCities(field.value.city).then(setCities);
  }, [field.value]);

  const handleChange = (ev: ChangeEvent<{ value: string }>) => {
    const value = ev.target.value;
    const city = { city: value.split(',')[0], country: value.split(',')[1] ?? '' };
    setFieldValue(field.name, city);
  };

  return (
    <>
      {/* @ts-ignore */}
      <InputFormGroup
        list="cities"
        placeholder="Type a city"
        value={field.value.city}
        onChange={handleChange}
        field={field}
        {...rest}
      />
      <datalist id="cities">
        {cities.map(({ id, city, country }) => (
          <option key={id} value={`${city}, ${country}`} />
        ))}
      </datalist>
    </>
  );
};

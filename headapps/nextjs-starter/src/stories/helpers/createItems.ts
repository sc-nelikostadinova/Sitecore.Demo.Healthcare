import {
  createIGQLField,
  createImageField,
  createRichTextField,
  createTextField,
} from './createFields';

export const createDoctorItems = (count: number) =>
  Array.from({ length: count }).map((_, i) => ({
    id: String(i + 1),
    url: '#',
    name: `Jane Doe ${i + 1}`,
    fields: {
      FullName: createTextField(`Jane Doe ${i + 1}`),
      JobTitle: createTextField('Cardiologist'),
      Photo: createImageField(),
      Bio: createRichTextField(3),
    },
  }));

export const createFeatureItems = (count: number) =>
  Array.from({ length: count }).map((_, i) => ({
    id: String(i + 1),
    featureHeading: createIGQLField(createTextField(`Feature ${i + 1}`)),
    featureDescription: createIGQLField(createTextField('', 2)),
    featureIcon: createIGQLField(createImageField()),
    featureIconDark: createIGQLField(createImageField()),
  }));

export const createTestimonialItems = (count: number) =>
  Array.from({ length: count }).map((_, i) => ({
    id: String(i + 1),
    customerImage: createIGQLField(createImageField()),
    customerName: createIGQLField(createTextField(`John Doe ${i + 1}`)),
    customerQuote: createIGQLField(createTextField('', 2)),
  }));

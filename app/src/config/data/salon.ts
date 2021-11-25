// https://www.flaticon.com/packs/kawaii-avatars-3

import faker from 'faker';
import niceColors from 'nice-color-palettes';
faker.seed(1);

const colors = [
  ...niceColors[1].slice(1, niceColors[1].length),
  ...niceColors[55].slice(0, 3),
];
export const iconColors = ['#9FD7F1', '#F3B000', '#F2988F'];

const data = [
  {
    image:
      'https://purewows3.imgix.net/images/articles/2020_09/best-celebrity-beauty-lines-selena-gomez.jpg?auto=format,compress&cs=strip',
  },
  {
    image:
      'https://static.independent.co.uk/s3fs-public/thumbnails/image/2017/04/21/12/woman-dating-app-photo.jpg?width=990&auto=webp&quality=75&crop=982:726,smart',
  },
  {
    image: 'https://image.flaticon.com/icons/png/256/435/435065.png',
  },
  {
    image: 'https://image.flaticon.com/icons/png/256/435/435050.png',
  },
];

export default data.map((item, index) => ({
  ...item,
  key: faker.datatype.uuid(),
  color: colors[index % colors.length],
  name: faker.name.findName(),
  location: `${faker.address.city()}, ${faker.address.state()}`,
  age: faker.datatype.number({
    min: 18,
    max: 80,
  }),
  categories: [...Array(3).keys()].map(() => {
    return {
      key: faker.datatype.uuid(),
      title: faker.name.jobType(),
      subcats: [...Array(3).keys()].map(faker.name.jobType),
    };
  }),
}));

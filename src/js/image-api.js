import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';
axios.defaults.params = {
  image_type: 'photo',
  orientation: 'horizontal',
  per_page: 40,
  key: '20826556-19d7dce6dc96816ed1b7dccf7',
};

export const fetchImages = async (query, page) => {
  const { data } = await axios.get('', {
    params: {
      q: query,
      page,
    },
  });
  return data;
};

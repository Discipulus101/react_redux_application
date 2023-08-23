import { FilmData } from '../../models/models';

export interface CounterProps {
  comand: 'up' | 'down';
}

export const keysToRender: (keyof FilmData)[] = [
  'name',
  'films',
  'shortFilms',
  'tvShows',
  'videoGames',
  'parkAttractions',
  'allies',
  'enemies',
  'sourceUrl',
  'url',
];

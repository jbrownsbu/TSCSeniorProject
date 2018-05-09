import {FilterPipeRegionPipe } from './filter-pipe-region.pipe';

describe('FilterPipeRegion', () => {
    let pipe: FilterPipeRegionPipe;

    beforeEach(() => {
      pipe = new FilterPipeRegionPipe();
    });

    it('create an instance', () => {
      expect(pipe).toBeTruthy();
    });

  it('should return empty array', () => {
    expect(pipe.transform([], 'anything')).toEqual([]);
  });

  it('should return initial array', () => {
    const regions = [
      { translationRegion: 'Eurasia' },
      { translationRegion: 'Europe' },
      { translationRegion: 'Asia' },
      { translationRegion: 'Africa' }
    ];
    expect(pipe.transform(regions, null)).toEqual(regions);
  });

  it('should return array with one element', () => {
    const array = [{ translationRegion: 'Asia' }];
    expect(pipe.transform(array, 'ASIA')).toEqual(array);
  });

  it('should filter by translationRegion', () => {
    const regions = [
      { translationRegion: 'Eurasia' },
      { translationRegion: 'Europe' },
      { translationRegion: 'Asia' },
      { translationRegion: 'Africa' }
    ];
    const filteredRegions = [
      { translationRegion: 'Eurasia' }
    ];
    expect(pipe.transform(regions, 'EURASIA' )).toEqual(filteredRegions);
  });

  it('should filter to all that contain "asia"', () => {
    const regions = [
      { translationRegion: 'Asia' },
      { translationRegion: 'Eurasia' },
      { translationRegion: 'Europe' },
      { translationRegion: 'Africa' }
    ];
    const filteredRegions = [
      { translationRegion: 'Asia' },
      { translationRegion: 'Eurasia'}
    ];
    expect(pipe.transform(regions, 'asia' )).toEqual(filteredRegions);  });
});

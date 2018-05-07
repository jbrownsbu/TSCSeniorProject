import { FilterPipeLanguagePipe } from './filter-pipe-language.pipe';

describe('FilterPipeLanguage', () => {
  let pipe: FilterPipeLanguagePipe;

  let languages = [];
  let filteredLanguages = [];

  beforeEach(() => {
    languages = [
      { language: 'Gungan' },
      { language: 'Jawa' },
      { language: 'Selkath' },
      { language: 'Wookie' }
    ];
    pipe = new FilterPipeLanguagePipe();
  });

  afterEach( () => {
    languages = [];
    filteredLanguages = [];
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return empty array', () => {
    expect(pipe.transform([], 'anything')).toEqual([]);
  });

  it('should return initial array', () => {
    expect(pipe.transform(languages, null)).toEqual(languages);
  });

  it('should return array with one element', () => {
    filteredLanguages = [{ language: 'Gungan' }];

    expect(pipe.transform(languages, 'gungan')).toEqual(filteredLanguages);
  });

  it('should filter by language', () => {
    filteredLanguages = [
      { language: 'Selkath' }
    ];

    expect(pipe.transform(languages, 'selkath' )).toEqual(filteredLanguages);
  });

  it('should filter to all that contain "sel"', () => {
    filteredLanguages = [
      { language: 'Selkath' }
    ];
    expect(pipe.transform(languages, 'sel' )).toEqual(filteredLanguages);
  });

});

import { FilterPipeConsultantNamePipe } from './filter-pipe-consultantName.pipe';

describe('FilterPipeConsultantNamePipe', () => {
  let pipe: FilterPipeConsultantNamePipe;

  let consultants = [];
  let filteredConsultants = [];

  beforeEach(() => {
    consultants = [
      { firstName: 'Han', lastName: 'Solo' },
      { firstName: 'Leia', lastName: 'Organa' },
      { firstName: 'ObiWan', lastName: 'Kenobi' },
      { firstName: 'Luke', lastName: 'Skywalker' }
    ];

    pipe = new FilterPipeConsultantNamePipe();
  });

  afterEach( () => {
    consultants = [];
    filteredConsultants = [];
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return empty array', () => {
    expect(pipe.transform([], 'anything')).toEqual([]);
  });

  it('should return initial array', () => {
    expect(pipe.transform(consultants, null)).toEqual(consultants);
  });

  it('should return array with one element', () => {
    filteredConsultants = [{ firstName: 'Han', lastName: 'Solo' }];

    expect(pipe.transform(consultants, 'Solo')).toEqual(filteredConsultants);
  });

  it('should filter by consultant', () => {
    filteredConsultants = [
      { firstName: 'Han', lastName: 'Solo' },
      { firstName: 'Leia', lastName: 'Organa'},
      { firstName: 'ObiWan', lastName: 'Kenobi' },
    ];

    expect(pipe.transform(consultants, 'an' )).toEqual(filteredConsultants);
  });

  it('should filter to all that contain "Lu"', () => {
    filteredConsultants = [
      { firstName: 'Luke', lastName: 'Skywalker' },
    ];
    expect(pipe.transform(consultants, 'Lu' )).toEqual(filteredConsultants);
  });
});

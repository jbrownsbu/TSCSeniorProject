import { FilterPipeAssignedPipe } from './filter-pipe-assigned.pipe';

fdescribe('FilterPipeAssignedPipe', () => {
  let pipe: FilterPipeAssignedPipe;

  let consultants = [];
  let filteredConsultants = [];

  beforeEach(() => {
    consultants = [
      { consultantId: 'Unassigned'},
      { consultantId: 'A1337' },
      { consultantId: 'C404' },
      { consultantId: 'B1994' }
    ];

    pipe = new FilterPipeAssignedPipe();
  });

  afterEach( () => {
    consultants = [];
    filteredConsultants = [];
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return empty array', () => {
    expect(pipe.transform([], true)).toEqual([]);
  });

  it('should return full array', () => {

    // The way that the transform is written says that if it's false, don't change anything.
    // It does not mean to remove anyone who is unassigned.
    expect(pipe.transform(consultants, false)).toEqual(consultants);
  });

  it('should return array with only Unassigned Consultants', () => {
    filteredConsultants = [{ consultantId: 'Unassigned' }];

    expect(pipe.transform(consultants, true )).toEqual(filteredConsultants);
  });
});

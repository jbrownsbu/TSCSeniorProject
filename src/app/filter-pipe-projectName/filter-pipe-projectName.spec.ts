import { FilterPipeProjectNamePipe} from './filter-pipe-projectName.pipe';

describe('FilterPipeProjectName', () => {
  let pipe: FilterPipeProjectNamePipe;

  let projectNames = [];
  let filteredNames = [];
  beforeEach(() => {
  projectNames = [
      { projectName: 'Gungan' },
      { projectName: 'Jawa' },
      { projectName: 'Selkath' },
      { projectName: 'Wookie' }
    ];
    pipe = new FilterPipeProjectNamePipe();
  });

  afterEach( () => {
    projectNames = [];
    filteredNames = [];
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return empty array', () => {
    expect(pipe.transform([], 'anything')).toEqual([]);
  });

  it('should return initial array', () => {
    expect(pipe.transform(projectNames, null)).toEqual(projectNames);
  });

  it('should return array with one element', () => {
    filteredNames = [{ projectName: 'Gungan' }];

    expect(pipe.transform(projectNames, 'gungan')).toEqual(filteredNames);
  });

  it('should filter by projectName', () => {
    filteredNames = [
      { projectName: 'Selkath' }
    ];

    expect(pipe.transform(projectNames, 'selkath' )).toEqual(filteredNames);
  });

  it('should filter to all that contain "sel"', () => {
    filteredNames = [
      { projectName: 'Selkath' }
    ];
    expect(pipe.transform(projectNames, 'sel' )).toEqual(filteredNames);
  });

});

import { createSlice } from '@reduxjs/toolkit';
import { Role } from '../../common';

export const MOCK_SESSION_TOKEN =
  'eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTY1NDc3NDA5OSwiaWF0IjoxNjU0Nzc0MDk5fQ.xpDmEQwbOXEWkIW7txkqF0sjbxx8ep7UkCmr-LaVWPs';

const mockUnitState = {
  uid: '0ba77b12-d991-41c1-8b0f-ddf3d3942e5b',
  guidingProgramme: 'guides',
  displayName: 'Galactic Guides',
  patrols: {
    'c03fc841-db2e-45ab-baa2-9da650697a73': 'Guardians',
    '4b54c49c-f584-46e0-a83c-8f5b4df7ea56': 'Protectors',
    '80f40621-86bd-4d1e-af74-386828c41712': 'Heros'
  }
};

const mockUserState = {
  uid: '72259c06-aa36-49dd-9468-b80349861208',
  email: 'unit.leader@go4guiding.co.uk',
  emailVerified: true,
  displayName: 'Unit Leader',
  unit: mockUnitState,
  role: Role.Leader,
  createdAt: '27-10-2022',
  lastSignedInAt: '27-10-2022'
};

const initialState = {
  token: MOCK_SESSION_TOKEN,
  user: mockUserState,
  isValid: true,
  isLoading: false,
  error: null
};

const mockAuth = createSlice({
  name: 'auth',
  initialState,
  reducers: {}
});

export default mockAuth;

import api from '../services/api';

export function getACState() {
  return api.ac.getState();
}

export function setACState(state: any) {
  return api.ac.setState(state);
}
